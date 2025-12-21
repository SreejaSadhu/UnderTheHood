import { ReactNode } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";

interface BentoTileProps {
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function BentoTile({ title, children, className = "", delay = 0 }: BentoTileProps) {
  return (
    <AnimatedSection delay={delay} className={className}>
      <div className="xtract-card p-6 h-full">
        <h3 className="text-xs font-normal text-secondary-foreground tracking-wide mb-4">
          {title}
        </h3>
        <div className="text-foreground">
          {children}
        </div>
      </div>
    </AnimatedSection>
  );
}
