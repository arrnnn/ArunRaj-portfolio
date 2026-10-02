---
name: Scroll-scrub video performance
description: Rendering tradeoffs for the portfolio's scroll-driven portrait background.
---

For the 1280×720 source, favor smooth, low-lag scroll scrubbing over an upscaled 4K playback encode. Interpolated 60 fps output provides more frame positions for the scroll timeline; drive it from raw page progress (no spring), and serialize current-time seeks by retaining only the latest desired frame until the current seek finishes. Keep zoom disabled.

**Why:** The source has no native 4K detail, while decoding 4K during repeated seeks caused visible stalls and a smoothed scroll spring added lag.

**How to apply:** When replacing this background or changing its scrub behavior, preserve the user's no-zoom, scroll-only requirement; re-test continuous forward and reverse scrolling in Chromium rather than relying on still screenshots.