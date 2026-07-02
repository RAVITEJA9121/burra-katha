# Burra Katha — Media Agency Website

This is the official static website for **Burra Katha**, a storytelling-driven personal branding media agency rooted in the ancient Telugu tradition of Burra Katha.

## 🌐 Hosted on GitHub Pages

The website is live at: `https://<your-github-username>.github.io/<repo-name>/`

---

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | Main website HTML |
| `style.css` | All styles & design system |
| `script.js` | Interactive behaviors |
| `BK C.png` | Circular logo (used in nav, footer, about) |
| `Burra katha Final Logo.png` | Main logo (used in hero section) |

---

## ✏️ Placeholders to Fill In

Search for `PLACEHOLDER` in `index.html` to find all spots you need to update:

1. **Phone Number** — Replace `+91 XXXXXXXXXX` with actual phone
2. **Email** — Replace `hello@burrakatha.com` with actual email
3. **Location** — Add your city/state
4. **Working Hours** — Adjust if needed
5. **Instagram** — Add profile URL to `social-instagram` and `footer-ig` links
6. **YouTube** — Add channel URL to `social-youtube` and `footer-yt` links
7. **WhatsApp** — Change `social-whatsapp` href to `https://wa.me/91XXXXXXXXXX`

---

## 🚀 Deploying to GitHub Pages

1. Create a GitHub repository (e.g., `burrakatha-website`)
2. Upload all files to the repository
3. Go to **Settings → Pages**
4. Set **Source** to `Deploy from a branch` → `main` branch → `/` (root)
5. Click **Save** — your site will be live in ~2 minutes!

---

## 📬 Form Integration (Optional)

The contact form currently shows a success toast on submit. To receive real emails:

### Option A: Formspree (Easiest)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form ID
3. In `index.html`, add `action="https://formspree.io/f/YOUR_FORM_ID"` to the `<form>` tag
4. Remove the `novalidate` attribute and the `e.preventDefault()` line in `script.js`

### Option B: WhatsApp Direct
Change the submit button to a WhatsApp link:
```
https://wa.me/91XXXXXXXXXX?text=Hi%20Burra%20Katha%2C%20I%20am%20interested%20in%20your%20services!
```

---

Made with ❤️ | బుర్ర కథ — మీ కథ, మా గొంతు.
