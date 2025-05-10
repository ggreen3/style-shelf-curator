
import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  className,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
}) => {
  const speedMap = {
    slow: '30s',
    normal: '20s',
    fast: '10s',
  };

  const directionClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';
  const durationClass = speedMap[speed];
  
  return (
    <div 
      className={cn(
        "w-full overflow-hidden whitespace-nowrap",
        pauseOnHover && "hover:[animation-play-state:paused]",
        className
      )}
    >
      <div 
        className={cn(
          "inline-block animate-marquee",
          directionClass
        )}
        style={{ animationDuration: durationClass }}
      >
        {children}
      </div>
      <div 
        className={cn(
          "inline-block animate-marquee",
          directionClass
        )}
        style={{ animationDuration: durationClass }}
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;
