import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

/**
 * Utility function to merge tailwind classes safely.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
