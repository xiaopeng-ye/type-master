export const wordBank = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice.",
    "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole.",
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief.",
    "To be or not to be, that is the question. Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
    "All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys' house.",
    "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore.",
    "It is a truth universally acknowledged that a single man in possession of a good fortune must be in want of a wife.",
    "The sun did not shine. It was too wet to play. So we sat in the house all that cold, cold, wet day.",
    "In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God.",
    "Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty and dedicated to the proposition that all men are created equal.",
    "Space: the final frontier. These are the voyages of the starship Enterprise. Its continuing mission: to explore strange new worlds, to seek out new life and new civilizations.",
    "The future belongs to those who believe in the beauty of their dreams. Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Technology is best when it brings people together. Innovation distinguishes between a leader and a follower. The way to get started is to quit talking and begin doing.",
    "Climate change is real and it's happening now. We must take action to protect our planet for future generations. Every small step counts in making a difference.",
    "Education is the most powerful weapon which you can use to change the world. The beautiful thing about learning is that no one can take it away from you."
];

// 文本缓存，避免重复选择相同文本
let lastSelectedIndex = -1;

export const getRandomText = (): string => {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * wordBank.length);
    } while (newIndex === lastSelectedIndex && wordBank.length > 1);
    
    lastSelectedIndex = newIndex;
    return wordBank[newIndex];
};

// 预选文本，提升用户体验
export const getNextText = (): string => {
    return getRandomText();
}; 