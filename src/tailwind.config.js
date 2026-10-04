const { Colors, Spacing, Radius, FontSize } = require('./constants/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: Colors.light.primary,
        secondary: Colors.light.secondary,

        background: Colors.light.background,
        foreground: Colors.light.foreground,

        card: Colors.light.card,
        border: Colors.light.border,

        muted: Colors.light.muted,

        success: Colors.light.success,
        warning: Colors.light.warning,
        error: Colors.light.error,
      },

      spacing: {
        xs: `${Spacing.xs}px`,
        sm: `${Spacing.sm}px`,
        md: `${Spacing.md}px`,
        lg: `${Spacing.lg}px`,
        xl: `${Spacing.xl}px`,
        xxl: `${Spacing.xxl}px`,
      },

      borderRadius: {
        sm: `${Radius.sm}px`,
        md: `${Radius.md}px`,
        lg: `${Radius.lg}px`,
        xl: `${Radius.xl}px`,
        full: `${Radius.full}px`,
      },

      fontSize: {
        xs: `${FontSize.xs}px`,
        sm: `${FontSize.sm}px`,
        md: `${FontSize.md}px`,
        lg: `${FontSize.lg}px`,
        xl: `${FontSize.xl}px`,
        xxl: `${FontSize.xxl}px`,
      },
    },
  },
  plugins: [],
};