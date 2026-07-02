import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
