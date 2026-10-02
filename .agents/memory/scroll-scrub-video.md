---
name: Scroll-scrub video performance
description: Rendering tradeoffs for the portfolio's scroll-driven portrait background.
---

For the 1280×720 source, favor smooth, low-lag scroll playback over an upscaled 4K encode. Use native-resolution, motion-interpolated 60 fps slow-motion clips in forward and reverse. Start playback only while the page is actively scrolling, pause shortly after scroll input stops, and switch clips when scroll direction changes. Keep zoom, autoplay, and looping disabled.

**Why:** Seeking a frame for every scroll update still felt stepped and stuck. The user chose continuous slow motion during active scrolling over exact frame-to-scroll-position matching; the source has no native 4K detail.

**How to apply:** When replacing this background or changing its behavior, preserve no-autoplay, no-loop, no-zoom, and bidirectional scroll behavior. Re-test forward playback, reverse playback, pause-on-idle, and direction changes in Chromium rather than relying on still screenshots.