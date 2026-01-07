/**
 * Simple rate limiter to prevent API abuse
 * Ensures minimum time between calls
 */
export class RateLimiter {
  private lastCall = 0
  private minInterval: number
  private queue: Array<() => void> = []
  private processing = false

  /**
   * @param callsPerSecond - Maximum calls allowed per second
   */
  constructor(callsPerSecond: number) {
    this.minInterval = 1000 / callsPerSecond
  }

  /**
   * Throttle a function call
   * @param fn - Async function to call
   * @returns Promise with function result
   */
  async throttle<T>(fn: () => Promise<T>): Promise<T> {
    const now = Date.now()
    const timeSinceLastCall = now - this.lastCall

    if (timeSinceLastCall < this.minInterval) {
      // Wait for the required interval
      await new Promise(resolve =>
        setTimeout(resolve, this.minInterval - timeSinceLastCall)
      )
    }

    this.lastCall = Date.now()
    return fn()
  }

  /**
   * Check if rate limit allows a call right now
   * @returns true if call can proceed immediately
   */
  canProceed(): boolean {
    const now = Date.now()
    const timeSinceLastCall = now - this.lastCall
    return timeSinceLastCall >= this.minInterval
  }

  /**
   * Get time until next call is allowed (in milliseconds)
   * @returns milliseconds to wait, or 0 if can proceed now
   */
  getWaitTime(): number {
    if (this.canProceed()) return 0

    const now = Date.now()
    const timeSinceLastCall = now - this.lastCall
    return this.minInterval - timeSinceLastCall
  }
}
