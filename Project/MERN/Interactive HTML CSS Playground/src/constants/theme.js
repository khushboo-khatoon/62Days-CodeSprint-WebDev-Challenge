// src/constants/theme.js
// Export light and dark theme color palettes as CSS variable objects.
export const lightTheme = {
  '--color-bg': 'hsl(0, 0%, 98%)', // near white
  '--color-surface': 'hsl(0, 0%, 100%)',
  '--color-primary': 'hsl(210, 60%, 50%)', // calm blue
  '--color-primary-foreground': 'hsl(0, 0%, 100%)',
  '--color-muted': 'hsl(210, 15%, 90%)',
  '--color-muted-foreground': 'hsl(210, 15%, 30%)',
  '--color-border': 'hsl(210, 15%, 85%)',
  '--color-input': 'hsl(0, 0%, 100%)',
  '--color-ring': 'hsl(210, 60%, 50%)',
};

export const darkTheme = {
  '--color-bg': 'hsl(220, 15%, 12%)',
  '--color-surface': 'hsl(220, 15%, 15%)',
  '--color-primary': 'hsl(210, 80%, 55%)',
  '--color-primary-foreground': 'hsl(0, 0%, 10%)',
  '--color-muted': 'hsl(210, 15%, 20%)',
  '--color-muted-foreground': 'hsl(210, 15%, 70%)',
  '--color-border': 'hsl(210, 15%, 25%)',
  '--color-input': 'hsl(220, 15%, 18%)',
  '--color-ring': 'hsl(210, 80%, 55%)',
};

// Utility to apply a theme object to the document root.
export function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
