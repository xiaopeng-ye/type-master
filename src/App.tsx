import { TypingTest } from '@/components/TypingTest';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen bg-background relative">
      <ThemeToggle />
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <main className="w-full max-w-5xl mx-auto flex items-center justify-center">
          <div className="w-full">
            <TypingTest />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
