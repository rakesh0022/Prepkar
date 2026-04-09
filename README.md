# PrepKar - AI Mock Interview Practice

Free AI-powered mock interview app for Indian job seekers. Practice for Bank PO, IT fresher, MBA admission, and government job interviews with instant AI feedback.

## Quick Start (Get Running in 5 Minutes)

### Step 1: Get your OpenAI API key
1. Go to https://platform.openai.com/signup
2. Sign up (you get $5 free credit — enough for ~1,000 interviews)
3. Go to https://platform.openai.com/api-keys
4. Click "Create new secret key" and copy it

### Step 2: Configure the project
```bash
# Clone this repo (or download it)
git clone https://github.com/YOUR_USERNAME/prepkar.git
cd prepkar

# Install dependencies
npm install

# Add your OpenAI API key
# Open .env.local and replace 'sk-your-key-here' with your actual key
```

### Step 3: Run locally
```bash
npm run dev
```
Open http://localhost:3000 — your app is running!

### Step 4: Deploy to Vercel (FREE)
1. Push your code to GitHub
2. Go to https://vercel.com and sign in with GitHub
3. Click "Import Project" → select your repo
4. Add environment variable: OPENAI_API_KEY = your key
5. Click Deploy

Your app will be live at https://prepkar.vercel.app (or your custom domain)

### Step 5: Connect your domain
1. In Vercel dashboard → Settings → Domains
2. Add prepkar.co.in
3. Update DNS at GoDaddy: Add CNAME record pointing to cname.vercel-dns.com
4. Wait 5 minutes — your site is live at prepkar.co.in!

## Tech Stack
- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **AI:** OpenAI GPT-4o-mini (cheapest, ~₹0.50 per interview session)
- **Hosting:** Vercel (free tier)
- **Database:** None needed for MVP (add Supabase later for user accounts)

## Cost
- Domain: ₹99/year
- OpenAI API: ~₹0.50 per interview session ($5 free credit on signup)
- Hosting: Free
- Total to launch: ₹99

## Project Structure
```
prepkar/
├── src/app/
│   ├── api/interview/route.ts  ← Backend API (calls OpenAI)
│   ├── layout.tsx              ← HTML layout, fonts, meta tags
│   ├── page.tsx                ← Main app (all screens)
│   └── globals.css             ← Styles
├── public/
│   └── manifest.json           ← PWA config
├── .env.local                  ← Your API key (never commit this!)
└── package.json
```

## Roadmap
- [x] Core mock interview with 4 categories
- [x] Scorecard with detailed feedback
- [ ] Hindi/Hinglish mode
- [ ] Voice input (Web Speech API)
- [ ] Share scorecard as image
- [ ] Interview history (Supabase)
- [ ] Google AdSense integration
- [ ] PWA icons and offline support
- [ ] Play Store app (TWA wrapper)
