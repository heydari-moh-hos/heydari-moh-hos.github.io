# GitHub Pages test deployment

Recommended test repository:
`heydari-moh-hos.github.io`

Why this repo name:
The site currently uses root-relative URLs such as `/assets/...` and `/work/...`.
A GitHub user-site repository publishes at the root URL:
`https://heydari-moh-hos.github.io/`
so those links work without modifying the approved site.

## Steps

1. Create a NEW PUBLIC repository named exactly:
   `heydari-moh-hos.github.io`

2. Upload/push all files from this package to the repository's `main` branch.

3. Open:
   `Settings > Pages`

4. Under `Build and deployment`, set `Source` to:
   `GitHub Actions`

5. Open the repository's `Actions` tab.
   Wait for `Deploy GitHub Pages` to complete successfully.

6. Test this URL without VPN:
   `https://heydari-moh-hos.github.io/`

Do NOT connect `mhheydari.ir` yet.
First confirm the `github.io` address opens correctly on Iranian mobile/fixed internet without VPN.

After that test passes, the custom domain can be moved from Cloudflare Pages to GitHub Pages.
