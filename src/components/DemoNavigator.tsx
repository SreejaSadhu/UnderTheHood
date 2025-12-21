import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DemoFrame } from "@/data/dataStructures";

interface DemoNavigatorProps {
  frames: DemoFrame[];
}

export function DemoNavigator({ frames }: DemoNavigatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = frames.length;
  const current = frames[currentIndex];

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Real-World Demonstration
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-foreground disabled:hover:border-border"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-muted-foreground tabular-nums min-w-[48px] text-center">
            {currentIndex + 1} / {total}
          </span>
          <button
            onClick={goToNext}
            disabled={currentIndex === total - 1}
            className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-foreground disabled:hover:border-border"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="bg-secondary/50 border border-border rounded-lg aspect-video flex items-center justify-center">
        <div className="text-center px-8">
          <p className="text-muted-foreground text-sm">
            Demo Frame {current.id}
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            (Visual will be added later)
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        {current.caption}
      </p>
    </div>
  );
}
