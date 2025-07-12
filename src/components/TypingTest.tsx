import { useState, useEffect } from 'react';
import { RotateCcw, Keyboard } from '@/lib/icons';
import { Button } from '@/components/ui/button';
import { Timer } from './Timer';
import { TypingArea } from './TypingArea';
import { StatsDisplay } from './StatsDisplay';
import { ResultsModal } from './ResultsModal';
import { useTyping } from '@/hooks/useTyping';
import { getRandomText } from '@/data/wordBank';
import { TimerMode } from '@/types/typing';

export const TypingTest = () => {
  const [currentText, setCurrentText] = useState(getRandomText());
  const [timerMode, setTimerMode] = useState<TimerMode>(60);
  const [showResults, setShowResults] = useState(false);

  const { typingState, timeLeft, handleKeyPress, handleBackspace, reset } = useTyping(currentText, timerMode);

  useEffect(() => {
    if (typingState.isComplete) {
      // 延迟一点显示结果，让用户看到最后的输入效果
      const timer = setTimeout(() => {
        setShowResults(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [typingState.isComplete]);

  const handleReset = () => {
    setCurrentText(getRandomText());
    reset();
    setShowResults(false);
  };

  const handleTimerModeChange = (mode: TimerMode) => {
    if (!typingState.isActive) {
      setTimerMode(mode);
      handleReset();
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Keyboard className="w-10 h-10 text-primary" />
          <h1 className="text-5xl font-bold text-foreground tracking-tight">TypeMaster</h1>
        </div>
        <p className="text-muted-foreground text-xl">
          Test your typing speed and accuracy
        </p>
      </div>

      {/* Timer */}
      <Timer
        timeLeft={timeLeft}
        timerMode={timerMode}
        onTimerModeChange={handleTimerModeChange}
        isActive={typingState.isActive}
      />

      {/* Stats */}
      <StatsDisplay stats={typingState.stats} isActive={typingState.isActive} />

      {/* Typing Area */}
      <TypingArea
        typingState={typingState}
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onReset={handleReset}
        showResults={showResults}
      />

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex items-center gap-2 px-6 py-3 text-base"
          disabled={showResults} // 结果弹窗时禁用重置按钮
        >
          <RotateCcw className="w-5 h-5" />
          New Test
        </Button>
      </div>

      {/* Results Modal */}
      <ResultsModal
        isOpen={showResults}
        onClose={handleCloseResults}
        onRestart={handleReset}
        stats={typingState.stats}
      />
    </div>
  );
};