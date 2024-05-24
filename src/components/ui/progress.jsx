"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const progressIndicatorBgClass = "bg-[#00296C]";
const validValueRange = (value) => value >= 0 && value <= 100;

const Progress = React.forwardRef(({ className, value, ...props }, ref) => {
  // Validate value
  const isValidValue = validValueRange(value);
  const transformedValue = isValidValue ? `${100 - value}%` : "0%";

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-[50%] overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full flex-1 ${progressIndicatorBgClass} transition-all dark:bg-slate-50`}
        style={{ transform: `translateX(-${transformedValue})` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
