/**
 * The brief instructs us to treat "today" as 31 May 2026 during development,
 * so the Hours-to-Limit chart has real data both behind and ahead of "today".
 * Centralising it here means swapping to `new Date()` later is a one-line change.
 */
export function useToday(): Date {
  return new Date('2026-05-31T00:00:00')
}
