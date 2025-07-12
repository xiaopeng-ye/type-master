import { Clock } from '@/lib/icons';
import { TimerMode } from '@/types/typing';
import { useEffect, useState } from 'react';

interface TimerProps {
  timeLeft: number;
  timerMode: TimerMode;
  onTimerModeChange: (mode: TimerMode) => void;
  isActive: boolean;
}

export const Timer = ({ timeLeft, timerMode, onTimerModeChange, isActive }: TimerProps) => {
  const [smoothProgress, setSmoothProgress] = useState(0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 创建真正平滑的进度更新
  useEffect(() => {
    if (!isActive) {
      setSmoothProgress(0);
      return;
    }

    // 记录这次更新的时间
    const now = Date.now();

    let animationId: number;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = timerMode - timeLeft;
      
      // 计算从上次整秒更新到现在的时间差
      const timeSinceLastUpdate = (currentTime - now) / 1000;
      const interpolatedElapsed = elapsed + timeSinceLastUpdate;
      
      // 计算平滑进度
      const progress = Math.min((interpolatedElapsed / timerMode) * 100, 100);
      setSmoothProgress(progress);

      // 如果测试还在进行且时间未到，继续更新
      if (timeLeft > 0 && progress < 100) {
        animationId = requestAnimationFrame(updateProgress);
      }
    };

    animationId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [timeLeft, timerMode, isActive]);

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <span className="text-2xl font-mono font-bold text-foreground">
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="flex gap-2">
        {([15, 30, 60] as TimerMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => onTimerModeChange(mode)}
            disabled={isActive}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${timerMode === mode
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {mode}s
          </button>
        ))}
      </div>

      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          style={{
            width: `${smoothProgress}%`,
            transition: 'none'
          }}
        />
      </div>
    </div>
  );
};