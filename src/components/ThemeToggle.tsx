import { Moon, Sun } from '@/lib/icons';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-7 right-7 z-50 w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-accent transition-all duration-200 shadow-lg"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-10 w-10 text-foreground transition-all" />
      ) : (
        <Moon className="h-10 w-10 text-foreground transition-all" />
      )}
    </Button>
  );
};