import Image from "next/image";
import { Inter } from "next/font/google";
import HeroSection from "../components/HeroSection/HeroSection";
import MotivationSection from "../components/MotivationSection/MotivationSection";
import InspirationSection from "../components/InspirationSection/InspirationSection";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Donation from "../components/Donation/Donation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <MotivationSection />
      <InspirationSection />
      <HowItWorks />
      <Donation />
    </div>
  );
}
