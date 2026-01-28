import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tws } from "tailwind-to-style";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function twj(styles: string) {
  const s = tws(styles, true);
  for (const key in s) {
    s[key] = s[key].replace(/[\d.]*?\d+rem/g, (m) => `${Number(m.replace("rem", "")) * 16}px`);
  }
  return s;
}
