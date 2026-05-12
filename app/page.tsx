import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Treatments from "@/components/Treatments";
import Results from "@/components/Results";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Philosophy />
      <Treatments />
      <Results />
      <Team />
      <Testimonials />
      <Booking />
      <Footer />
    </main>
  );
}
