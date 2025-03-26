export type BgColorType = (typeof bgColors)[keyof typeof bgColors];
export type TxtColorType = (typeof txtColors)[keyof typeof txtColors];

export const bgColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  background: "bg-background",
  white: "bg-white",
  black: "bg-black",
  transparent: "bg-transparent",
} as const;

export const txtColors = {
  gray500: "text-gray-500",
  gray700: "text-gray-700",
  white: "text-white",
  black: "text-black",
} as const;