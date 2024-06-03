"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-white p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
      className
    )}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(
  ({ className, selected, ...props }, ref) => {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium",
          {
            "border-2": selected, // Apply border only when selected
            "border-[#1E40AF]": selected, // Border color
            "rounded-full": true, // Full border radius
            "bg-transparent": !selected, // Background transparent when not selected
            "text-black": !selected, // Text color black when not selected
            "text-white": selected, // Text color white when selected
            "text-xs": true,
            "px-6 py-3": true,
            "focus-visible:outline-none": true,
            "focus-visible:ring-2": true,
            "focus-visible:ring-[#1E40AF]": true, // Focus ring color
            "focus-visible:ring-offset-2": true,
            "disabled:pointer-events-none": true,
            "disabled:opacity-50": true,
            "data-[state=active]:bg-[#1E40AF]": true, // Active state background color
            "data-[state=active]:text-white": true, // Active state text color
            "data-[state=active]:shadow-sm": true,
          },
          className
        )}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
