// components/ui/calender.tsx
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

// const golden = "#D4A853";
// const deepBlue = "#0E1A2B";

// Define the explicit type for the icon component props (same as ChevronLeft/Right props)
type ChevronIconProps = React.ComponentProps<typeof ChevronLeft>;

// Define the components separately with explicit functional component type
const IconLeft: React.FC<ChevronIconProps> = ({ className, ...props }) => (
  <ChevronLeft className={cn("size-4", className)} {...props} />
);
IconLeft.displayName = "IconLeft";

const IconRight: React.FC<ChevronIconProps> = ({ className, ...props }) => (
  <ChevronRight className={cn("size-4", className)} {...props} />
);
IconRight.displayName = "IconRight";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // Set base dark mode styling for the container
      className={cn(
        "p-3 bg-[#1A2E4C] rounded-lg text-white shadow-xl",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium text-white",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white border-white/50 hover:bg-white/10"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "text-gray-400 rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 text-white hover:bg-white/10"
        ),
        // Used direct hex literals for Tailwind compatibility
        day_range_start: `day-range-start aria-selected:bg-[#D4A853] aria-selected:text-[#0E1A2B]`,
        day_range_end: `day-range-end aria-selected:bg-[#D4A853] aria-selected:text-[#0E1A2B]`,
        day_selected: `bg-[#D4A853] text-[#0E1A2B] hover:bg-[#D4A853] hover:text-[#0E1A2B] focus:bg-[#D4A853] focus:text-[#0E1A2B]`,
        day_today: `text-[#D4A853] border border-[#D4A853] hover:bg-white/10`,
        day_outside: "day-outside text-gray-500 aria-selected:text-gray-500",
        day_disabled: "text-gray-600 opacity-50",
        day_range_middle: `aria-selected:bg-[#D4A853]/50 aria-selected:text-white`,
        day_hidden: "invisible",
        ...classNames,
      }}
      // Pass the named components. TypeScript can now correctly infer the structure.
      components={{}}
      {...props}
    />
  );
}

export { Calendar };
