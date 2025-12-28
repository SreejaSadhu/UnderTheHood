
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/AnimatedSection";
import LightPillar from "@/components/LightPillar";
import TextReveal from "@/components/TextReveal";
import { useToast } from "@/hooks/use-toast";

export default function Landing() {
  const { toast } = useToast();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Light Pillar Background Effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-80 scale-150 sm:scale-100">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1.0}
            rotationSpeed={0.3}
            glowAmount={0.005}
            pillarWidth={3.0}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={0}
            interactive={false}
            mixBlendMode="normal"
          />
        </div>
      </div>

      <AnimatedSection className="text-center max-w-2xl relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-foreground leading-tight min-h-[1.2em]">
          <TextReveal text="How real systems actually work." />
        </h1>
        <p className="mt-6 text-lg text-secondary-foreground leading-relaxed">
          Concepts, trade-offs, and real-world usage of core data structures.
        </p>
        <div className="mt-10">
          <Link
            to="/get-started"
            onClick={() => {
              toast({
                title: "Engineering Reality Check",
                description: (
                  <div className="space-y-1.5 mt-1 text-xs opacity-90 leading-relaxed">
                    <p>Data structures don’t exist as fixed objects in real systems.</p>
                    <p>They represent ways of organizing data for performance.</p>
                    <p>Real implementations vary by language, platform, and scale.</p>
                    <p>Systems often combine multiple structures together.</p>
                    <p>What you’ll see here are the ideas behind those choices.</p>
                    <p className="font-medium text-primary">Focus on trade‑offs, not literal implementations.</p>
                  </div>
                ),
                duration: 8000,
              })
            }}
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 px-6 py-3 rounded text-sm font-medium transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:-translate-y-0.5"
          >
            Get Started
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-px"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
