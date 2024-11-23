import Hero from "@/components/Hero";
import Navbar from "@/components/navbar";
import PricingSection from "@/components/Pricing";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <div className="bg-black pattern relative  h-screen w-full">

      <Navbar />
      <Hero />
      <WhyChoose />
      <PricingSection />
    </div>
  );
}
