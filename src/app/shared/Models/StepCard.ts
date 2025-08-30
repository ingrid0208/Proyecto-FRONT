export interface StepCard {
  number?: string | number;  // "01", 1, etc.
  icon?: string;             // Material Symbols (ej. "search") o emoji
  title: string;
  description: string;
}