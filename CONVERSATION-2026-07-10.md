# Conversation Record - 2026-07-10

## Project

`rbtc-nktrefer`

## User requests

- Evaluate whether moving the GitHub Pages site to `rbtctw.com` is necessary.
- Move the NKT reference site to `nkt-refer.rbtctw.com`.
- Use the user's logged-in Wix DNS management page to complete DNS setup.
- Check whether GitHub Pages HTTPS certificate provisioning had completed.
- Fix the stuck HTTPS certificate state and complete the branded-domain migration.
- Run the closeout process so the approach can be reused for other projects.

## Key decisions

- Used a subdomain, `nkt-refer.rbtctw.com`, rather than the apex domain `rbtctw.com`.
- Treated the custom domain as branding and link hygiene, not as a security/privacy control.
- Kept DNS changes narrowly scoped to a single new CNAME record.
- Used GitHub Pages `CNAME` file plus Wix DNS CNAME as the primary implementation path.
- When GitHub Pages certificate provisioning stayed stuck, reset the custom domain on GitHub Pages by temporarily removing it and adding it back.

## Implementation summary

- Repo change:
  - Added `CNAME` with `nkt-refer.rbtctw.com`.
  - Committed and pushed `047f0bc Add custom domain for NKT reference`.
- Wix DNS change:
  - Added CNAME:
    - Host: `nkt-refer`
    - Target: `weida6610.github.io`
    - TTL: `1 小時`
- GitHub Pages repair:
  - Confirmed GitHub Pages had `cname: nkt-refer.rbtctw.com` but no certificate.
  - Removed custom domain through GitHub API.
  - Re-added `nkt-refer.rbtctw.com`.
  - Confirmed certificate state changed to `approved`.
  - Enabled `https_enforced`.
- Documentation:
  - Added `CUSTOM_DOMAIN_RUNBOOK.md` for future GitHub Pages custom-domain migrations.

## Verification results

- DNS:
  - `dig CNAME nkt-refer.rbtctw.com +short`
  - Result: `weida6610.github.io.`
- GitHub Pages:
  - `status: built`
  - `cname: nkt-refer.rbtctw.com`
  - `https_certificate.state: approved`
  - `https_enforced: true`
- HTTP/HTTPS:
  - `https://nkt-refer.rbtctw.com` returned `HTTP/2 200`.
  - `http://nkt-refer.rbtctw.com` returned `301 Moved Permanently` to HTTPS.

## Deployment state

- Final public URL:
  - `https://nkt-refer.rbtctw.com`
- GitHub Pages legacy URL still exists as the hosting backend, but the branded domain is enforced for normal use.
- DNS remains managed by Wix:
  - `ns0.wixdns.net`
  - `ns1.wixdns.net`

## Continuation context

- For the next GitHub Pages site:
  - Add repo `CNAME`.
  - Push.
  - Add Wix CNAME to `weida6610.github.io` or the relevant GitHub Pages owner host.
  - Confirm DNS.
  - Confirm GitHub Pages recognizes the custom domain.
  - Enable HTTPS only after the certificate is approved.
  - If certificate provisioning gets stuck, remove and re-add the Pages custom domain.

## Notes

- Do not change Wix apex A records unless intentionally moving the main `rbtctw.com` site.
- Do not change existing `www`, `coach-prep`, TXT, MX, or NS records unless the project specifically requires it.
