/**
 * Haptic feedback utility for mobile devices
 * Provides subtle vibration feedback on key interactions
 *
 * Note: Not all devices support vibration API, and users can disable it.
 * Use sparingly for important interactions only.
 */

export type HapticIntensity = 'light' | 'medium' | 'heavy'

/**
 * Trigger haptic feedback on supported devices
 * @param intensity - The intensity of the vibration
 */
export function hapticFeedback(intensity: HapticIntensity = 'light'): void {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return
  }

  // Check if Vibration API is supported
  if (!('vibrate' in navigator)) {
    return
  }

  // Duration in milliseconds based on intensity
  const duration = {
    light: 10,
    medium: 20,
    heavy: 30,
  }[intensity]

  try {
    navigator.vibrate(duration)
  } catch (error) {
    // Silently fail if vibration is not supported or blocked
    console.debug('Haptic feedback not available:', error)
  }
}

/**
 * Trigger a success pattern (two quick taps)
 */
export function hapticSuccess(): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([10, 50, 10])
    } catch (error) {
      console.debug('Haptic feedback not available:', error)
    }
  }
}

/**
 * Trigger an error pattern (longer vibration)
 */
export function hapticError(): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([50])
    } catch (error) {
      console.debug('Haptic feedback not available:', error)
    }
  }
}

/**
 * Cancel all ongoing vibrations
 */
export function hapticCancel(): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(0)
    } catch (error) {
      console.debug('Haptic feedback not available:', error)
    }
  }
}
