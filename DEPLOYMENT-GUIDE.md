# LeBron James Tribute Site — Full Deployment Guide

Step-by-step walkthrough of building and deploying **lebronjamesthegreat.com** from scratch, including every command, platform step, and bug fix encountered along the way.

**Date:** March 8, 2026
**Stack:** Static HTML + Tailwind CSS CDN + Cloudflare Pages + GoDaddy Domain

---

## Phase 1: Project Initialization

### 1.1 Create the Project Folder
- Created the project at `C:\Users\eddyo\OneDrive\Desktop\Projects\Lebron`
- The site is a single `index.html` file — no build tools, no framework

### 1.2 Generate CLAUDE.md
- Ran `/init` to create a `CLAUDE.md` file documenting the project structure
- **Bug:** First attempt failed with an OAuth token expiration (401 error)
- **Fix:** Ran `/login` to re-authenticate, then re-ran `/init` successfully

---

## Phase 2: Local Development

### 2.1 Launch Local Server
```bash
python -m http.server 8000
```
- Site available at `http://localhost:8000`

### 2.2 Design the Site
Built a full tribute page with:
- Hero section with canvas particle system and ghost "23" jersey number
- Career stats with animated counters (IntersectionObserver)
- Image gallery with real Wikimedia Commons photos
- YouTube video embeds
- Glass-morphism cards, gradient text shimmer, scroll-reveal animations
- Custom Tailwind config: `lebron-gold (#FFD700)`, `lebron-purple (#4A148C)`, `lebron-dark (#0a0a0a)`
- Fonts: Oswald, Bebas Neue, Inter via Google Fonts CDN

### 2.3 Bugs Fixed During Development

| Bug | Cause | Fix |
|-----|-------|-----|
| Placeholder images not loading | Using generic stock photo URLs | Queried Wikipedia API for real Wikimedia Commons LeBron photos |
| Wikimedia 429 rate limit errors | Too many curl requests during testing | Used Wikipedia API (`action=query&prop=imageinfo`) instead of hitting image servers directly |
| YouTube videos not playing | Placeholder video IDs were invalid | Scraped YouTube search results for real `videoId` values, verified via YouTube oembed API |
| Bash `${!ids[@]}` syntax error | Shell syntax incompatibility | Rewrote YouTube verification as a function-based approach |
| Page too long / endless scrolling | 9 sections was excessive | Condensed to 5 sections by merging and removing |
| Gallery row 2 broken images | Wikimedia 800px thumbnails unreliable | Replaced with alternative images, upgraded all to 960px thumbnails |

---

## Phase 3: Git & GitHub Setup

### 3.1 Initialize Git Repository
```bash
cd "C:/Users/eddyo/OneDrive/Desktop/Projects/Lebron"
git init
git add index.html README.md
```

### 3.2 First Commit Attempt — FAILED
```bash
git commit -m "Initial commit: LeBron James tribute website"
```
**Error:**
```
fatal: unable to auto-detect email address (got 'eddyo@Genesis.(none)')
```
Git had no user identity configured on this machine.

### 3.3 Fix: Configure Git Identity (Repo-Level)
```bash
git config user.name "StackModus"
git config user.email "stackmodus365@gmail.com"
```
> Used repo-level config (not `--global`) to keep it scoped to this project.

### 3.4 Successful Commit
```bash
git commit -m "Initial commit: LeBron James tribute website"
# [master (root-commit) 8212a6f] Initial commit: LeBron James tribute website
#  2 files changed, ...
```

### 3.5 Push to GitHub — GitHub CLI Not Installed
```bash
gh auth status
# gh: command not found
```
**Workaround:** Created the repo manually on github.com instead of using the CLI.

### 3.6 Create GitHub Repository
1. Go to **github.com/new**
2. Repository name: `lebronjamesthegreat`
3. Set to **Public**
4. Do NOT initialize with README (we already have files)
5. Click **Create repository**

### 3.7 Connect and Push
```bash
git remote add origin https://github.com/StackModus/lebronjamesthegreat.git
git push -u origin master
```
Push succeeded. Repository live at `https://github.com/stackmodus/lebronjamesthegreat`

---

## Phase 4: Cloudflare Pages Deployment

### 4.1 Create Cloudflare Account
1. Go to **dash.cloudflare.com**
2. Sign up for a free account (or log in if you have one)

### 4.2 Navigate to Pages (Not Workers!)
1. In the left sidebar, click **Workers & Pages**
2. Click **Create**

> **Bug encountered:** The default creation flow opens **Workers** setup (which requires wrangler build commands). This is NOT what we want for a static site.

3. **Fix:** At the bottom of the Workers setup page, look for the link:
   > *"Looking to deploy Pages? Get started"*
4. Click **"Get started"** to switch to Pages

### 4.3 Connect GitHub Repository
1. Click **Connect to Git**
2. Authorize Cloudflare to access your GitHub account
3. Select the **`lebronjamesthegreat`** repository (check the checkbox)
4. Click **Begin setup**

### 4.4 Configure Build Settings
| Setting | Value |
|---------|-------|
| Project name | `lebronjamesthegreat` |
| Production branch | `master` |
| Framework preset | None |
| Build command | *(leave blank)* |
| Build output directory | *(leave blank)* |

> Since this is a plain static HTML site with no build step, both the build command and output directory should be left empty. Cloudflare will serve the files as-is.

### 4.5 Deploy
1. Click **Save and Deploy**
2. Wait for the build to complete (usually under 1 minute for static sites)
3. **Result:** Site deployed to `lebronjamesthegreat.pages.dev`

### 4.6 Verify Deployment
- Visit `https://lebronjamesthegreat.pages.dev` in your browser
- Confirmed: full site loads with all sections, images, and animations

---

## Phase 5: Custom Domain Setup (GoDaddy + Cloudflare)

### 5.1 Add Domain to Cloudflare
1. In the Cloudflare dashboard, click **Add a site** (or go to Websites > Add a site)
2. Enter: `lebronjamesthegreat.com`
3. Keep **"Quick scan for DNS records"** selected
4. Click **Continue**

### 5.2 Select the Free Plan
- Cloudflare shows pricing tiers (Free, Pro, Business, Enterprise)
- Select **Free ($0/month)** — includes CDN, SSL, DDoS protection, and DNS management
- Click **Continue**

### 5.3 Review DNS Records
- Cloudflare auto-detects existing DNS records from GoDaddy
- These default records are fine to keep
- Click **Continue to activation**

### 5.4 Note the Cloudflare Nameservers
Cloudflare displays two nameservers you need to set in GoDaddy:
```
chip.ns.cloudflare.com
wren.ns.cloudflare.com
```
> Write these down — you'll enter them in GoDaddy next.

### 5.5 Update Nameservers in GoDaddy
1. Log in to **godaddy.com**
2. Go to **My Products** > find `lebronjamesthegreat.com` > click **DNS**
3. Scroll down to **Nameservers** section
4. Click **Change** (or **Edit**)
5. Select **"I'll use my own nameservers"**
6. Enter the two Cloudflare nameservers:
   - `chip.ns.cloudflare.com`
   - `wren.ns.cloudflare.com`
7. GoDaddy shows a **warning/disclaimer** about changing nameservers — this is a standard warning, click **Continue** / **Save**
8. Confirm the changes

> **Important:** This transfers DNS management from GoDaddy to Cloudflare. Your domain registration stays with GoDaddy — only DNS resolution moves.

### 5.6 Connect Custom Domain to Pages Project
1. Back in Cloudflare, go to **Workers & Pages** > `lebronjamesthegreat` project
2. Go to **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `lebronjamesthegreat.com`
5. Cloudflare will set up a CNAME record pointing to your Pages deployment
6. Click **Activate domain**

---

## Phase 6: DNS Propagation & Verification

### 6.1 Initial Status — Pending
- Cloudflare shows **"Pending nameservers"** — this is normal
- Typical propagation time: 5 minutes to 24 hours (usually under 1 hour)

### 6.2 SSL Handshake Error (Expected During Propagation)
Attempting to visit `https://lebronjamesthegreat.com` initially returned:
```
EPROTO ssl3_read_bytes: ssl/tls alert handshake failure
```
This is expected — Cloudflare's SSL certificate hasn't been provisioned yet because DNS is still propagating.

### 6.3 Verify DNS Propagation
```bash
# Check if domain resolves to Cloudflare IPs
nslookup lebronjamesthegreat.com
# Should return Cloudflare IPs like: 104.21.x.x, 172.67.x.x

# Confirm nameservers are pointing to Cloudflare
nslookup -type=NS lebronjamesthegreat.com
# Should return:
#   chip.ns.cloudflare.com
#   wren.ns.cloudflare.com
```

### 6.4 Results
```
Non-authoritative answer:
Name:    lebronjamesthegreat.com
Addresses:  104.21.54.99
            172.67.168.108

Nameservers:
  chip.ns.cloudflare.com
  wren.ns.cloudflare.com
```
DNS propagation confirmed. SSL certificate auto-provisioned by Cloudflare shortly after.

---

## Phase 7: Auto-Deploy Workflow

Once the Cloudflare Pages project is connected to GitHub, every push auto-deploys:

```bash
# Make changes to index.html
git add index.html
git commit -m "Description of changes"
git push origin master
# Cloudflare detects the push and deploys automatically (< 1 minute)
```

### Deployments Made Post-Launch:
1. **Updated career stats** — Points: 43,127 / Assists: 11,892 / Rebounds: 11,979
2. **Added game schedule** — 9 upcoming Lakers games with links to NBA.com
3. **Added live scoring** — Auto-syncs during game nights via NBA CDN data
4. **Fixed broken gallery images** — Replaced with working Wikimedia URLs (960px)
5. **Added contact form** — Web3Forms integration, site owner email never exposed

---

## Architecture Summary

```
lebronjamesthegreat.com
├── index.html              # Entire site (HTML + CSS + JS in one file)
├── functions/
│   └── api/
│       ├── nba.js          # Cloudflare Pages Function — proxies NBA live data
│       └── contact.js      # Cloudflare Pages Function — contact form handler
├── CLAUDE.md               # Project documentation for Claude Code
└── README.md               # Repository README
```

### Hosting Stack:
| Layer | Service | Cost |
|-------|---------|------|
| Domain registrar | GoDaddy | ~$12/year |
| DNS + CDN + SSL | Cloudflare (Free) | $0 |
| Hosting | Cloudflare Pages (Free) | $0 |
| Contact form | Web3Forms (Free) | $0 |
| Source control | GitHub (Free) | $0 |

### Key URLs:
- **Live site:** https://lebronjamesthegreat.com
- **Cloudflare preview:** https://lebronjamesthegreat.pages.dev
- **GitHub repo:** https://github.com/stackmodus/lebronjamesthegreat
- **Cloudflare dashboard:** https://dash.cloudflare.com

---

## Troubleshooting Reference

### If the site doesn't load on the custom domain:
1. Check nameservers: `nslookup -type=NS lebronjamesthegreat.com`
2. Verify Cloudflare IPs: `nslookup lebronjamesthegreat.com`
3. Check Cloudflare dashboard for SSL/TLS certificate status
4. Wait up to 24 hours for full DNS propagation

### If images break in the gallery:
- Wikimedia Commons can rate-limit thumbnail requests
- Use 960px thumbnail width (not 800px or 600px)
- Verify URLs via Wikipedia API: `https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url&iiurlwidth=960&format=json`

### If Cloudflare Pages Functions don't work:
- Ensure `functions/` directory is at the project root
- Functions map to routes: `functions/api/nba.js` → `/api/nba`
- Check the Cloudflare Pages deployment logs for function compilation errors

### If auto-deploy doesn't trigger:
- Verify the GitHub repo is still connected in Cloudflare Pages settings
- Check that you're pushing to the `master` branch (the production branch)
- Check Cloudflare Pages > Deployments for build status and error logs
