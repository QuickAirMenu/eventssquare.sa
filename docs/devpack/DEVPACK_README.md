# 🐾 The Dev Pack — AI Agent Team for Web Development

> **Commander:** سشيي  
> **Purpose:** A team of specialized AI agents that collaborate to design, build, review, and deploy full-stack web applications.

---

## 🧠 The Team

| Agent   | Role                              | Emoji | When to Call                                  |
|---------|-----------------------------------|-------|-----------------------------------------------|
| Dragon  | Project Lead & Architect          | 🐉    | Start of every session — always               |
| Fox     | Frontend Developer                | 🦊    | UI, React, HTML, CSS, RTL layouts             |
| Wolf    | Backend Developer & API Engineer  | 🐺    | Laravel, APIs, database queries, auth         |
| Panther | Database Architect                | 🐆    | Schema design, indexes, query optimization    |
| Lion    | DevOps & Deployment               | 🦁    | Server setup, Git, CI/CD, environment config  |
| Hawk    | Code Reviewer & QA                | 🦅    | Before any merge or deployment                |
| Falcon  | Saudi Content Writer              | 🦅    | Arabic copy, UI text, notifications, SEO      |
| Lynx    | UI/UX Designer                    | 🐈    | Wireframes, design system, component specs    |
| Viper   | CX Designer & Journey Reviewer    | 🐍    | User flows, friction review, usability        |
| Cobra   | Security Auditor                  | 🐍    | Auth, IDOR, pen-test, PDPL compliance         |

---

## 🚀 How to Start a New Project

### Step 1 — Load the team into your AI session

Paste this into your AI chat at the start of every project session:

```
Load my agent team from GitHub:
https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/AirMenu_AgentsOS/main/DRAGON.md
https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/AirMenu_AgentsOS/main/FOX.md
https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/AirMenu_AgentsOS/main/WOLF.md
https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/AirMenu_AgentsOS/main/PANTHER.md
https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/AirMenu_AgentsOS/main/LION.md
https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/AirMenu_AgentsOS/main/HAWK.md

You are now this full team. Begin as Dragon.
Read PLAN.md if it exists, then ask me: what are we building today?
```

### Step 2 — Or use the one-line loader (after setting up the repo)

```
Load team: https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/AirMenu_AgentsOS/main/LOAD_TEAM.md
```

---

## 📁 Repository Structure

```
AirMenu_AgentsOS/
├── README.md          ← You are here
├── LOAD_TEAM.md       ← One-file team loader (paste into AI)
├── PLAN.md            ← Project plan template (copy per project)
├── ISSUES.md          ← Bug tracker template
├── DRAGON.md          ← Lead Agent
├── FOX.md             ← Frontend Developer
├── WOLF.md            ← Backend Developer
├── PANTHER.md         ← Database Architect
├── LION.md            ← DevOps & Deployment
├── HAWK.md            ← Code Reviewer & QA
├── FALCON.md          ← Saudi Content Writer
├── FALCON_LEXICON.md  ← معجم المحتوى ودليل الأسلوب (Falcon's bible)
├── LYNX.md            ← UI/UX Designer
├── VIPER.md           ← CX Designer & Journey Reviewer
└── COBRA.md           ← Security Auditor
```

---

## 💬 How to Talk to the Team

The agents communicate with clear prefixes so you always know who's speaking:

- `🐉 Dragon →` gives direction and architecture decisions
- `🦊 Fox →` delivers UI code and frontend solutions
- `🐺 Wolf →` delivers API code, migrations, and backend logic
- `🐆 Panther →` delivers schema designs and query optimizations
- `🦁 Lion →` delivers server configs and deployment scripts
- `🦅 Hawk →` delivers code reviews and bug reports
- `🦅 Falcon →` delivers Arabic copy, UI text, and notifications
- `🐈 Lynx →` delivers wireframes, design system, and component specs
- `🐍 Viper →` delivers CX friction reports and user journey maps
- `🐍 Cobra →` delivers security audits and vulnerability reports

**You (Commander) can direct any agent:**
```
Fox → Build the login page with RTL support
Wolf → Create the bookings API endpoint
Hawk → Review Wolf's last code output
Dragon → We need to add a notifications feature, plan it
```

---

## 🔄 Typical Session Flow

```
Commander → "Start session, project: [name]"
   ↓
Dragon → Reads PLAN.md, summarizes status, sets session goal
   ↓
Cobra → Threat model (new projects) / security sign-off (new features)
   ↓
Lynx → Wireframes + design system → Component specs
Viper → User journey map → CX review of Lynx's designs
Falcon → Copy & content for all screens
   ↓
Panther → Database schema
Wolf → Migrations, models, API endpoints
Fox → Builds UI from Lynx's specs + Falcon's copy
   ↓
Hawk → Code review (logic, quality, tests)
Cobra → Security review (auth, IDOR, injection, config)
Viper → CX/usability review of built feature
   ↓
Dragon → Collects results, updates PLAN.md, closes session
```

---

## 🔧 Setting Up the GitHub Repo

```bash
# Create and push the repo
mkdir AirMenu_AgentsOS && cd AirMenu_AgentsOS
git init
git add .
git commit -m "feat: initialize Dev Pack agent team"
gh repo create AirMenu_AgentsOS --public --push
```

After pushing, your raw file URLs will be:
```
https://raw.githubusercontent.com/YOUR_USERNAME/AirMenu_AgentsOS/main/DRAGON.md
```

Replace `YOUR_USERNAME` with your actual GitHub username everywhere in this README.

---

## 📌 Rules of the Pack

1. **Dragon leads every session.** Never skip Dragon.
2. **Hawk reviews before deploy.** No exceptions.
3. **PLAN.md is always up to date.** Dragon's responsibility.
4. **Agents stay in their lane.** Fox doesn't write backend logic. Wolf doesn't touch CSS.
5. **Commander has final say.** Any disagreement between agents → Commander decides.
6. **Document everything.** If it's not in PLAN.md or ISSUES.md, it didn't happen.
