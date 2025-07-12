import { useEffect, useRef, memo, useMemo } from 'react';
import { TypingState } from '@/types/typing';

interface TypingAreaProps {
  typingState: TypingState;
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onReset: () => void;
  showResults: boolean; // 新增：是否显示结果弹窗
}

const TypingAreaComponent = ({ typingState, onKeyPress, onBackspace, onReset, showResults }: TypingAreaProps) => {
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current && !showResults) {
      inputRef.current.focus();
    }
  }, [showResults]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 如果显示结果弹窗，完全禁用所有键盘输入
      if (showResults) {
        e.preventDefault();
        return;
      }

      // 如果测试已完成但还没显示结果弹窗，也禁用键盘输入
      if (typingState.isComplete) {
        e.preventDefault();
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        onBackspace();
      } else if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        onReset();
      } else if (e.key.length === 1) {
        e.preventDefault();
        onKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typingState.isComplete, showResults, onKeyPress, onBackspace, onReset]);

  const renderedText = useMemo(() => {
    return typingState.currentText.split('').map((char, index) => {
      let className = 'transition-all duration-75 ';
      
      if (index < typingState.currentIndex) {
        if (typingState.errors.has(index)) {
          className += 'bg-destructive/20 text-destructive-foreground';
        } else {
          className += 'bg-green-500/20 text-green-700 dark:text-green-400';
        }
      } else if (index === typingState.currentIndex && !typingState.isComplete) {
        className += 'bg-primary/30 text-primary border-l-2 border-primary';
      } else {
        className += 'text-muted-foreground';
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  }, [typingState.currentText, typingState.currentIndex, typingState.errors, typingState.isComplete]);

  return (
    <div className="relative">
      <div
        ref={inputRef}
        role="textbox"
        tabIndex={showResults ? -1 : 0} // 结果弹窗时移除焦点
        className={`w-full p-6 bg-card border-2 border-border rounded-lg min-h-[200px] text-lg leading-relaxed ${
          showResults || typingState.isComplete 
            ? 'cursor-default opacity-75' 
            : 'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-text'
        }`}
      >
        <div className="font-mono whitespace-pre-wrap">
          {renderedText}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        {showResults && (
          <p className="text-orange-600 dark:text-orange-400 font-medium">
            请使用鼠标点击按钮来重新开始测试
          </p>
        )}
        {!showResults && !typingState.isActive && !typingState.isComplete && (
          <p>Start typing to begin the test</p>
        )}
        {!showResults && typingState.isActive && (
          <p>Press <kbd className="px-2 py-1 bg-muted rounded">Shift + Tab</kbd> to restart</p>
        )}
      </div>
    </div>
  );
};

export const TypingArea = memo(TypingAreaComponent);