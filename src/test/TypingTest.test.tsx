import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { TypingTest } from '@/components/TypingTest'

// Mock the wordBank to have predictable text
vi.mock('@/data/wordBank', () => ({
  getRandomText: () => 'test text for typing'
}))

describe('TypingTest Component', () => {
  it('should render the main title', () => {
    render(<TypingTest />)
    expect(screen.getByText('TypeMaster')).toBeInTheDocument()
  })

  it('should render timer controls', () => {
    render(<TypingTest />)
    expect(screen.getByText('15s')).toBeInTheDocument()
    expect(screen.getByText('30s')).toBeInTheDocument()
    expect(screen.getByText('60s')).toBeInTheDocument()
  })

  it('should render typing area', () => {
    render(<TypingTest />)
    // Check for typing area container
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render stats display', () => {
    render(<TypingTest />)
    expect(screen.getByText('WPM')).toBeInTheDocument()
    expect(screen.getByText('Accuracy')).toBeInTheDocument()
  })

  it('should render new test button', () => {
    render(<TypingTest />)
    expect(screen.getByText('New Test')).toBeInTheDocument()
  })

  it('should show initial instructions', () => {
    render(<TypingTest />)
    expect(screen.getByText('Start typing to begin the test')).toBeInTheDocument()
  })
})