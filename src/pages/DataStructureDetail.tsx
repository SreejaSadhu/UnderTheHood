import { useParams, Link } from "react-router-dom";
import { getDataStructure, dataStructures } from "@/data/dataStructures";
import { BentoTile } from "@/components/BentoTile";
import { DemoNavigator } from "@/components/DemoNavigator";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

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
    <div className="min-h-screen pt-12 pb-24 px-6 relative">
      {/* Vertical Guide Line to encourage scrolling */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-1/2 pointer-events-none h-full" />

      <div className="content-container relative z-10">
        {/* Navigation - Floating Side Buttons for Desktop */}
        {(() => {
          const currentIndex = dataStructures.findIndex(d => d.slug === ds.slug);
          const prevDs = currentIndex > 0 ? dataStructures[currentIndex - 1] : null;
          const nextDs = currentIndex < dataStructures.length - 1 ? dataStructures[currentIndex + 1] : null;

          return (
            <>
              {/* Previous Floating Button */}
              {prevDs && (
                <Link
                  to={`/ds/${prevDs.slug}`}
                  className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex group"
                  aria-label={`Previous: ${prevDs.name}`}
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all shadow-2xl">
                    <ArrowLeft size={20} />
                  </div>
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 w-max px-3 py-1.5 rounded-md bg-zinc-900 border border-white/10 text-xs font-medium text-zinc-100 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                    Preview: {prevDs.name}
                  </span>
                </Link>
              )}

              {/* Next Floating Button */}
              {nextDs && (
                <Link
                  to={`/ds/${nextDs.slug}`}
                  className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex group"
                  aria-label={`Next: ${nextDs.name}`}
                >
                  <span className="absolute right-14 top-1/2 -translate-y-1/2 w-max px-3 py-1.5 rounded-md bg-zinc-900 border border-white/10 text-xs font-medium text-zinc-100 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                    Next: {nextDs.name}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:scale-110 group-hover:border-primary/50 transition-all shadow-2xl">
                    <ArrowRight size={20} />
                  </div>
                </Link>
              )}
            </>
          );
        })()}

        <AnimatedSection className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="flex-1">
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              Back
            </Link>
            <h1 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-foreground">
              {ds.name}
            </h1>
            <p className="mt-4 text-secondary-foreground text-lg max-w-2xl leading-relaxed">
              {ds.hook}
            </p>
          </div>

          {/* Right side Visual Placeholder */}
          <div className="shrink-0 w-full md:w-[280px] h-[180px] bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group shadow-2xl shadow-black/50">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50" />

            {/* Attempt to load specific DS header image, fallback to icon */}
            <img
              src={ds.headerImage || `/assets/ds-icons/${ds.slug}.png`}
              alt={ds.name}
              className={`${ds.headerImage ? "w-full h-full object-cover" : "w-24 h-24 object-contain opacity-90 group-hover:scale-110 group-hover:opacity-100"} transition-all duration-500 z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.classList.add('animate-pulse');
              }}
            />
          </div>
        </AnimatedSection>

        {/* Visual Connector */}
        <div className="flex justify-center py-6 opacity-30">
          <ChevronDown className="animate-bounce" size={20} />
        </div>

        {/* Bento Grid */}
        <div className="mt-2 space-y-4">
          {/* Row 1: WHAT | WHY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BentoTile title="What" delay={0.1}>
              <p className="text-sm leading-relaxed text-secondary-foreground">{ds.what}</p>
            </BentoTile>
            <BentoTile title="Why" delay={0.15}>
              <p className="text-sm leading-relaxed text-secondary-foreground">{ds.why}</p>
            </BentoTile>
          </div>

          {/* Row 2: ADVANTAGES | CONSEQUENCES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Visual Connector */}
          <div className="flex justify-center py-6 opacity-30">
            <ChevronDown className="animate-bounce" size={20} />
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
