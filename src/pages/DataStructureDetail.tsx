import { useParams, Link } from "react-router-dom";
import { getDataStructure } from "@/data/dataStructures";
import { BentoTile } from "@/components/BentoTile";
import { DemoNavigator } from "@/components/DemoNavigator";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft } from "lucide-react";

export default function DataStructureDetail() {
  const { slug } = useParams<{ slug: string }>();
  const ds = getDataStructure(slug || "");

  if (!ds) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Data structure not found.</p>
          <Link to="/get-started" className="text-primary hover:underline text-sm mt-2 inline-block">
            Back to selection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="content-container">
        <AnimatedSection>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <h1 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-foreground">
            {ds.name}
          </h1>
          <p className="mt-2 text-secondary-foreground">
            {ds.hook}
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="mt-12 space-y-5">
          {/* Row 1: WHAT | WHY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <BentoTile title="What" delay={0.1}>
              <p className="text-sm leading-relaxed text-secondary-foreground">{ds.what}</p>
            </BentoTile>
            <BentoTile title="Why" delay={0.15}>
              <p className="text-sm leading-relaxed text-secondary-foreground">{ds.why}</p>
            </BentoTile>
          </div>

          {/* Row 2: ADVANTAGES | CONSEQUENCES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <BentoTile title="Advantages" delay={0.2}>
              <ul className="space-y-2">
                {ds.advantages.map((adv, i) => (
                  <li key={i} className="text-sm leading-relaxed flex items-start gap-2 text-secondary-foreground">
                    <span className="text-primary mt-1.5 w-1 h-1 rounded-full shrink-0" />
                    {adv}
                  </li>
                ))}
              </ul>
            </BentoTile>
            <BentoTile title="Consequences" delay={0.25}>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-secondary-foreground/70 uppercase tracking-wide mb-2">
                    Why it stops working
                  </p>
                  <ul className="space-y-1.5">
                    {ds.consequences.whyItStopsWorking.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed flex items-start gap-2 text-secondary-foreground">
                        <span className="text-destructive/70 mt-1.5 w-1 h-1 rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-secondary-foreground/70 uppercase tracking-wide mb-2">
                    What replaces it
                  </p>
                  <ul className="space-y-1.5">
                    {ds.consequences.whatReplacesIt.map((item, i) => (
                      <li key={i} className="text-sm leading-relaxed flex items-start gap-2 text-secondary-foreground">
                        <span className="text-primary/70 mt-1.5 w-1 h-1 rounded-full shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </BentoTile>
          </div>

          {/* Row 3: REAL-WORLD DEMONSTRATION (full width) */}
          <AnimatedSection delay={0.3}>
            <div className="xtract-card p-6">
              <DemoNavigator frames={ds.demoFrames} />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
