# Remarketing Playbook 🎯

**The complete guide to turning anonymous visitors into identified leads and customers**

---

## Overview: The Remarketing Funnel

```
Anonymous Visitor
      ↓
Tracked Behavior (GA4 + Pixel)
      ↓
Lead Capture (Email collected)
      ↓
Identified Lead (Name + Company via Clearbit)
      ↓
Remarketing Campaigns
      ↓
Booking / Conversion
```

---

## Phase 1: Anonymous Tracking (Day 1)

### What Happens
- Visitor lands on your site
- Google Analytics 4 tracks behavior
- Facebook Pixel adds them to audiences
- LinkedIn tracks (if logged in)
- **You don't know who they are yet**

### What You See
**In Google Analytics:**
```
User #12345
- Pages: Home → Voice Agents → Pricing
- Time: 4 min 23 sec
- Location: Liverpool, UK
- Device: iPhone
```

**In Facebook Events Manager:**
- Event: PageView (home)
- Event: ViewContent (voice agents)
- Event: InitiateCheckout (clicked Cal.com)

### Actions to Take

**Week 1:**
1. Let analytics collect data (need 300+ visitors for audience creation)
2. Monitor in GA4 Realtime
3. Check Facebook Test Events

**No remarketing yet - building audience first**

---

## Phase 2: Lead Capture (Day 1-7)

### How It Works

**Automatic Triggers:**
- **Time:** After 30 seconds on site → popup appears
- **Scroll:** After scrolling 50% down page → popup appears
- **Exit Intent:** Mouse moves to close tab → popup appears

**Lead Magnet Offered:**
"Get Your Free AI Automation Guide"

**Information Collected:**
- Name (required)
- Email (required)
- Phone (optional)
- Company (optional)

### What Happens Behind the Scenes

**If visitor is a business (B2B):**
1. Lead submitted
2. Clearbit Reveal checks IP address
3. Identifies company:
   ```
   ABC Construction Ltd
   - Industry: Construction
   - Employees: 50-200
   - Location: Manchester, UK
   ```
4. Stored in `/data/leads.json`
5. (Optional) Webhook to n8n for instant notification

**You now know:**
- Who they are (name, email)
- Where they work (company)
- What they're interested in (lead magnet topic)
- Their journey before converting (from GA4)

### Actions to Take

**Daily:**
1. Check `/analytics/leads` for new leads
2. Download CSV of leads
3. Follow up within 24 hours

**Response Template:**
```
Subject: Your AI Automation Guide + Quick Question

Hi [Name],

Thanks for downloading the AI Automation Guide! I hope you find it useful.

I noticed you work at [Company] - we've helped similar [Industry] companies save 20+ hours/week with custom automation.

Quick question: What's the #1 manual process you'd love to automate?

- Oliver
Cold Lava
```

---

## Phase 3: Remarketing Campaigns (Week 2+)

### Audience Creation

#### Facebook/Meta Audiences

**1. All Website Visitors (Warm Audience)**
- Facebook Events Manager → Audiences → Create Audience
- Website → All visitors in last 180 days
- **Size:** Everyone who visited your site

**Remarketing Ad:**
```
Headline: "Still Thinking About AI Automation?"
Body: "We help UK businesses save 20+ hours/week. Book a free discovery call."
CTA: "Learn More"
```

**2. Service-Specific Visitors**
- Event: ViewContent
- URL contains: "/services/voice-agents"
- Last 90 days

**Remarketing Ad:**
```
Headline: "Ready for AI Voice Agents?"
Body: "See how [Company Name] automated their calls and saved £10k/month."
CTA: "View Case Study"
```

**3. High-Intent Visitors**
- Visited 3+ pages
- Spent 2+ minutes
- Last 30 days

**Remarketing Ad:**
```
Headline: "Let's Talk About Your Automation Needs"
Body: "You've been researching AI automation - let's see if we're a fit. 15-min call, no pressure."
CTA: "Book Call"
```

**4. Booking Abandoners (HOT)**
- Event: InitiateCheckout (clicked Cal.com)
- NOT Event: Lead (didn't complete booking)
- Last 14 days

**Remarketing Ad:**
```
Headline: "Complete Your Booking & Get 10% Off"
Body: "Still interested? Book your discovery call today and get 10% off your first project."
CTA: "Complete Booking"
```

#### LinkedIn Audiences

**1. Website Visitors (B2B)**
- Campaign Manager → Matched Audiences
- Website → All visitors, last 90 days
- **Best for:** Targeting decision-makers

**LinkedIn Ad:**
```
Headline: "Automate Your Business Operations"
Body: "UK businesses trust Cold Lava for bespoke AI automation. No off-the-shelf solutions, no long-term contracts."
CTA: "Book Consultation"
```

**2. Company-Specific (After Clearbit ID)**
- If you identified "ABC Construction Ltd" via Clearbit
- Create LinkedIn audience: "Employees of ABC Construction"
- **Highly targeted!**

**LinkedIn Ad:**
```
Headline: "ABC Construction: Automate Your Workflows"
Body: "We noticed someone from ABC visited our site. Let's discuss how AI can streamline your operations."
CTA: "Schedule Call"
```

#### Google Ads Audiences

**1. Website Visitors (Display Network)**
- Google Ads → Audience Manager
- All visitors, last 540 days (max)

**Display Ad:**
- Show banner ads on millions of websites
- Reminder: "Cold Lava - AI Automation"

**2. Similar Audiences**
- Google creates "lookalike" audience
- Finds people similar to your visitors
- Expand reach beyond remarketing

---

## Phase 4: Email Follow-Up Sequence

### For Leads Who Downloaded Guide

**Email 1 (Immediate):**
```
Subject: Your AI Automation Guide 📊

[Deliver the guide + quick introduction]
```

**Email 2 (Day 3):**
```
Subject: Quick question about [Company]

Hi [Name],

Did you get a chance to read the guide?

I'm curious - what's the biggest time-sink at [Company] right now?

Most of our clients say it's:
- Manual data entry
- Follow-up calls
- Quote generation

What's yours?

- Oliver
```

**Email 3 (Day 7):**
```
Subject: Case Study: [Similar Company] Saved 25 Hours/Week

Hi [Name],

Thought you'd find this interesting...

[Similar company in their industry] was spending 25 hours/week on [process].

We built them a custom automation that now does it in 30 minutes.

Want to see how it works?

[Link to case study]

- Oliver
```

**Email 4 (Day 14):**
```
Subject: Should I close your file?

Hi [Name],

I haven't heard back so I'm guessing now isn't the right time.

Should I:
a) Close your file (no hard feelings)
b) Follow up in 3 months
c) Book a 15-min call to explore fit

Just reply with a, b, or c.

- Oliver
```

---

## Phase 5: Conversion Optimization

### Track What Works

**In Google Analytics:**
1. Go to Reports → Acquisition → User Acquisition
2. Filter by source/medium
3. See which campaigns drive bookings

**Example:**
```
facebook / cpc → 50 visitors → 5 bookings (10% conversion)
linkedin / cpc → 20 visitors → 4 bookings (20% conversion) ← Winner!
google / cpc → 100 visitors → 3 bookings (3% conversion)
```

**Action:** Invest more in LinkedIn, less in Google

### A/B Test Your Ads

**Test 1: Headline**
- A: "AI Automation for UK Businesses"
- B: "Save 20+ Hours/Week with AI"
- **Winner:** B (more specific benefit)

**Test 2: CTA**
- A: "Learn More"
- B: "Book Free Call"
- **Winner:** B (clearer action)

**Test 3: Audience**
- A: All website visitors
- B: High-intent visitors only
- **Winner:** B (better conversion, lower cost)

### Optimize Landing Pages

**Use Microsoft Clarity to see:**
- Where visitors click (heatmaps)
- Where they get stuck (session recordings)
- Where they rage-click (frustration)

**Example Insight:**
```
Clarity shows: 50% of visitors click "Pricing" but page doesn't exist
Action: Create pricing page or add pricing to homepage
Result: 15% increase in bookings
```

---

## Phase 6: Advanced Tactics

### Tactic 1: Retargeting + Lead Magnet Combo

**Step 1:** Run Facebook ad to cold audience
- Offer: "Free AI Automation Guide"
- Goal: Build warm audience

**Step 2:** Remarket to guide downloaders
- Ad: "Ready to implement? Book a call"
- **Much higher conversion than cold→call**

### Tactic 2: Company-Specific Campaigns

**When Clearbit identifies a big company:**
1. Create LinkedIn audience: "Employees of [Company]"
2. Run targeted campaign: "Hey [Company], let's talk automation"
3. Personalized landing page: "Cold Lava x [Company]"

**Conversion rate:** 30%+ (highly relevant)

### Tactic 3: Engagement-Based Remarketing

**Facebook Engagement Audience:**
- People who watched 50%+ of your video
- People who liked/commented on your posts
- People who visited your profile

**These are warm leads - remarket aggressively**

### Tactic 4: Multi-Platform Retargeting

**Surround them everywhere:**
1. Visit your site → Facebook Pixel fires
2. See your ad on Instagram
3. See your ad on Facebook
4. See your ad on LinkedIn
5. See your ad on Google Display Network
6. Get your email

**They can't escape! (But don't be creepy - cap frequency)**

---

## ROI Calculations

### Example Campaign

**Inputs:**
- Website visitors: 1,000/month
- Lead capture rate: 5% = 50 leads/month
- Email follow-up conversion: 10% = 5 bookings/month
- Remarketing audience: 1,000 people
- Remarketing conversion: 2% = 20 bookings/month
- **Total: 25 bookings/month**

**Costs:**
- Ad spend: £500/month
- Time (email follow-ups): 5 hours @ £50/hour = £250
- **Total cost: £750/month**

**Revenue:**
- Average project value: £2,000
- 25 bookings × £2,000 = £50,000/month

**ROI:**
```
Revenue: £50,000
Cost: £750
Profit: £49,250
ROI: 6,566%
```

---

## Common Mistakes to Avoid

### Mistake 1: Not Building Audiences First
❌ Running remarketing ads on Day 1 (no audience yet)
✅ Wait 7-14 days to build 300+ person audience

### Mistake 2: Remarketing Too Soon
❌ Showing booking ads to someone who visited once yesterday
✅ Show value-add content first, booking ads after 3+ visits

### Mistake 3: Same Ad to Everyone
❌ One generic ad to all website visitors
✅ Segment by page visited, time spent, actions taken

### Mistake 4: No Lead Nurture
❌ Capture email, never follow up
✅ 4-email sequence over 14 days

### Mistake 5: Ignoring Clarity Data
❌ Guessing what visitors want
✅ Watch session recordings, see where they get stuck

---

## Weekly Checklist

### Monday
- [ ] Check `/analytics/leads` for new leads
- [ ] Download CSV and add to CRM
- [ ] Follow up with leads from last week

### Tuesday
- [ ] Review GA4 → which pages get most traffic?
- [ ] Review Facebook Events → any new high-intent visitors?
- [ ] Check Clarity → any new session recordings?

### Wednesday
- [ ] Create/update remarketing audiences
- [ ] Launch new remarketing campaigns (if needed)
- [ ] A/B test new ad creative

### Thursday
- [ ] Review campaign performance (CTR, CPC, conversions)
- [ ] Pause low-performing ads
- [ ] Increase budget on winners

### Friday
- [ ] Weekly summary: leads captured, bookings made, ROI
- [ ] Plan next week's campaigns

---

## Tools Summary

| Tool | What It Does | Cost | URL |
|------|--------------|------|-----|
| Google Analytics 4 | Track visitor behavior | Free | analytics.google.com |
| Facebook Pixel | Create remarketing audiences | Free | business.facebook.com/events_manager |
| LinkedIn Insight Tag | B2B remarketing | Free | linkedin.com/campaign-manager |
| Microsoft Clarity | Session recordings, heatmaps | Free | clarity.microsoft.com |
| Clearbit Reveal | Identify companies from IP | 50/mo free | clearbit.com |
| Your Dashboard | View leads, track performance | Free | coldlava.ai/analytics |

---

## Next Steps

### This Week
1. ✅ Lead capture popup is live
2. ✅ Tracking scripts installed
3. ✅ Analytics dashboard accessible
4. ⏳ Wait 7 days to build audience (300+ visitors)

### Week 2
1. Create Facebook remarketing audiences
2. Create LinkedIn remarketing audiences
3. Launch first remarketing campaign (£50/day budget)

### Week 3
1. Review campaign performance
2. Optimize based on data
3. Scale winning campaigns

### Week 4
1. Calculate ROI
2. Document what worked
3. Build lookalike audiences

---

## Support

**Questions?**
- Check `/analytics` dashboard
- Review Google Analytics
- Watch Clarity session recordings

**Need help?**
This playbook gives you everything you need to run sophisticated remarketing campaigns with ZERO monthly software costs.

---

*Remarketing Playbook v1.0 • Cold Lava • A★★ Flagship*
