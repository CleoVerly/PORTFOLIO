"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { personalInfo } from "@/data/personal";

const ease = [0.22, 1, 0.36, 1] as const;

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2); // max ~12px pull
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY } as any}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resultMsg, setResultMsg] = useState("");

  // Spam protection check (cache)
  useEffect(() => {
    const lastSent = localStorage.getItem("last_message_sent_at");
    if (lastSent) {
      const diff = Date.now() - parseInt(lastSent, 10);
      if (diff < 900000) { // 15 minutes cooldown
        setCanSend(false);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend) {
      setStatus("error");
      setResultMsg("You recently sent a message. Please wait a bit before sending another.");
      return;
    }
    
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        setResultMsg("Message sent successfully! I'll get back to you soon.");
        e.currentTarget.reset();
        
        // Save to cache to prevent spam
        localStorage.setItem("last_message_sent_at", Date.now().toString());
        setCanSend(false);
        
        setTimeout(() => setIsFormOpen(false), 3000);
      } else {
        setStatus("error");
        setResultMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setResultMsg("Failed to send message. Please try again.");
    }
    
    setTimeout(() => {
      setStatus("idle");
      setResultMsg("");
    }, 5000);
  };

  return (
    <section id="contact" className="relative py-40 overflow-hidden">
      {/* Gold glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 100%, rgba(201,168,124,0.07), transparent 70%)",
        }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="label block mb-8"
        >
          Get in touch
        </motion.span>

        {/* Giant editorial headline (Word-by-word reveal) */}
        <motion.h2
          className="display-section"
          style={{ fontSize: "clamp(2.2rem, 8vw, 8rem)", marginBottom: "2rem", lineHeight: 1.1 } as React.CSSProperties}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25, delayChildren: 0.15 } }
          }}
        >
          <span className="inline-block whitespace-nowrap">
            {["Good", "products", "start"].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] last:mr-0"
                variants={{
                  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <br />
          <em style={{ color: "var(--text-3)", fontStyle: "normal" }} className="inline-block whitespace-nowrap">
            {["with", "good", "conversations."].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] last:mr-0"
                variants={{
                  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.8, ease }}
          className="text-sm leading-relaxed mb-12 max-w-md mx-auto"
          style={{ color: "var(--text-2)" } as React.CSSProperties}
        >
          Currently available for freelance, product collaborations, and ambitious ideas.
        </motion.p>

        {/* Contact Form / Button Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease }}
          className="max-w-md mx-auto w-full mb-16 text-left"
        >
          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              <motion.div
                key="open-button"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <button
                  onClick={() => setIsFormOpen(true)}
                  disabled={!canSend}
                  className="btn-gold rounded-xl px-10 py-5 w-full max-w-[280px] flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(201,168,124,0.15)]"
                >
                  {canSend ? "Let's Talk" : "Message Sent"}
                  {canSend && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col gap-5 overflow-hidden"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs tracking-widest uppercase opacity-70" style={{ color: "var(--text-1)" }}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                    style={{ borderColor: "var(--border)", color: "var(--text-1)" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs tracking-widest uppercase opacity-70" style={{ color: "var(--text-1)" }}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                    style={{ borderColor: "var(--border)", color: "var(--text-1)" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs tracking-widest uppercase opacity-70" style={{ color: "var(--text-1)" }}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent border-b py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
                    style={{ borderColor: "var(--border)", color: "var(--text-1)" }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="btn-ghost rounded-xl px-6 py-4 flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-gold rounded-xl px-8 py-4 flex-[2] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                    {status !== "loading" && (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2 11 13" />
                        <path d="m22 2-7 20-4-9-9-4 20-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Status Message */}
                {status !== "idle" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm text-center mt-2 ${status === "success" ? "text-green-500" : "text-red-500"}`}
                  >
                    {resultMsg}
                  </motion.p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.8, ease }}
          className="flex flex-row flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href={`mailto:${personalInfo.email}`}
              className="btn-ghost rounded-xl px-6 py-3 text-sm"
            >
              Email
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://github.com/cleoverly"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost rounded-xl px-6 py-3 text-sm"
            >
              GitHub
            </a>
          </Magnetic>
          {personalInfo.socials.linkedin && (
            <Magnetic>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost rounded-xl px-6 py-3 text-sm"
              >
                LinkedIn
              </a>
            </Magnetic>
          )}
        </motion.div>

        {/* Decorative divider + location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 pt-8 flex items-center justify-center gap-2"
          style={{ borderTop: "1px solid var(--border)" } as React.CSSProperties}
        >
          <span className="text-xs" style={{ color: "var(--text-3)" }}>
            Based in Indonesia · Available worldwide
          </span>
        </motion.div>
      </div>
    </section>
  );
}
