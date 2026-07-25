# Final site audit — v8

## Fixed in this pass
- Raised small secondary typography across Home, Work and Contact while preserving the approved minimal visual language.
- Increased Persian Resume screen typography by +3 px equivalents without changing the Persian font family.
- Added a compact Credentials & Training section to Home. A separate credentials page was intentionally not added yet because there is only one public/verifiable certificate; a standalone page would currently feel sparse.
- Added the redacted Data Analytics certificate preview + direct PDF link.
- Kept CEH explicitly as training, not an official CEH certification.
- Added discoverable vCard download from Contact.
- Added Open Graph metadata, Twitter card metadata and Person structured data.
- Added visible keyboard focus styles and aria-current on active navigation items.
- Updated internal package/build naming from the older Personal OS concept.

## Deliberately not changed
- Overall English-only website architecture.
- English Resume design/content structure.
- Persian Resume font family and visual style.
- Resume bilingual behavior: /resume/ and /resume/fa/.

## Remaining evidence gap
The analytics projects have strong descriptions and internal case-study anchors, but they still do not have dedicated public GitHub repository/report URLs. This is the main remaining credibility gap. Add those links only after the repositories are actually published; do not use placeholders.

## Credentials recommendation
Keep credentials as a compact Home section while there are only one or two items. Create /credentials/ only after there are roughly 3+ meaningful, verifiable certificates/licenses so the page has enough substance to justify a navigation destination.
