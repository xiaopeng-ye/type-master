import { describe, it, expect } from 'vitest'
import { getRandomText } from '@/data/wordBank'

describe('WordBank Utils', () => {
  it('should return a string from wordBank', () => {
    const text = getRandomText()
    expect(typeof text).toBe('string')
    expect(text.length).toBeGreaterThan(0)
  })

  it('should not return the same text twice in a row', () => {
    const text1 = getRandomText()
    const text2 = getRandomText()
    // Note: this test might occasionally fail due to randomness
    // but should pass most of the time with our implementation
    expect(text1).not.toBe(text2)
  })
})