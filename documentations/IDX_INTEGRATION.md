# IDX Integration — Investigation Notes

Status: **Blocked, awaiting Showcase IDX support response.**

Goal: display MLS listings (specifically the "Fire Island" hotsheet) inside the Next.js site.

---

## Current account state (Showcase IDX admin)

- Admin URL: https://admin.showcaseidx.com
- Logged in as: Susan McCoy (sydney@realmccoyrealestate.com)
- **Plan:** Essentials (Monthly), Active
- MLS: **OneKey** (Long Island, NY) — Agent ID `81019`, Office ID `YRHM01`

Two websites registered on the account:

| Website | ID | Status | Notes |
|---|---|---|---|
| Your Home Sold Guaranteed Realty | 12842 | Active | All existing content lives here. Fire Island hotsheet is here. |
| Luxury Fire Island Homes | 18603 | **Pending** | Created for this project. Not provisioned. |

Hotsheet shortcode (on site 12842):

```
[showcaseidx_hotsheet name="Fire Island"]
```

---

## The problem

`[showcaseidx_hotsheet ...]` is a **WordPress shortcode**. WordPress parses it server-side via PHP and renders the widget. This site is Next.js — there is no shortcode parser. Pasting the shortcode into JSX renders it as literal text.

Everything Showcase IDX exposes in the admin UI (Hotsheets page, Settings → Shortcodes) only produces WordPress shortcodes. No universal JavaScript embed option is visible anywhere in the admin for the Essentials plan.

Premium Integrations page confirms the account is **not Premium** — all CRM integrations (Boomtown, Follow Up Boss, Lion Desk, Prospect Converter) show "Upgrade Now."

---

## What I researched

Community + Showcase IDX docs confirm:

- Showcase IDX officially markets as "the leading IDX plugin **for WordPress**" and recommends WordPress over Wix, Squarespace, etc.
- Showcase IDX's public API exists but is **Premium-only** and mostly used for CRM outbound (e.g. Follow Up Boss), not for fetching listings to render custom UI.
- No first-party JavaScript/universal embed is documented for non-WordPress sites.

---

## Paths forward (ranked)

### 1. Minimal WordPress subdomain + link/iframe (cheapest, ships fastest)

- Spin up a cheap WordPress install on e.g. `search.luxuryfireislandhomes.com` or `listings.luxuryfireislandhomes.com`
- Install the Showcase IDX WP plugin on that subdomain
- Drop the `[showcaseidx_hotsheet name="Fire Island"]` shortcode on a WP page
- Either:
  - **(a)** Link out from the Next.js site to that subdomain for the "Search Listings" page, or
  - **(b)** Iframe the WP page into Next.js (worse SEO, fiddly height handling, styling mismatch)
- **Tradeoffs:** iframe content isn't indexed by Google; styling won't perfectly match; separate infra to maintain. Link-out is cleaner than iframe.

### 2. Upgrade the Showcase IDX plan

- Contact support first (see questions below). If a higher tier unlocks a universal JS embed or proper API access, this is the cleanest integration.
- Cost unknown until support confirms.

### 3. Switch IDX providers to one that natively supports Next.js / any website

Common community recommendations when Showcase IDX doesn't fit a non-WordPress stack:

- **iHomefinder** — "IDX for Any Website" product, no iframes, SEO-friendly
- **IDX Broker** — widget-based, works on most platforms
- **Add On IDX** — built specifically for Webflow / Squarespace / Framer
- **Buying Buddy** — Squarespace-focused, no iframes

Switching means re-registering with OneKey MLS under the new provider. Takes days/weeks for MLS approval.

### 4. Custom build against OneKey MLS feed directly

- Apply for a OneKey data feed (RETS/RESO Web API)
- Build the listing UI from scratch in Next.js
- Biggest lift, best SEO, most control. Overkill for a single-agent site unless scope grows.

---

## Questions to ask Showcase IDX support

1. I'm on the Essentials plan and my site is Next.js, not WordPress. Do you offer a **non-WordPress embed** — a JavaScript widget, iframe embed, or API access for listing display? If yes, **what plan unlocks it and at what price**?
2. Our second website ("Luxury Fire Island Homes", id **18603**) is in **Pending** status. What's required to activate it, and does its activation change the embed options available to us?
3. Do you have a **recommended partner provider** for agents whose sites are not on WordPress?
4. Does the Essentials plan provide any form of read-only API access to listing data from the OneKey MLS feed we already have configured?

---

## Decision matrix (fill in after support replies)

| Path | Unlocked? | Monthly cost delta | Dev effort | SEO | Ship speed |
|---|---|---|---|---|---|
| 1. WP subdomain + link-out | Always available | ~$5–20 (WP host) | Low | Split — WP subdomain ranks separately | Fastest |
| 1b. WP subdomain + iframe | Always available | Same as above | Low-medium | Bad (iframe not indexed) | Fast |
| 2. Upgrade Showcase IDX | TBD from support | TBD | Low if JS embed exists | Good | Fast |
| 3. Switch provider (iHomefinder / IDX Broker / Add On IDX) | Requires MLS re-approval | ~$50–100/mo typical | Medium | Good | Slow (weeks for MLS) |
| 4. Custom MLS feed build | Requires MLS feed approval | Feed fee + dev time | High | Best | Slowest |

---

## Next steps

1. **[User]** Contact Showcase IDX support with the four questions above.
2. **[User]** Paste their response into this doc (append under a new "Support response" section).
3. **[Us together]** Pick a path based on the decision matrix, then build.

When support replies, come back to this file and we'll proceed.
