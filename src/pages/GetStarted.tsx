import { Link } from "react-router-dom";
import { dataStructures } from "@/data/dataStructures";
import { AnimatedSection } from "@/components/AnimatedSection";

const iconMap: Record<string, string> = {
  arrays: "/assets/ds-icons/arrays.png",
  stacks: "/assets/ds-icons/stacks.png",
  queues: "/assets/ds-icons/queues.png",
  "linked-lists": "/assets/ds-icons/linked-lists.png",
  "hash-maps": "/assets/ds-icons/hash-maps.png",
  trees: "/assets/ds-icons/trees.png",
};

export default function GetStarted() {
  return (
    <div className="min-h-screen py-24 px-6">
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
