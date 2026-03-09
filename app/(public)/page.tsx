import HeroSection from "@/components/home/HeroSection";
import TechSkills from "@/components/home/TechSkills";
import SkillCategories from "@/components/home/SkillCategories";
import Education from "@/components/home/Education";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FeaturedResearch from "@/components/home/FeaturedResearch";
import FinalCTA from "@/components/home/FinalCTA";
import Experience from "@/components/home/Experience";

export const revalidate = 3600; // ISR: cache homepage for 1 hour

export default function HomePage() {
    return (
        <div className="fade-in">
            <HeroSection />
            <SkillCategories />
            <Experience />
            <FeaturedProjects />
            <FeaturedResearch />
            <FinalCTA />
        </div>
    );
}
