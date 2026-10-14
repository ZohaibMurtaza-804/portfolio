import { getGitHubData } from "@/lib/github";
import GitHubProvider from "@/components/GitHubProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
  import Websites from "@/components/Websites";
import GitHubSection from "@/components/GitHubSection";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Re-generate this page at most once per hour so GitHub data stays fresh.
export const revalidate = 3600;

export default async function Home() {
  const github = await getGitHubData();

  return (
    <GitHubProvider initial={github}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
          <Websites />
        <GitHubSection />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </GitHubProvider>
  );
}
