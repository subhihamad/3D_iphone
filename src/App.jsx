import { Hero, Highlights, Models, Navbar } from "./components";
import Features from "./components/Features";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";

export default function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Models />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}