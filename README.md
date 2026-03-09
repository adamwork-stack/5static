# Cybersecurity Consulting — Static Website

A clean, professional static website for a B2B cybersecurity consulting business. Built with HTML, CSS, and JavaScript. No WordPress, no page builders.

## Pages

| Page | Path | In Menu |
|------|------|---------|
| Home | `index.html` | Yes |
| About | `about.html` | Yes |
| Services | `services.html` | Yes |
| Case Studies | `case-studies.html` | No (hidden) |
| Contact | `contact.html` | Yes |

## GoHighLevel Embeds

The Home and Contact pages include placeholders for GoHighLevel form and calendar embeds.

1. **Form**: Locate `<div id="gohighlevel-form">` and replace the placeholder content with your GoHighLevel form embed code.
2. **Calendar**: Locate `<div id="gohighlevel-calendar">` and replace the placeholder content with your GoHighLevel calendar embed code.

To get your embed codes in GoHighLevel: **Calendars > Calendar Settings > [your calendar] > Share > Embed Code tab**.

## Decap CMS

Editable content lives in `content/*.json`. Access the CMS at `/admin` when the site is deployed (e.g. `https://yoursite.com/admin`).

### Before First Use

1. Edit `admin/config.yml`:
   - Set `backend.repo` to your GitHub org/repo (e.g. `yourorg/cybersecurity-site`)
   - Set `site_url` to your production URL

2. **GitHub OAuth for Cloudflare Pages**: Decap CMS needs an OAuth flow to authenticate with GitHub. Options:
   - **Option A**: Deploy [decap-proxy](https://github.com/sterlingwes/decap-proxy) as a Cloudflare Worker, then add to config:
     ```yaml
     backend:
       base_url: https://your-worker.your-subdomain.workers.dev
     ```
   - **Option B**: If your team has push access to the repo, the GitHub backend may work directly (some setups require the proxy).

3. Give CMS users write access to the repository (or use the OAuth proxy).

## Cloudflare Pages Deployment

### 1. Create a GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_ORG/YOUR_REPO.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** > **Create** > **Pages** > **Connect to Git**
3. Select your repository
4. **Build settings**:
   - Framework preset: **None**
   - Build command: `exit 0`
   - Build output directory: `/`
   - Root directory: `/` (or leave blank)

5. Click **Save and Deploy**

### 3. Staging / Preview

- **Production**: Push to `main` — deploys to your primary URL
- **Staging**: Create a `staging` branch and push. Cloudflare creates a preview URL: `staging-<project-name>.pages.dev`
- Share the staging URL for review before merging to `main`

```bash
git checkout -b staging
git push -u origin staging
```

## DNS Instructions (Custom Domain)

### If your domain is on Cloudflare

1. Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
2. Enter your domain (e.g. `www.yoursite.com` or `yoursite.com`)
3. Cloudflare will add or suggest DNS records automatically. Accept or adjust as needed.

### If your domain is elsewhere (simple pointer)

Add a **CNAME record** at your DNS provider:

| Type | Name | Target | TTL |
|------|------|--------|-----|
| CNAME | `www` | `YOUR_PROJECT.pages.dev` | Auto or 3600 |

- **Name**: `www` for `www.yoursite.com`, or `@` for root domain (if supported)
- **Target**: Your Cloudflare Pages URL, e.g. `cybersecurity-site.pages.dev` (from the Pages project overview)
- **TTL**: Auto or 3600

**Root domain (`@`)**: Some providers don't allow CNAME at root. Use ALIAS, ANAME, or "flattened CNAME" if available, pointing to `YOUR_PROJECT.pages.dev`.

Then in Cloudflare Pages: **Custom domains** → **Set up a custom domain** → enter your domain and verify.

## Local Development

Serve the site locally (requires a simple HTTP server; file:// won't work for fetch):

```bash
npx serve .
# or
python -m http.server 8000
```

Open `http://localhost:3000` (or 8000). Content loads from `content/*.json`.

## Project Structure

```
├── index.html, about.html, services.html, case-studies.html, contact.html
├── css/main.css
├── js/main.js
├── js/cms-content.js
├── admin/
│   ├── index.html
│   └── config.yml
├── content/
│   ├── settings.json
│   ├── home.json
│   ├── about.json
│   ├── services.json
│   ├── case-studies.json
│   └── contact.json
├── images/uploads/
└── _headers
```

## License

Proprietary. All rights reserved.
