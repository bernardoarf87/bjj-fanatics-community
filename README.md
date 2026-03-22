# BJJ Fanatics Community Platform

> A custom-built community platform for BJJ Fanatics — inspired by Skool, built from scratch.

---

## 🔗 Live Links

| Page | URL |
|------|-----|
| **Home (Discovery)** | https://bernardoarf87.github.io/bjj-fanatics-community/ |
| **Community (Bernardo)** | https://bernardoarf87.github.io/bjj-fanatics-community/community.html |
| **About Page** | https://bernardoarf87.github.io/bjj-fanatics-community/about.html |
| **GitHub Repo** | https://github.com/bernardoarf87/bjj-fanatics-community |

## 🔒 Access Code

The site is password-protected for preview sharing.

- **Access Code:** `vrmy33hx`
- To change it: update the hash in `auth-gate.js` (run `echo -n "newpassword" | shasum -a 256` to get the new hash)

## 🚀 Deployment

- **Hosted on:** GitHub Pages (free)
- **Auto-deploy:** GitHub Actions — every push to `main` triggers automatic deployment
- **Deploy time:** ~30 seconds after push

### How to deploy changes:
```bash
git add -A
git commit -m "your message"
git push origin main
```
Changes go live automatically at the URL above.

## 📁 Project Structure

```
├── index.html          # Home / Discovery page (browse communities)
├── community.html      # Bernardo Faria's community page (feed, courses, calendar, etc.)
├── about.html          # Community about/details page
├── styles.css          # Main community styles
├── discover.css        # Discovery page styles
├── about.css           # About page styles
├── app.js              # Community page logic (tabs, events, calendar, RSVP, etc.)
├── discover.js         # Discovery page logic (search, filters, community cards)
├── about.js            # About page logic (join flow, stats)
├── auth-gate.js        # Password protection gate (SHA-256 hashed)
├── assets/             # Images (avatars, banners, logos, thumbnails)
└── .github/workflows/
    └── deploy.yml      # GitHub Actions auto-deploy workflow
```

## 🧭 User Flow

1. 🔒 **Login gate** → enter access code
2. 🏠 **Discovery page** → browse all instructor communities
3. 📄 **About page** → see community details, instructor info
4. 🥋 **Join** → enter community (feed, classroom, calendar, members, leaderboard)

## ✨ Features Built

- **Community Feed** — posts, likes, comments, categories
- **Classroom** — course cards with progress bars
- **Calendar / Live Events** — event cards, RSVP, filters, live banner, past recordings
- **Members** — searchable member grid
- **Leaderboard** — gamified level system (White Belt → Grand Master)
- **Discovery Page** — browse 9 instructor communities with search & category filters
- **About Pages** — detailed community info with join flow
- **Auth Gate** — SHA-256 hashed password protection

## 🔮 Future Phases

- **Backend:** Node.js + PostgreSQL on Railway (user auth, real database)
- **Live Video:** Integration with Daily.co or similar (real video streaming)
- **Payments:** Stripe integration for paid memberships
- **Notifications:** Real-time push notifications
- **Mobile App:** React Native wrapper
