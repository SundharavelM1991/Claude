# 1core Parent Mobile App — Design Decisions & Requirements

**Product:** 1core  
**Audience:** Parents of children enrolled in child care centers  
**Role:** UI/UX Design Reference Document  
**Status:** In Progress

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Current Features](#2-current-features)
3. [Feature Gaps & Decisions](#3-feature-gaps--decisions)
4. [Navigation Architecture](#4-navigation-architecture)
5. [Dashboard Screen](#5-dashboard-screen)
6. [Login Screen](#6-login-screen)
7. [Activity Feed Screen](#7-activity-feed-screen)
8. [Gallery](#8-gallery)
9. [Design System](#9-design-system)
10. [Performance Optimization](#10-performance-optimization)
11. [Future Requirements](#11-future-requirements)

---

## 1. Product Overview

1core is a mobile app for parents whose children are enrolled in a child care center. The core emotional job of the app is:

> **"Make me feel connected to my child's day without being physically there."**

Target users are millennial and Gen Z parents who have high expectations for modern, premium mobile experiences.

---

## 2. Current Features

| # | Feature | Details |
|---|---|---|
| 1 | Sign In/Out | QR code scan at center |
| 2 | Activity Feed | Nap, diaper, notes, incident, bring-in, medicine, bottle, homework, observation — posted by teachers |
| 3 | Incident Acknowledge | Parents acknowledge pending incidents |
| 4 | Form Management | Forms with status visibility (Pending / Signed / Expiring Soon) |
| 5 | Payment | Mostly auto-pay |
| 6 | Reminders | Bring-in, health checkup, immunization, medicine expiry |
| 7 | In-App Messaging | Direct messaging with teachers, unread badge |
| 8 | Child Profile | Personal info, medication, special diet, allergy, enrollment, contacts, restricted persons |
| 9 | Parent Profile | Personal info management |
| 10 | Contact Management | Authorized pickup persons (within contact management) |
| 11 | Gallery | Photos attached to activity entries |
| 12 | Settings | Notification preferences (granular by activity type), app login preference |
| 13 | Statements | Account statement + year-end tax statement |
| 14 | Notifications | Push notifications with granular type control |
| 15 | Record Absence | Can be recorded in advance |
| 16 | Multi-Child Support | Multiple children per parent account |
| 17 | Time Card | Attendance history inside Child Profile |
| 18 | Multi-Center | Login once, switch centers via header button |
| 19 | Pickup Notification | Parent notified instantly when contact picks up child |

---

## 3. Feature Gaps & Decisions

### 3.1 Confirmed Gap — Gallery Context
**Problem:** Gallery shows photos without activity context (activity type, time, teacher note) even though photos are already linked to activity entries at post time.

**Decision:** Surface existing metadata in the gallery UI:
- Each photo tile shows activity type + timestamp label
- Photo detail view shows: activity type, timestamp, teacher's note, and a "View in Feed" deep link
- Gallery filter tabs (All · Art · Outdoor · Meals · etc.) using existing activity type tags — no extra data needed

### 3.2 Confirmed Gap — Authorized Pickup Clarity
**Resolution:** Authorized pickup is already handled within Contact Management. No change needed.

### 3.3 No Change Needed
- Attendance history → Time Card in Child Profile ✓
- Form status visibility → already implemented ✓
- Notification granularity → already granular by activity type ✓
- Pickup notification → already implemented ✓
- Absence in advance → already supported ✓
- Multi-child → already supported ✓

### 3.4 Future Requirements (Not in Current Scope)
- Center calendar and announcements
- Developmental milestones / progress tracking

---

## 4. Navigation Architecture

### Decision: Bottom Tab Bar + Hamburger Menu for Secondary Items

**Rationale:** Parents open the app 2–3 times daily. Features hidden behind a hamburger-only menu feel one step too far for daily-use actions.

### Bottom Tabs (Always Visible)

| Tab | Icon State |
|---|---|
| Home (Dashboard) | Filled when active |
| Activity Feed | Filled when active |
| Messages | Filled when active + unread badge |
| Gallery | Filled when active |
| Menu | Always outline |

### Header (Persistent)

| Element | Position |
|---|---|
| Menu icon | Left |
| Message icon (with unread badge) | Right |
| QR Scan icon | Right |
| Center Switch button | Right |

**QR Scan stays in header** — it's a contextual physical action at the center door, not a navigation destination.

### Menu (Secondary Navigation)

Accessed via bottom tab or header icon. Contains:
- Child Profile
- Forms
- Payment & Statements
- Reminders
- Record Absence
- Settings
- Parent Profile

---

## 5. Dashboard Screen

### Purpose
> Dashboard = "Things that need my attention"  
> Activity tab = "What's happening with my child"

The dashboard is an **action items summary**, not a content feed.

### Layout (Top to Bottom)

#### Header
Menu icon · [1core logo or center name] · Message (badge) · QR Scan · Center Switch

#### Section 1 — Child Status Card
- Checked in / Checked out + timestamp
- Child name + photo
- **Multi-child:** One compact card per child, stacked or side-by-side
- **Design:** Soft teal gradient background, white text, child circle avatar

#### Section 2 — Incidents
- Pending incidents requiring acknowledgement
- Highest priority after status — safety critical
- Empty: section collapses, not shown

#### Section 3 — Action Items (Side by Side)
Two compact pill cards:
```
[ 📋 3 Forms pending ]   [ 💳 1 Payment due ]
```
- Each taps into its own screen
- Payment expands **inline** (not modal) when something is due — pushes content below down
- Incidents remain above and unaffected

#### Section 4 — Reminders
- **Not a slider/carousel** — stacked list sorted by urgency (days remaining)
- Max 3 visible, "See all" link
- Most critical reminder never hidden behind a swipe

#### Section 5 — Empty / All Caught Up State
When no incidents, no pending forms, no overdue payment, no urgent reminders:
- Show warm "You're all caught up" message with simple illustration
- Activity feed bleeds in below to fill the screen with content
- Confirms nothing was missed — reassures the parent

---

## 6. Login Screen

### Session Behavior
- Quick login required every time the app comes to foreground
- Login once, then switch centers via header — no re-login per center

### Returning User (Default State)
Biometric auto-triggers the moment the screen appears. No button tap required.

```
        [1core logo]
        [Center name]

     Welcome back, [Parent name]

        [  👁 / 👆  ]
     Authenticating...

   ─────────────────────
   Use PIN  ·  Use password
```

- If biometric fails once → auto-fall back to PIN (don't retry biometric twice)
- Center name shown for multi-center context clarity

### Split Intent: Two Entry Points on Login Screen

**Product requirement:** Allow parent to choose between opening the app or going directly to QR scan.

**Decision:** Both options require biometric authentication first. Difference is destination only.

```
        [1core logo]
        Welcome back, [Parent name]

   [  Open App  ]   [  Sign In/Out  ]

        Use PIN  ·  Use password
```

- **Open App** → authenticates → Dashboard
- **Sign In/Out** → authenticates → QR Scanner directly
- Rationale: QR sign-in/out is safety-critical (child custody). Cannot bypass authentication. One biometric gesture = same effort, no security compromise.

### PIN Entry State
```
      Enter your PIN

        ● ● ● ○ ○ ○

    [1] [2] [3]
    [4] [5] [6]
    [7] [8] [9]
    [⌫] [0] [  ]

      Forgot PIN?
```
- Large tap targets (parent has one hand occupied)
- Auto-submit on 6th digit — no confirm button

### Password State
- Standard email + password form
- Show/hide password toggle
- "Forgot password?" link
- Least frequent path — no need to over-design

### First-Time (Invitation) Flow
Separate from login entirely — 3 steps:
1. **Verify** — tap magic link from email/SMS, confirms identity
2. **Secure** — set password + PIN, enable biometric (skippable, nudge strongly)
3. **Done** — lands on dashboard, center already connected via invitation

### Performance: Prefetch During Authentication
Start fetching dashboard API data the moment the login screen appears — before parent authenticates. By the time biometric succeeds and screen transition plays, data is ready.

---

## 7. Activity Feed Screen

### Purpose
The emotional core of the app. Parents feel connected to their child's day here.

### Layout Decisions

**Chronological direction:** Oldest first, newest at bottom. Mirrors how a day unfolds. Parent scrolls down to "arrive" at the current moment.

**Date navigation:** Sticky date pill at top — `← Today →` with arrow navigation. Tapping opens a date picker.

**Filter chips:** Horizontal scrollable row below date:
```
All · Nap · Bottle · Incident · Notes · Medicine · Diaper · Homework · Observation
```

**Multi-child:** Tab switcher (child name + avatar) pinned below header. Never a combined feed.

### Activity Type Visual System

Color-coded left accent strip + activity-specific icon on every card.

| Activity | Icon | Strip Color |
|---|---|---|
| Nap | 🌙 | Soft Blue |
| Diaper | 🍼 | Lavender |
| Bottle | 🍶 | Green |
| Medicine | 💊 | Teal |
| Bring-in | 🎒 | Orange |
| Notes | 📝 | Amber |
| Homework | 📚 | Amber |
| Observation | 👁 | Blue-grey |
| Incident | ⚠️ | Red |

### Feed Card Anatomy

```
[Color strip] [Icon] [Activity type]        [Time]
              [Note text — 2 lines max           ]
              [Photo thumbnail if attached       ]
              [Teacher name — small, muted       ]
```

### Incident Card (Special Treatment)
- Full-width red left border (4px vs 2px for others)
- Slightly elevated shadow
- Subtle red-tinted card background
- Inline **Acknowledge** button — parent never navigates away to acknowledge
- Visually impossible to miss while scrolling

### Empty State
Morning empty state feels anticipatory, not broken:
> "Emma's day is just getting started."  
> + subtle illustration

### Real-Time Updates
- Pull-to-refresh
- When push notification brings parent into feed → auto-scroll to new entry + brief highlight animation

---

## 8. Gallery

### Current State
Photos are already attached to activity entries at post time. The context is lost only in the gallery view.

### Fix — Surface Existing Metadata

**Grid view:** Each photo tile shows label at bottom:
```
[ photo ]
Outdoor Play · Jun 15, 2:30 PM
```

**Photo detail view:**
- Activity type + timestamp
- Teacher's note from that entry
- "View in Feed" deep link to original activity entry

**Filter tabs (no extra data needed — reuses activity type):**
```
All · Art · Outdoor · Meals · Milestones
```

---

## 9. Design System

### Design Philosophy
> Warm but premium, not clinical or childish.  
> Feels like it was built for me, not for a school admin.

Reference aesthetic: Airbnb, Linear, Notion, Stripe — but with warmth.

---

### Color Palette

| Role | Name | Hex |
|---|---|---|
| Primary | Warm Teal | `#0D9488` |
| Primary Dark | Deep Teal | `#0F766E` |
| Accent | Soft Coral | `#FB7185` |
| Background | Warm Off-white | `#F8F7F5` |
| Surface | Pure White | `#FFFFFF` |
| Text Primary | Near Black | `#111827` |
| Text Secondary | Warm Grey | `#6B7280` |
| Success | Soft Green | `#10B981` |
| Warning | Amber | `#F59E0B` |
| Danger | Red | `#EF4444` |

**Key gradient (hero cards only):**
```
linear-gradient(135deg, #0D9488 0%, #0F766E 100%)
```

---

### Typography

**Font Family:** `Plus Jakarta Sans` (preferred) or `Inter`

| Style | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| Display | 28–32px | 700 Bold | 1.2× | Welcome, hero text |
| H1 | 22px | 600 SemiBold | 1.2× | Screen titles |
| H2 | 18px | 600 SemiBold | 1.3× | Section headers |
| Body | 16px | 400 Regular | 1.5× | Content |
| Body Strong | 16px | 500 Medium | 1.5× | Labels, emphasis |
| Caption | 13px | 400 Regular | 1.4× | Timestamps, metadata |

**Rules:**
- Never more than 3 font sizes on one screen
- Timestamps and teacher names always Caption + text-secondary

---

### Spacing (8pt Grid)

| Token | Value | Use |
|---|---|---|
| xs | 4px | Icon gaps |
| sm | 8px | Inner element spacing |
| md | 16px | Card padding, section gaps |
| lg | 24px | Between major sections |
| xl | 32px | Screen-level spacing |

- Screen horizontal padding: **20px**
- Minimum gap between cards: **12px**
- Bottom tab bar respects safe area insets

---

### Card Design

**Spec:**
- Border radius: `16px`
- Shadow: `0px 1px 3px rgba(0,0,0,0.06), 0px 4px 12px rgba(0,0,0,0.04)`
- Background: `#FFFFFF`
- Inner padding: `16px` or `20px`
- No internal divider lines — use spacing instead
- No hard borders — elevation and background color create separation

---

### Buttons

| Type | Height | Radius | Use |
|---|---|---|---|
| Primary | 48px | 24px (pill) | Main actions |
| Secondary | 48px | 12px | Secondary actions |
| Destructive | 48px | 24px | Delete, remove |
| Text/Link | auto | — | Tertiary, inline |

Minimum tap target: **44×44px**

---

### Icon System

**Library:** Phosphor Icons (Duotone) or Lucide  
**Size:** 24px standard, 20px compact contexts  
**Style:** Consistent stroke weight, rounded caps  
**State:** Active = filled, Inactive = outline (bottom tabs)  
**Rule:** Never mix icon styles

---

### Web Patterns → Mobile Native (Replace These)

| Web Pattern | Mobile Replacement |
|---|---|
| Dropdown select | Bottom sheet picker |
| Center-screen modal dialog | Bottom sheet (slides up from bottom) |
| Data table | Card list with avatar + metadata |
| Web accordion | Expandable card with spring animation |
| Browser-default form inputs | Floating label inputs, 48px height |
| Small text link buttons | Pill buttons, 48px height |
| Horizontal scroll table | Swipeable native cards |
| Web pagination | Infinite scroll or "Load more" button |

---

### Key "Wow" Moments

| Moment | Design |
|---|---|
| Child Status Card | Teal gradient, child photo circle, white text — first emotional touchpoint |
| Activity Feed | Color-coded cards, not a uniform list — feels like a story |
| Login Screen | Full-screen, clean, biometric pulse animation — premium and focused |
| Incident Card | Red border, elevated shadow, coral tint — impossible to miss |
| All Caught Up State | Warm illustration, intentional message — positive and reassuring |
| Photo Detail | Activity context + deep link — photos tell a story |

---

## 10. Performance Optimization

### Problem
Heavy dashboard with multiple API calls causes slow load after login. Feels broken.

### Solution: Prefetch + Skeleton Screens + Priority Loading

**Strategy 1 — Prefetch During Authentication:**
Start all dashboard API calls the moment the login screen appears (before auth completes). By the time biometric/PIN succeeds and the transition animation plays, data is already loaded or loading.

```
App opens
  → Login screen shows
  → Dashboard API calls fire in background
  → Parent authenticates (0.5–1 second)
  → Dashboard renders with data already ready
```

**Strategy 2 — Skeleton Screens:**
Never show a blank screen or spinner. Show shimmer placeholders in the exact layout of each widget immediately on navigation.

**Strategy 3 — Priority Loading Order:**

| Priority | Section | Reason |
|---|---|---|
| 1st | Child status card | Smallest payload, most critical |
| 2nd | Incidents | Safety — never waits |
| 3rd | Forms + Payment | Small data, action items |
| 4th | Reminders | Slightly heavier |
| Last | Activity feed | Acceptable 1–2 second delay |

**Strategy 4 — Single Dashboard API Endpoint:**
Replace multiple widget-level API calls with one consolidated endpoint returning all dashboard data. Cuts network round trips from 5+ to 1. Biggest backend win.

**Combined result:**
```
Login screen → prefetch fires
Auth completes → skeleton dashboard appears instantly
~0.3s → child status + incidents fill in
~0.8s → everything loaded
Parent never sees a loading state
```

---

## 11. Future Requirements

| Feature | Notes |
|---|---|
| Center calendar & announcements | Separate "Announcements" feed from personal messages + monthly calendar view |
| Developmental milestones | Observation timeline — teachers tag observations by type (social, motor, language), parent sees growth trends |

---

*Document created from 1core UX design session — June 2026*
