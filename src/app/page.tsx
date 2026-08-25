import { Sidebar } from "@/components/layout/Sidebar";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="lg:flex lg:items-start">
      <Sidebar variant="home" content="home" />
      <main className="w-full lg:w-[70%] lg:flex-1">
        
        <SelectedWorks />
        <Footer />
      </main>
    </div>
  );
}
