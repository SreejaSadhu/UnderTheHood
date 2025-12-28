import { Link } from "react-router-dom";
import { dataStructures } from "@/data/dataStructures";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Linkedin } from "lucide-react";

const iconMap: Record<string, string> = {
  arrays: "/assets/ds-icons/arrays.png",
  stacks: "/assets/ds-icons/stacks.png",
  queues: "/assets/ds-icons/queues.png",
  "linked-lists": "/assets/ds-icons/linked-lists.png",
  "hash-maps": "/assets/ds-icons/hash-maps.png",
  trees: "/assets/ds-icons/trees.png",
  strings: "/assets/ds-icons/arrays.png",
  bsts: "/assets/ds-icons/trees.png",
  heaps: "/assets/ds-icons/trees.png",
  tries: "/assets/ds-icons/trees.png",
  graphs: "/assets/ds-icons/linked-lists.png",
};

export default function GetStarted() {
  return (
    <div className="min-h-screen py-24 px-6 relative">
      <a
        href="https://www.linkedin.com/in/sreejasadhu"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-muted-foreground hover:text-white hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 text-sm font-medium group shadow-lg"
      >
        <Linkedin size={16} className="group-hover:text-[#0077b5] transition-colors" />
        <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-300 whitespace-nowrap">Sreeja Sadhu</span>
      </a>

      <SmoothCursor
        color="black"
        size={25}
        rotateOnMove={true}
        scaleOnClick={true}
        glowEffect={true}
        showTrail={true}
        trailLength={6}
        magneticElements="a"
      />
      <div className="content-container">
        <AnimatedSection>
          <h1 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-foreground text-center">
            Choose a data structure
          </h1>
          <p className="mt-4 text-secondary-foreground text-center max-w-lg mx-auto">
            Explore how each data structure shapes system behavior.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dataStructures.map((ds, index) => (
            <AnimatedSection key={ds.slug} delay={index * 0.08}>
              <Link
                to={`/ds/${ds.slug}`}
                className="block group"
              >
                <div className="xtract-card p-6 h-full flex flex-col justify-between min-h-[200px]">
                  <div className="mb-4">
                    <img
                      src={iconMap[ds.slug]}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 shadow-inner border border-white/5"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-medium text-foreground tracking-tight">
                      {ds.name}
                    </h2>
                    <p className="mt-2 text-sm text-secondary-foreground leading-relaxed">
                      {ds.hook}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
