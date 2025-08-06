import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock global fetch if not available
global.fetch = vi.fn()