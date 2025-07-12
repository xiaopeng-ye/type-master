import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTyping } from '@/hooks/useTyping'

// Mock Date.now
const mockDate = vi.fn()
vi.stubGlobal('Date', { ...Date, now: mockDate })

describe('useTyping Hook', () => {
  beforeEach(() => {
    mockDate.mockReturnValue(1000000) // Fixed timestamp
  })

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useTyping('hello world', 60))

    expect(result.current.typingState.currentText).toBe('hello world')
    expect(result.current.typingState.userInput).toBe('')
    expect(result.current.typingState.currentIndex).toBe(0)
    expect(result.current.typingState.isActive).toBe(false)
    expect(result.current.typingState.isComplete).toBe(false)
    expect(result.current.timeLeft).toBe(60)
  })

  it('should handle correct key press', () => {
    const { result } = renderHook(() => useTyping('hello', 60))

    act(() => {
      result.current.handleKeyPress('h')
    })

    expect(result.current.typingState.userInput).toBe('h')
    expect(result.current.typingState.currentIndex).toBe(1)
    expect(result.current.typingState.isActive).toBe(true)
    expect(result.current.typingState.errors.size).toBe(0)
  })

  it('should handle incorrect key press', () => {
    const { result } = renderHook(() => useTyping('hello', 60))

    act(() => {
      result.current.handleKeyPress('x')
    })

    expect(result.current.typingState.userInput).toBe('x')
    expect(result.current.typingState.currentIndex).toBe(1)
    expect(result.current.typingState.errors.has(0)).toBe(true)
  })

  it('should handle backspace', () => {
    const { result } = renderHook(() => useTyping('hello', 60))

    // Type some characters first
    act(() => {
      result.current.handleKeyPress('h')
      result.current.handleKeyPress('e')
    })

    expect(result.current.typingState.currentIndex).toBe(2)

    // Backspace
    act(() => {
      result.current.handleBackspace()
    })

    expect(result.current.typingState.currentIndex).toBe(1)
    expect(result.current.typingState.userInput).toBe('h')
  })

  it('should complete test when all characters are typed', () => {
    const { result } = renderHook(() => useTyping('hi', 60))

    act(() => {
      result.current.handleKeyPress('h')
      result.current.handleKeyPress('i')
    })

    expect(result.current.typingState.isComplete).toBe(true)
    expect(result.current.typingState.isActive).toBe(false)
  })

  it('should reset state correctly', () => {
    const { result } = renderHook(() => useTyping('hello', 60))

    // Type some characters
    act(() => {
      result.current.handleKeyPress('h')
      result.current.handleKeyPress('x') // error
    })

    // Reset
    act(() => {
      result.current.reset()
    })

    expect(result.current.typingState.userInput).toBe('')
    expect(result.current.typingState.currentIndex).toBe(0)
    expect(result.current.typingState.isActive).toBe(false)
    expect(result.current.typingState.errors.size).toBe(0)
    expect(result.current.timeLeft).toBe(60)
  })

  it('should handle hyphen and em dash as equivalent characters', () => {
    // Test regular hyphen in text, user types hyphen
    const { result: result1 } = renderHook(() => useTyping('test-case', 60))
    
    act(() => {
      result1.current.handleKeyPress('t')
      result1.current.handleKeyPress('e')
      result1.current.handleKeyPress('s')
      result1.current.handleKeyPress('t')
      result1.current.handleKeyPress('-')
    })

    expect(result1.current.typingState.errors.has(4)).toBe(false)
    expect(result1.current.typingState.currentIndex).toBe(5)

    // Test em dash in text, user types regular hyphen
    const { result: result2 } = renderHook(() => useTyping('test—case', 60))
    
    act(() => {
      result2.current.handleKeyPress('t')
      result2.current.handleKeyPress('e')
      result2.current.handleKeyPress('s')
      result2.current.handleKeyPress('t')
      result2.current.handleKeyPress('-') // User types regular hyphen
    })

    expect(result2.current.typingState.errors.has(4)).toBe(false)
    expect(result2.current.typingState.currentIndex).toBe(5)

    // Test regular hyphen in text, user types em dash
    const { result: result3 } = renderHook(() => useTyping('test-case', 60))
    
    act(() => {
      result3.current.handleKeyPress('t')
      result3.current.handleKeyPress('e')
      result3.current.handleKeyPress('s')
      result3.current.handleKeyPress('t')
      result3.current.handleKeyPress('—') // User types em dash
    })

    expect(result3.current.typingState.errors.has(4)).toBe(false)
    expect(result3.current.typingState.currentIndex).toBe(5)
  })
})