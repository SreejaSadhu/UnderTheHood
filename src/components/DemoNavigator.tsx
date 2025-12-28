import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Info, Sparkles } from "lucide-react";
import { DemoFrame } from "@/data/dataStructures";
import { cn } from "@/lib/utils";

interface DemoNavigatorProps {
  frames: DemoFrame[];
}

export function DemoNavigator({ frames }: DemoNavigatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const total = frames.length;
  const current = frames[currentIndex];

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(false);
    }
  };

  const goToNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Real-World Demonstration
        </h3>
        <div className="flex gap-1.5">
          {frames.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-primary" : "w-1.5 bg-border"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="relative group bg-black/20 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        {/* Main Image Area */}
        <div className="relative aspect-video flex items-center justify-center bg-gray-900/50">
          {current.image ? (
            <img
              src={current.image}
              alt={current.title || "Demo visual"}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="text-center px-8 text-muted-foreground">
              (No visualization available)
            </div>
          )}

          {/* Under The Hood Overlay Card */}
          <div
            className={cn(
              "absolute inset-0 bg-zinc-950/95 backdrop-blur-md transition-all duration-500 flex flex-col items-center justify-center p-8 text-center",
              showExplanation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Info size={24} />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Engineering Deep Dive</h4>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              {current.explanation}
            </p>
            <button
              onClick={() => setShowExplanation(false)}
              className="mt-6 text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
            >
              <X size={14} /> Close
            </button>
          </div>
        </div>

        {/* Navigation Buttons (Absolute) */}
        {total > 1 && (
          <>
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur-sm transition-all disabled:opacity-0 hover:scale-110 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === total - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur-sm transition-all disabled:opacity-0 hover:scale-110 z-10"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Footer Content */}
      <div className="space-y-4 px-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold text-foreground">
              {current.title}
            </h4>
            <p className="text-muted-foreground mt-2 leading-relaxed max-w-2xl">
              {current.caption}
            </p>
          </div>

          {/* Logic for "Under The Hood" Button */}
          {current.explanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border flex items-center gap-2 shadow-[0_0_10px_rgba(124,58,237,0.1)] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5 active:scale-95",
                showExplanation
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                  : "bg-secondary/50 text-secondary-foreground border-border hover:bg-secondary hover:border-primary/50"
              )}
            >
              {!showExplanation && <Sparkles size={14} className="hidden sm:block text-primary animate-pulse" />}
              {showExplanation ? "Hide Analysis" : "Under The Hood"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
