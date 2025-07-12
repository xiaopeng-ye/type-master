import { Activity, Target, Zap } from '@/lib/icons';
import { TypingStats } from '@/types/typing';

interface StatsDisplayProps {
  stats: TypingStats;
  isActive: boolean;
}

export const StatsDisplay = ({ stats, isActive }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <Zap className="w-5 h-5 mx-auto mb-2 text-blue-500" />
        <div className="text-2xl font-bold font-mono">
          {isActive ? stats.wpm : 0}
        </div>
        <div className="text-sm text-muted-foreground">WPM</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <Target className="w-5 h-5 mx-auto mb-2 text-green-500" />
        <div className="text-2xl font-bold font-mono">
          {isActive ? stats.accuracy.toFixed(0) : 0}%
        </div>
        <div className="text-sm text-muted-foreground">Accuracy</div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <Activity className="w-5 h-5 mx-auto mb-2 text-orange-500" />
        <div className="text-2xl font-bold font-mono">
          {stats.totalChars}
        </div>
        <div className="text-sm text-muted-foreground">Characters</div>
      </div>
    </div>
  );
};