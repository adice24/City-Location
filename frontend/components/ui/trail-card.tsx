import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define the props interface for type safety and reusability
interface TrailCardProps extends Omit<HTMLMotionProps<"div">, 'stats' | 'title'> {
  imageUrl: string;
  mapImageUrl: string;
  title: string;
  location: string;
  difficulty: string;
  creators: string;
  stats: {
    label: string;
    value: string;
  }[];
  onDirectionsClick?: () => void;
  ctaText?: string;
}

// Define stat item component for DRY principle
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-sm font-semibold text-foreground">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
  </div>
);

const TrailCard = React.forwardRef<HTMLDivElement, TrailCardProps>(
  (
    {
      className,
      imageUrl,
      mapImageUrl,
      title,
      location,
      difficulty,
      creators,
      stats,
      onDirectionsClick,
      ctaText = "Explore",
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full overflow-hidden rounded-3xl bg-card text-card-foreground shadow-2xl border border-white/5 group",
          className
        )}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {/* Top section with background image and content */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-black/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
          
          <div className="absolute bottom-0 left-0 flex w-full flex-col p-6">
            <div className="text-white mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-8 rounded-full bg-rose-500" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">{location}</span>
              </div>
              <h3 className="text-3xl font-bold tracking-tight mb-1">{title}</h3>
              <p className="text-xs font-medium text-white/40 tracking-wide line-clamp-1">{creators}</p>
            </div>
            
            {/* Action button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 transform translate-y-4"
            >
              <Button
                variant="default"
                onClick={(e) => {
                  e.stopPropagation();
                  onDirectionsClick?.();
                }}
                className="w-full rounded-2xl h-12 text-sm font-bold bg-rose-500 hover:bg-rose-600 transition-colors"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom section with trail details */}
        <div className="p-6 bg-[#0a0a0a] border-t border-white/5">
          <div className="flex items-center justify-between mb-5">
             <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/70 uppercase tracking-widest">
               {difficulty}
             </span>
            <img
              src={mapImageUrl}
              alt="Network pattern"
              className="h-6 w-12 object-contain opacity-20 invert transition-all group-hover:opacity-50"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <StatItem key={i} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
);

TrailCard.displayName = "TrailCard";

export { TrailCard };
