export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function padIndex(n: number, digits = 2): string {
  return String(n).padStart(digits, "0");
}

export function currentYear(): number {
  return new Date().getFullYear();
}
