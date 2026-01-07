# Flagship Tracking Setup Guide

**Last Updated:** 2026-01-07
**Version:** 1.0 (A★★ Flagship)

---

## What You Now Have

Your website is now a **flagship analytics & remarketing powerhouse** with:

- ✅ Google Analytics 4 (GA4) - `G-N5QPDBSBJP`
- ✅ Facebook/Meta Pixel - `1680728342604919`
- ✅ Google Tag Manager (optional container)
- ✅ LinkedIn Insight Tag (ready to add)
- ✅ Google Ads remarketing (ready to add)
- ✅ Microsoft Clarity (ready to add - FREE)
- ✅ Authenticated analytics dashboard (`/analytics`)
- ✅ GDPR-compliant cookie consent
- ✅ Automatic event tracking (clicks, scrolls, time on page)
- ✅ Conversion tracking (bookings, leads, contacts)

---

## Quick Start (5 Minutes)

### 1. Access Your Analytics Dashboard

**URL:** `https://coldlava.ai/analytics`
**Password:** `coldlava2026` (change in `.env.local`)

The dashboard shows:
- Links to all your tracking platforms
- Web Vitals monitoring status
- Quick access to GA4, Facebook, LinkedIn

### 2. View Real-Time Data

**Google Analytics 4:**
1. Go to https://analytics.google.com/analytics
2. Select your property
3. Click "Reports" → "Realtime"
4. See visitors RIGHT NOW

**Facebook Events:**
1. Go to https://business.facebook.com/events_manager
2. Find Pixel `1680728342604919`
3. Click "Test Events" to see live tracking

### 3. Verify Tracking Works

1. Open your website in a new private browsing window
2. Accept cookies
3. Click around (navigation, CTA buttons, Cal.com link)
4. Check Google Analytics Realtime (events should appear within seconds)
5. Check Facebook Events Manager → Test Events

---

## Complete Setup Instructions

### LinkedIn Insight Tag (5 minutes)

**Why:** B2B remarketing, target decision-makers, company insights

**Steps:**
1. Go to https://www.linkedin.com/campaign-manager
2. Click "Account Assets" → "Insight Tag"
3. Copy your Partner ID (format: numeric, e.g., `123456`)
4. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_LINKEDIN_PARTNER_ID=123456
   ```
5. Redeploy: `npm run build && vercel --prod`
6. Verify: LinkedIn will show "Tag Active" in Campaign Manager within 24 hours

**Result:** You can now create LinkedIn remarketing audiences and track conversions

---

### Google Ads Remarketing Tag (5 minutes)

**Why:** Remarket on Google Display Network, YouTube, Gmail

**Steps:**
1. Go to https://ads.google.com/
2. Click "Tools" → "Audience Manager"
3. Click "Audience sources" → "Google Ads tag"
4. Copy your Conversion ID (format: `AW-XXXXXXXXXX`)
5. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
   ```
6. Redeploy: `npm run build && vercel --prod`
7. Verify: Google Ads will show "Tag Active" within 24 hours

**Result:** Build remarketing lists for Google Display ads

---

### Microsoft Clarity (2 minutes) - FREE & Highly Recommended

**Why:** Session recordings, heatmaps, rage clicks, scroll depth - completely free

**Steps:**
1. Go to https://clarity.microsoft.com/
2. Sign in with Microsoft account
3. Click "New Project" → Add website
4. Copy your Project ID (format: alphanumeric, e.g., `abc123def`)
5. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_CLARITY_ID=abc123def
   NEXT_PUBLIC_ENABLE_CLARITY=true
   ```
6. Redeploy: `npm run build && vercel --prod`

**Result:**
- Watch **recordings** of actual users navigating your site
- See **heatmaps** of where people click
- Identify **rage clicks** (frustrated users)
- 100% free, unlimited recordings

**Game-changer:** You'll see exactly where users get stuck or confused

---

### Google Analytics 4 API (Optional - Advanced)

**Why:** Show real-time visitor count in `/analytics` dashboard

**Steps:**
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable "Google Analytics Data API"
4. Create Service Account:
   - IAM & Admin → Service Accounts → Create
   - Name: `analytics-dashboard`
   - Grant role: `Viewer`
5. Create JSON key:
   - Click service account → Keys → Add Key → Create new key → JSON
   - Download `service-account-key.json`
6. Add service account email to GA4:
   - GA4 Admin → Property Access Management
   - Add service account email as "Viewer"
7. Get Property ID:
   - GA4 Admin → Property Settings
   - Copy Property ID (numeric, e.g., `123456789`)
8. Update `.env.local`:
   ```bash
   GA4_PROPERTY_ID=123456789
   GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
   ```
9. Place `service-account-key.json` in project root (it's in `.gitignore`)

**Result:** Real-time visitor count in `/analytics` dashboard

**Note:** This is optional - you can still see everything in Google Analytics directly

---

## What's Being Tracked Automatically

### Page Views
- Every page visit
- Time on page
- Scroll depth (25%, 50%, 75%, 100%)
- Source/medium (where visitors came from)

### Engagement Events
- Button clicks (CTAs)
- Link clicks (internal & external)
- Outbound link clicks (tracked separately)
- Time milestones (30s, 60s, 120s, 5min)
- ISS Tracker interactions

### Conversion Events
- **Booking Initiated:** User clicked Cal.com link
- **Lead Generated:** Contact form submission
- **Phone Click:** Clicked phone number
- **Email Click:** Clicked email address

### Custom Events
- Service page views (for service-specific remarketing)
- High-intent signals (3+ pages, 2+ minutes)
- Video plays (if applicable)
- File downloads

---

## How to Use Tracking in Your Code

### Track a CTA Click

```tsx
import { TrackingLink } from '@/components/tracking'

<TrackingLink
  href="/services"
  trackingType="cta"
  trackingLabel="View Services"
  trackingLocation="Hero Section"
  className="your-button-classes"
>
  Explore Services
</TrackingLink>
```

### Track a Booking Link

```tsx
import { TrackingLink } from '@/components/tracking'

<TrackingLink
  href="https://cal.com/coldlava/discovery-call"
  trackingType="booking"
  target="_blank"
  className="your-button-classes"
>
  Book a Call
</TrackingLink>
```

### Track a Custom Event

```tsx
import { pushToDataLayer } from '@/lib/tracking'

const handleCustomAction = () => {
  pushToDataLayer({
    event: 'custom_event_name',
    event_category: 'category',
    event_label: 'label',
    custom_property: 'value'
  })
}
```

### Track Service Page View

```tsx
import { trackServiceView } from '@/lib/tracking'

useEffect(() => {
  trackServiceView('AI Voice Agents')
}, [])
```

---

## Viewing Your Data

### Google Analytics 4

**Real-Time:**
- Reports → Realtime → See live visitors

**Behavior:**
- Reports → Engagement → Pages and screens
- Reports → Engagement → Events

**Conversions:**
- Reports → Engagement → Conversions
- Configure conversion events: Admin → Events → Mark as conversion

**Audiences:**
- Explore → Create audience
- Use for remarketing across Google properties

### Facebook Events Manager

**Test Events:**
- Events Manager → Pixel → Test Events
- See live tracking as you click around your site

**Event History:**
- Events Manager → Pixel → Overview
- See all events from last 7 days

**Custom Audiences:**
- Events Manager → Audiences → Create Audience
- "Website" → Select events (ViewContent, InitiateCheckout, Lead)

### LinkedIn Campaign Manager

**Tag Status:**
- Campaign Manager → Account Assets → Insight Tag
- Verify "Tag Active"

**Conversions:**
- Campaign Manager → Conversion Tracking
- Create conversion: "Book a Call" using `generate_lead` event

**Audiences:**
- Campaign Manager → Matched Audiences
- Create audience from website visitors

---

## Troubleshooting

### Tracking Not Working?

**1. Check Environment Variables**
```bash
# In .env.local
NEXT_PUBLIC_GA4_ID=G-N5QPDBSBJP  # ✅ Set
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1680728342604919  # ✅ Set
NEXT_PUBLIC_ENABLE_TRACKING=true  # ✅ Must be true
```

**2. Check Browser Console**
- Open DevTools (F12)
- Go to Console tab
- You should see: `📊 GTM Data Layer:` messages (in development)
- No errors about missing scripts

**3. Check Network Tab**
- DevTools → Network tab
- Filter: `gtm` or `fbevents` or `analytics`
- You should see requests being made

**4. Check Cookie Consent**
- Open site in private browsing
- Accept cookies when banner appears
- Tracking only works after consent

**5. Check GA4 Real-Time**
- Google Analytics → Realtime
- Keep refreshing - events appear within 10-30 seconds

### Facebook Pixel Not Firing?

**Check Test Events:**
1. Go to Events Manager
2. Click your pixel
3. Click "Test Events"
4. Enter your current URL
5. Browse your site
6. Events should appear immediately

**Common Issues:**
- Cookie consent not accepted
- Ad blocker enabled
- Private browsing (pixels may be blocked)

### LinkedIn Tag Not Active?

- Takes up to 24 hours to show as "Active"
- Must have 300+ visits for retargeting to work
- Check Campaign Manager → Insight Tag for status

---

## Privacy & Compliance

### GDPR Compliance ✅

- Cookie consent banner (required)
- Granular consent (analytics vs marketing)
- Tracking disabled until consent given
- Easy opt-out mechanism
- Data retention limits (configurable in GA4)

### Cookie Policy

Your cookie banner links to `/cookies` (create this page with):
- What cookies you use
- Why you use them
- How to opt out
- How to delete cookies

**Template:** See `COOKIE_POLICY_TEMPLATE.md` (create this)

### Data Retention

**Google Analytics:**
- Default: 14 months
- Configurable: Admin → Data Settings → Data Retention

**Facebook Pixel:**
- Default: 180 days
- Configurable: Events Manager → Settings

**LinkedIn:**
- Default: 180 days
- Not configurable

---

## White-Label Deployment for Clients

### For Greenstar Solar, Detail Dynamics, etc.

**Steps:**
1. Duplicate this project
2. Update `.env.local` with client's IDs:
   ```bash
   NEXT_PUBLIC_GA4_ID=G-CLIENT-GA4-ID
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=client-pixel-id
   NEXT_PUBLIC_LINKEDIN_PARTNER_ID=client-linkedin-id
   ```
3. Update branding in `layout.tsx` and `navigation`
4. Deploy to Vercel
5. Point client's domain

**Time:** 15 minutes per client
**Value:** £500-1500 setup fee + £50-150/month management

---

## Cost Breakdown

| Service | Monthly Cost | What You Get |
|---------|--------------|--------------|
| Google Analytics 4 | £0 | Unlimited events, 14-month retention |
| Facebook Pixel | £0 | Unlimited events, conversion tracking |
| LinkedIn Insight Tag | £0 | Company insights, B2B remarketing |
| Google Ads Tag | £0 | Remarketing lists, conversion tracking |
| Microsoft Clarity | £0 | Unlimited session recordings, heatmaps |
| Vercel Hosting | £0 (Hobby) | Unlimited bandwidth |
| **Total** | **£0/month** | **Enterprise tracking stack** |

**To spend money on (optional):**
- Ad spend (Facebook, LinkedIn, Google - your budget)
- Hotjar Pro (£31/month - alternative to Clarity with more features)
- GA4 360 (£150k/year - only for massive enterprise)

---

## Next Steps

### Week 1: Verify Everything Works
- [ ] Access `/analytics` dashboard
- [ ] Check GA4 Realtime (see yourself browsing)
- [ ] Check Facebook Test Events
- [ ] Add LinkedIn Partner ID
- [ ] Add Google Ads ID
- [ ] Sign up for Microsoft Clarity (FREE)

### Week 2: Create Audiences
- [ ] Facebook: All Website Visitors (last 180 days)
- [ ] Facebook: Service Page Visitors (by service)
- [ ] Facebook: High-Intent Visitors (3+ pages, 2+ min)
- [ ] Facebook: Booking Abandoners (clicked Cal.com but didn't book)
- [ ] LinkedIn: Website Visitors (last 90 days)
- [ ] LinkedIn: Service-Specific Audiences
- [ ] Google Ads: Similar Audiences

### Week 3: Launch Remarketing Campaigns
- [ ] Facebook: "Still interested?" campaign to all visitors
- [ ] Facebook: Service-specific ads to service page visitors
- [ ] LinkedIn: B2B decision-maker campaigns
- [ ] Google Display: Brand awareness to all visitors

### Week 4: Analyze & Optimize
- [ ] Check conversion rates by source
- [ ] Identify top-performing pages
- [ ] Review session recordings (Clarity)
- [ ] Optimize high-drop-off pages
- [ ] A/B test CTAs based on heatmaps

---

## Support Resources

### Official Documentation
- Google Analytics: https://support.google.com/analytics
- Facebook Pixel: https://www.facebook.com/business/help/742478679120153
- LinkedIn Insight Tag: https://business.linkedin.com/marketing-solutions/insight-tag
- Microsoft Clarity: https://docs.microsoft.com/clarity

### Quick Links
- GA4: https://analytics.google.com/analytics
- Facebook Events: https://business.facebook.com/events_manager
- LinkedIn Campaigns: https://www.linkedin.com/campaignmanager
- Google Ads: https://ads.google.com/
- Clarity: https://clarity.microsoft.com/

### Your Dashboard
- Analytics: https://coldlava.ai/analytics
- Password: `coldlava2026`

---

## Changelog

**v1.0 (2026-01-07) - Flagship Launch**
- ✅ Google Analytics 4 integration
- ✅ Facebook Pixel advanced events
- ✅ LinkedIn Insight Tag ready
- ✅ Google Ads remarketing ready
- ✅ Authenticated analytics dashboard
- ✅ GDPR-compliant cookie consent
- ✅ Automatic event tracking
- ✅ Conversion tracking (bookings, leads)
- ✅ White-label ready architecture

---

*Flagship Analytics System • Cold Lava • A★★ Grade*
