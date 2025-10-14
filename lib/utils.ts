import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// cn is the main utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
