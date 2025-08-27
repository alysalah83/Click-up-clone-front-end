import { ThemeProvider as ThemeContext } from "next-themes";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext
      storageKey="theme"
      defaultTheme="system"
      attribute="class"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeContext>
  );
}

export default ThemeProvider;
