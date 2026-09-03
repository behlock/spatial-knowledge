export const config = {
  /** Optional analytics script, injected only when set. */
  STATS_TRACKING_URL: process.env.NEXT_PUBLIC_STATS_TRACKING_URL ?? '',
} as const
