import { useState, useEffect, useCallback } from 'react';
import { TypingState, TypingStats, TimerMode } from '@/types/typing';

export const useTyping = (text: string, timerMode: TimerMode) => {
    const [typingState, setTypingState] = useState<TypingState>({
        currentText: text,
        userInput: '',
        currentIndex: 0,
        startTime: null,
        endTime: null,
        isActive: false,
        isComplete: false,
        errors: new Set(),
        stats: {
            wpm: 0,
            accuracy: 0,
            correctChars: 0,
            incorrectChars: 0,
            totalChars: 0,
            timeElapsed: 0,
        },
    });

    const [timeLeft, setTimeLeft] = useState(timerMode);

    const calculateStats = useCallback((state: TypingState): TypingStats => {
        const timeElapsed = state.endTime && state.startTime
            ? (state.endTime - state.startTime) / 1000
            : state.startTime ? (Date.now() - state.startTime) / 1000 : 0;

        const totalChars = state.userInput.length;
        const incorrectChars = state.errors.size;
        const correctChars = totalChars - incorrectChars;

        // 避免除零错误和优化计算
        const timeInMinutes = Math.max(timeElapsed / 60, 0.016); // 最小1秒
        const wpm = correctChars > 0 ? (correctChars / 5) / timeInMinutes : 0;
        const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;

        return {
            wpm: Math.max(0, Math.round(wpm)),
            accuracy: Math.max(0, Math.round(accuracy * 100) / 100),
            correctChars,
            incorrectChars,
            totalChars,
            timeElapsed: Math.round(timeElapsed),
        };
    }, []);

    const handleKeyPress = useCallback((char: string) => {
        setTypingState(prev => {
            if (prev.isComplete) return prev;

            const newState = { ...prev };
            const currentChar = prev.currentText[prev.currentIndex];

            // Start timer on first keypress
            if (!prev.startTime) {
                newState.startTime = Date.now();
                newState.isActive = true;
            }

            // Handle character input
            const isCharMatch = char === currentChar || 
                               (char === '-' && currentChar === '—') || 
                               (char === '—' && currentChar === '-');
            
            if (isCharMatch) {
                newState.userInput += char;
                newState.currentIndex++;
            } else {
                newState.userInput += char;
                newState.errors.add(prev.currentIndex);
                newState.currentIndex++;
            }

            // Check completion
            if (newState.currentIndex >= prev.currentText.length) {
                newState.isComplete = true;
                newState.isActive = false;
                newState.endTime = Date.now();
            }

            newState.stats = calculateStats(newState);
            return newState;
        });
    }, [calculateStats]);

    const handleBackspace = useCallback(() => {
        setTypingState(prev => {
            if (prev.currentIndex === 0 || prev.isComplete) return prev;

            const newState = { ...prev };
            newState.currentIndex--;
            newState.userInput = prev.userInput.slice(0, -1);
            newState.errors.delete(prev.currentIndex - 1);
            newState.stats = calculateStats(newState);
            return newState;
        });
    }, [calculateStats]);

    const reset = useCallback(() => {
        setTypingState({
            currentText: text,
            userInput: '',
            currentIndex: 0,
            startTime: null,
            endTime: null,
            isActive: false,
            isComplete: false,
            errors: new Set(),
            stats: {
                wpm: 0,
                accuracy: 0,
                correctChars: 0,
                incorrectChars: 0,
                totalChars: 0,
                timeElapsed: 0,
            },
        });
        setTimeLeft(timerMode);
    }, [text, timerMode]);

    // Timer effect - 修复计时器逻辑
    useEffect(() => {
        if (!typingState.isActive || typingState.isComplete) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // 时间到了，结束测试
                    setTypingState(state => ({
                        ...state,
                        isComplete: true,
                        isActive: false,
                        endTime: Date.now(),
                        stats: calculateStats(state),
                    }));
                    return prev; // 保持当前值而不是返回0
                }
                return (prev - 1) as TimerMode;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [typingState.isActive, typingState.isComplete, calculateStats]);

    // 重置时间当模式改变时
    useEffect(() => {
        if (!typingState.isActive) {
            setTimeLeft(timerMode);
        }
    }, [timerMode, typingState.isActive]);

    return {
        typingState,
        timeLeft,
        handleKeyPress,
        handleBackspace,
        reset,
    };
}; 