import clsx from "clsx";

export const fontSizes = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  xl2: "text-2xl",
  xl3: "text-3xl",
  xl4: "text-4xl",
  xl5: "text-5xl",
  xl6: "text-6xl",
} as const;

export const fontWeights = {
  light: "font-light",
  normal: "font-normal",
  bold: "font-bold",
  black: "font-black",
} as const;

export type TypographyType = (typeof Typography)[keyof typeof Typography];

export const Typography = {
  // Headings
  Display: clsx(fontSizes.xl4, fontWeights.black, `md:${fontSizes.xl6}`),
  Headline: clsx(fontSizes.xl2, fontWeights.black, `md:${fontSizes.xl4}`),
  Title: clsx(fontSizes.lg, fontWeights.bold, `md:${fontSizes.xl2}`),
  Subtitle: clsx(fontSizes.base, fontWeights.bold, `md:${fontSizes.lg}`),

  // Body
  Body: clsx(fontSizes.base, fontWeights.normal, `md:${fontSizes.lg}`),
  Caption: clsx(fontSizes.sm, fontWeights.normal, `md:${fontSizes.base}`),
  Footnote: clsx(fontSizes.base, fontWeights.light, `md:${fontSizes.lg}`),
  Quote: clsx(fontSizes.sm, fontWeights.light, `md:${fontSizes.base}`),

  // Interactive Elements
  Button: clsx(fontSizes.base, fontWeights.bold, `md:${fontSizes.lg}`),
  Label: clsx(fontSizes.sm, fontWeights.normal, `md:${fontSizes.base}`),
  Tag: clsx(fontSizes.sm, fontWeights.bold, `md:${fontSizes.base}`),
  Helper: clsx(fontSizes.sm, fontWeights.light, `md:${fontSizes.base}`),
};
