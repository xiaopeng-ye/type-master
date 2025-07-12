import { Trophy, Target, Clock, RotateCcw } from '@/lib/icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TypingStats } from '@/types/typing';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  stats: TypingStats;
}

export const ResultsModal = ({ isOpen, onClose, onRestart, stats }: ResultsModalProps) => {
  const getWPMRating = (wpm: number) => {
    if (wpm >= 80) return { rating: 'Expert', color: 'text-purple-600' };
    if (wpm >= 60) return { rating: 'Advanced', color: 'text-blue-600' };
    if (wpm >= 40) return { rating: 'Intermediate', color: 'text-green-600' };
    if (wpm >= 20) return { rating: 'Beginner', color: 'text-yellow-600' };
    return { rating: 'Novice', color: 'text-red-600' };
  };

  const wpmRating = getWPMRating(stats.wpm);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Test Complete!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {stats.wpm} WPM
            </div>
            <div className={`text-lg font-semibold ${wpmRating.color}`}>
              {wpmRating.rating}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{stats.accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{stats.timeElapsed}s</div>
                <div className="text-sm text-muted-foreground">Time</div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">Statistics</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Correct Characters: <span className="font-mono font-bold text-green-600">{stats.correctChars}</span></div>
              <div>Incorrect Characters: <span className="font-mono font-bold text-red-600">{stats.incorrectChars}</span></div>
              <div>Total Characters: <span className="font-mono font-bold">{stats.totalChars}</span></div>
              <div>Speed: <span className="font-mono font-bold">{stats.wpm} WPM</span></div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={onRestart} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">
                Close
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};