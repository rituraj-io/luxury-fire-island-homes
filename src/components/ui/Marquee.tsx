// Marquee — shared right-to-left looping strip.
//
// Wraps the `marquee` keyframes from globals.css (0 → translateX(-50%)) in a
// component that gets the loop math correct:
//
//   1. Item spacing is applied via `itemClassName` (expected to include a
//      `mr-*` utility). Callers must NOT rely on flex `gap` — with flex gap,
//      the halfway point of the track falls mid-gap between copies, so the
//      -50% translate snaps back with a sub-pixel jitter. Putting the gap
//      inside each item (as trailing margin) keeps copy boundaries exact.
//
//   2. The list is duplicated `copies` times (default 4). Animation ends at
//      -50% = 2 copies of content, so with 4 copies there are always ≥2
//      copies of content sitting to the right of the viewport — no empty
//      tail on wide screens. -50% of any even number of copies still lands
//      on a copy boundary, so the loop stays seamless. Bump `copies` higher
//      only if single-copy width is smaller than half the viewport.
//
// Note: the `marquee-track` class disables the animation under
// `prefers-reduced-motion: reduce` (see globals.css).

import type { ReactNode } from "react";


type MarqueeProps<T> = {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** Seconds for one animation cycle. Default 70. */
  durationSeconds?: number;
  /** How many times to duplicate the list in the track. Default 4. */
  copies?: number;
  /** Classes applied to each `<li>`. MUST include a `mr-*` utility for item
   *  spacing — do not use flex `gap` on the track (see notes above). */
  itemClassName?: string;
  /** Extra classes on the `<ul>` track (e.g. explicit height, items-stretch). */
  trackClassName?: string;
  /** Extra classes on the outer `overflow-hidden` wrapper. */
  className?: string;
  ariaLabel?: string;
};


export default function Marquee<T>({
  items,
  renderItem,
  durationSeconds = 70,
  copies = 4,
  itemClassName,
  trackClassName,
  className,
  ariaLabel,
}: MarqueeProps<T>) {
  return (
    <div
      aria-label={ariaLabel}
      className={`relative overflow-hidden ${className ?? ""}`.trim()}
    >
      <ul
        className={`marquee-track flex w-max ${trackClassName ?? ""}`.trim()}
        style={{ animation: `marquee ${durationSeconds}s linear infinite` }}
      >
        {Array.from({ length: copies }, (_, copyIdx) =>
          items.map((item, itemIdx) => (
            <li key={`${copyIdx}-${itemIdx}`} className={itemClassName}>
              {renderItem(item, itemIdx)}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
