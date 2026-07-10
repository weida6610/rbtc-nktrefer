# GitHub Pages Custom Domain Runbook

This runbook documents the working process used to move `rbtc-nktrefer` to a branded Wix-managed subdomain.

## Goal

Use a professional RBTC subdomain for a GitHub Pages site, for example:

```text
https://nkt-refer.rbtctw.com
```

This improves presentation and link stability. It does not make a public GitHub repository private.

## Preconditions

- The GitHub Pages site is already working on its default GitHub Pages URL.
- The repo is published from the expected branch and path, such as `main` and `/`.
- The target domain is managed in Wix DNS.
- The desired subdomain is unused.

## Repo Setup

Add a root-level `CNAME` file:

```text
nkt-refer.rbtctw.com
```

Commit and push:

```bash
git add CNAME
git commit -m "Add custom domain for NKT reference"
git push origin main
```

## Wix DNS Setup

In Wix DNS, add a CNAME record:

```text
Type: CNAME
Host/Name: nkt-refer
Value/Target: weida6610.github.io
TTL: 1 hour or automatic
```

Do not change the apex `A` records for `rbtctw.com` unless the main website is intentionally being moved.

## Verification Commands

Check DNS:

```bash
dig CNAME nkt-refer.rbtctw.com +short
```

Expected:

```text
weida6610.github.io.
```

Check GitHub Pages:

```bash
gh api repos/OWNER/REPO/pages
```

Expected signals:

```text
status: built
cname: nkt-refer.rbtctw.com
https_certificate.state: approved
https_enforced: true
```

Check site response:

```bash
curl -I -L --max-time 20 https://nkt-refer.rbtctw.com
curl -I --max-time 20 http://nkt-refer.rbtctw.com
```

Expected:

```text
HTTPS: HTTP/2 200
HTTP: 301 Moved Permanently -> HTTPS
```

## HTTPS Certificate Repair

If GitHub Pages shows the custom domain and DNS is correct, but enabling HTTPS fails with:

```text
The certificate does not exist yet
```

Reset the GitHub Pages custom domain:

```bash
gh api repos/OWNER/REPO/pages --method PUT -f cname=
sleep 20
gh api repos/OWNER/REPO/pages --method PUT -f cname=nkt-refer.rbtctw.com
```

Then check:

```bash
gh api repos/OWNER/REPO/pages
```

When the certificate is approved, enable HTTPS:

```bash
gh api repos/OWNER/REPO/pages --method PUT -F https_enforced=true
```

## Notes For Future Projects

- Prefer subdomains such as `project-name.rbtctw.com`.
- Keep `rbtctw.com` reserved for the main RBTC website.
- Avoid changing unrelated Wix DNS records.
- A custom domain improves professionalism, but access control requires a separate private hosting or authentication layer.
