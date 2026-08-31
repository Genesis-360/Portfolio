import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { Footer } from "@/components/sections/Footer";
import { getProjects, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "OREENZA — Performance-first design & development studio" },
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function Home() {
  const [projects, site] = await Promise.all([getProjects(), getSite()]);

  return (
    <div className="lg:flex lg:items-start">
      <Sidebar
        variant="home"
        content="home"
        data={{
          serviceTitles: site.services.map((s) => s.title),
          industries: site.industries,
          email: site.email,
          phone: site.phone,
          slotsOpen: site.slotsOpen,
          socials: site.socials,
        }}
      />
      <main id="main" className="w-full lg:w-[70%] lg:flex-1">
        <SelectedWorks projects={projects} />
        <Footer socials={site.socials} />
      </main>
    </div>
  );
}
