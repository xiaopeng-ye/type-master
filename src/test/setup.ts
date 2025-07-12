import '@testing-library/jest-dom/vitest'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(() => callback(Date.now()), 16) as unknown as number
}

global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id as unknown as NodeJS.Timeout)
}