
import { useLocation, Link } from "react-router-dom";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
    const location = useLocation();
    const isLanding = location.pathname === "/";

    return (
        <AnimatePresence>
            {!isLanding && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed top-6 right-6 z-50"
                >
                    <Link
                        to="/"
                        className={cn(
                            "flex items-center justify-center w-12 h-12",
                            "bg-black/20 backdrop-blur-md border border-white/10",
                            "rounded-full text-foreground/80 hover:text-white",
                            "hover:bg-white/10 hover:scale-105 hover:border-white/20",
                            "transition-all duration-300 shadow-lg"
                        )}
                        aria-label="Go to Home"
                    >
                        <Home size={20} />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
