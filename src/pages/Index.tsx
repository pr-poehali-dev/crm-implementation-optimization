import { openConsult } from "@/components/shared";
import { Header, Footer } from "@/components/HeaderFooter";
import { Hero, Ticker } from "@/components/HeroSection";
import { Qual, Challenge, Team, Process, Honesty, Pricing } from "@/components/ContentSections";

export default function Index() {
  return (
    <>
      <Header onConsult={openConsult} />
      <main>
        <Hero onConsult={openConsult} />
        <Ticker />
        <Qual />
        <Challenge />
        <Team />
        <Process />
        <Honesty />
        <Pricing onConsult={openConsult} />
      </main>
      <Footer />
    </>
  );
}
