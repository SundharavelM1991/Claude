# 1Core Class — iPad UI/UX Revamp Summary

## Table of Contents

- [1. App Overview](#1-app-overview)
- [2. Screen Analysis](#2-screen-analysis)
- [3. JTBD — Classroom Teacher](#3-jtbd--classroom-teacher)
- [4. Device Strategy](#4-device-strategy)
- [5. UI Design Decisions](#5-ui-design-decisions)
- [6. Navigation Structure](#6-navigation-structure)

---

## 1. App Overview

| Detail | Value |
|---|---|
| **App Name** | 1Core Class (Mobile) |
| **Version Analyzed** | 1.6.0 |
| **Platform** | Currently Android (mobile-first) |
| **Test Account** | Sandbox Class |
| **Rooms Observed** | Green Room, Purple Room, Red Room |

### What Is 1Core Class?

1Core Class is a comprehensive childcare/daycare center management app. It serves staff, admins, and connects with parents to manage day-to-day classroom operations.

### Core Modules Identified

| Module | Description |
|---|---|
| **Attendance** | Check In / Check Out children and staff with PIN-based verification |
| **Classroom Management** | Switch between rooms (Green, Purple, Red Room); monitor staff-to-child ratios |
| **Activity Logging** | Log 12 daily event types — Food, Diapers, Nap, Medicine, Incident, Homework, etc. |
| **Messaging** | Per-child message threads linked to parents/guardians; filterable by Child, Parent, Staff |
| **Health Screening** | Record health-related observations per child |
| **Food Plan** | Manage and track meal plans |
| **Lesson Plan** | Plan and log learning activities |
| **Gallery** | Photo/media sharing (likely with parents) |
| **Activities & Pending Activities** | Track scheduled and incomplete activities |
| **Communication** | Broader communication tools (expandable menu) |

### User Roles

| Role | What They Do |
|---|---|
| **Staff / Teacher** | Check in/out, log child activities, track attendance, message parents |
| **Admin** | Monitor room ratios, manage classrooms, view schedules |
| **Parents** | Receive messages, stay updated on their child's daily activities |

---

## 2. Screen Analysis

### Screen 1 — Main Dashboard (Green Room)

- Displays **10 children** in the Green Room with their photos, names, and ages
- Shows **3 staff members** (Christopher Hayes, John William, Steve) — none checked in yet
- **Center Ratio**: 1:10 | **Date**: Jun 14, 2026
- Attendance tabs: Scheduled (0), Checked In (0), Absence (0)
- One child (**Molly Day**) has a **Birthday** highlight
- Bottom bar actions: Check In, Check Out, Move, Activity
- Children listed with ages: Beth C. Toombs (4y 4m), Lilia J. Brann (3y 4m), Luke Fletcher (12y 9m), Molly Day (3 Years), Sean child (10y 2m), Sheryl L. Watson (9 Years)

### Screen 2 — Side Navigation Menu (Sandbox Class)

- Left drawer menu for the app under account "Sandbox Class"
- Profile avatar "SC" in orange circle
- Modules: Home, Messages, Communication, Health Screening, Gallery, Food Plan, Lesson Plan, Activities, Pending Activities, 1Core Attend
- **App Version**: 1.6.0

### Screen 3 — Switch Classroom

- Classroom switcher modal overlay triggered from the main dashboard
- Currently in **Green Room**, with options to switch to:
  - **Purple Room (PR)**
  - **Red Room (RR)**
- Shows "Signed In to Center" indicator
- Allows staff to manage multiple classrooms from a single app session

### Screen 4 — Messages (Green Room)

- Messaging module filtered by **Child | Parent | Staff** tabs
- Recent message threads per child, linked to parent/guardian names:
  - Lilia J. Brann → Amin Luis, Arras Caver (06/11/2026)
  - Beth C. Toombs → Amin Luis, Arras Caver (02/16/2026)
  - Tyler (Multi Ledger) → Millie Mclean (02/12/2026)
  - Tyler (Multi Ledger) → Lisa Cueva (02/12/2026)
  - William (Multi Ledger) → Kemp Osborn (02/09/2026)
  - Luke Fletcher → Jason Fletcher, Kelly Wesa (11/24/2025)
  - Zoe Rowley → Douglas Mcpherson (11/17/2025)
- Search bar and compose button (teal FAB)
- **Multi Ledger** tag indicates children tied to multiple billing/family accounts

### Screen 5 — Staff Check-In Modal

- Popup modal for checking in **Christopher Hayes**
- Displays: staff photo, name, check-in time (12:01 AM) with dropdown, "Enter Code" PIN field
- **Check In** button to confirm
- Provides secure, time-stamped staff attendance record

### Screen 6 — "What to Record?" Activity Modal

- Daily activity recording panel with **12 event types**:

| Category | Items |
|---|---|
| Daily Care | Food, Diapers, Bottles, Nap |
| Health | Health Screening, Medicine, Incident |
| Learning | Homework, Notes, Name to Face |
| Attendance | Bring In, Absence |

---

## 3. JTBD — Classroom Teacher

### Core Job Statement

> "When I am managing my classroom during the school/care day, I want to efficiently track, record, and communicate everything happening with each child, so I can ensure their safety, meet compliance requirements, and keep parents informed — without paperwork slowing me down."

### Main Jobs (Functional)

#### 3.1 Attendance Management

| Element | Detail |
|---|---|
| **Job** | Track who is present, absent, or scheduled each day |
| **When** | At the start of each shift / when a child arrives or leaves |
| **I want to** | Quickly check in/out children and staff with minimal steps |
| **So I can** | Maintain accurate headcounts and meet safety ratios (e.g. 1:10) |
| **Success** | All children and staff statuses updated in real time with timestamps |

#### 3.2 Daily Activity Logging

| Element | Detail |
|---|---|
| **Job** | Record moment-by-moment care events for each child |
| **When** | Throughout the day as events happen (meals, naps, diaper changes, incidents) |
| **I want to** | Log food intake, naps, diapers, bottles, medicine, incidents quickly |
| **So I can** | Maintain a complete daily record per child and flag anything unusual |
| **Success** | All 12 activity types logged per child without delay or missed entries |

#### 3.3 Health & Safety Monitoring

| Element | Detail |
|---|---|
| **Job** | Monitor and record each child's health status |
| **When** | At arrival (health screening) or when a health event occurs |
| **I want to** | Log health screenings, medicine given, and incidents as they happen |
| **So I can** | Protect child wellbeing and stay compliant with care regulations |
| **Success** | Health records are timestamped, complete, and accessible per child |

#### 3.4 Parent Communication

| Element | Detail |
|---|---|
| **Job** | Stay connected with parents about their child's day |
| **When** | When parents have questions or when notable events happen |
| **I want to** | Send and receive messages tied to specific children |
| **So I can** | Build trust with families and keep them informed without phone calls |
| **Success** | Messages sent and received quickly, organized by child and contact type |

#### 3.5 Classroom & Ratio Management

| Element | Detail |
|---|---|
| **Job** | Ensure the classroom is always staffed within required ratios |
| **When** | When staff arrive/leave or children are moved between rooms |
| **I want to** | See live staff-to-child ratios and move children between rooms easily |
| **So I can** | Stay compliant and avoid being understaffed |
| **Success** | Ratio is always visible, and room switches are done in a few taps |

#### 3.6 Lesson & Food Planning

| Element | Detail |
|---|---|
| **Job** | Follow structured daily plans for meals and learning |
| **When** | Before and during the school/care day |
| **I want to** | Access lesson plans and food plans from within the same app |
| **So I can** | Deliver consistent, planned experiences for children without switching tools |
| **Success** | Plans are visible and easy to reference during the day |

### Emotional Jobs

| Job | Description |
|---|---|
| **Feel confident** | I want to feel I haven't missed anything important for any child |
| **Feel in control** | I want to manage a full classroom without feeling overwhelmed |
| **Feel trusted** | I want parents to feel their child is well cared for and informed |
| **Feel protected** | I want proper records so I am covered if an incident is ever questioned |

### Social Jobs

| Job | Description |
|---|---|
| **Be seen as professional** | I want my records and communication to reflect a high standard of care |
| **Be seen as responsive** | I want parents to see replies and updates quickly |
| **Collaborate with my team** | I want to coordinate with co-teachers and share room responsibilities |

### Key Struggles / Pain Points Observed

| Pain | Observed Signal |
|---|---|
| Too many manual steps to check in staff | PIN code + time selection modal required per staff member |
| Managing multiple rooms is complex | Need to manually switch between Green / Purple / Red Room |
| Tracking many children at once is hard | 10 children per room with individual records to maintain |
| Communication is fragmented | Separate threads per child linked to multiple parent contacts |
| Children with special flags need attention | Birthday, health icons, and multi-ledger tags need to be noticed quickly |

### Product Opportunities

| Priority | Opportunity |
|---|---|
| High | Streamline staff check-in (reduce steps, support batch check-in) |
| High | Bulk or quick-log activities for multiple children at once |
| Medium | Smart alerts for ratio breaches or missing activity logs |
| Medium | Unified parent communication timeline per child |
| Low | Dashboard summary view of the full day's completion status per child |

---

## 4. Device Strategy

### Primary Device: iPad

Based on client interviews and field observation, the **primary device used by classroom teachers is iPad**.

#### Why iPad Fits the Teacher's Job

| Reason | Detail |
|---|---|
| **Larger screen** | Teacher can see all children in the room at a glance |
| **Mounted or carried** | iPad on a stand at the classroom entrance for check-in, or carried for logging |
| **Faster data entry** | Bigger touch targets = fewer tap errors when logging activities |
| **Richer communication** | More comfortable for reading and writing parent messages |
| **Multi-tasking** | Can view attendance AND message a parent simultaneously |

#### Current Gap

The current app is built **mobile-first for Android phones** — it is **not optimized for iPad**. This is the key UX gap to address.

| Current App (Mobile) | Should Be (iPad-first) |
|---|---|
| Narrow single-column cards | Wider multi-column layouts |
| Small tap targets | Larger, more spacious touch targets |
| Bottom thumb-zone bar | Flexible navigation placement |
| Compact modal popups | Expanded panels / split views |
| Scrolling to find children | More children visible at once on screen |

---

## 5. UI Design Decisions

### 5.1 Visual Direction

**Full visual refresh** — Hybrid feel blending three qualities:

| Layer | Approach |
|---|---|
| **Professional** | Clean grid layouts, consistent spacing, structured data tables |
| **Warm** | Rounded corners, soft shadows, child photos prominent |
| **Modern** | Minimal chrome, bold typography, generous white space |

### 5.2 Color Palette

Evolved from the current teal — deeper, richer, with warm accents:

| Role | Color | Hex | Usage |
|---|---|---|---|
| **Primary** | Deep Refined Teal | `#0D7A75` | Sidebar, primary buttons, active states |
| **Accent** | Warm Coral | `#F4845F` | Highlights, birthday tags, alerts, CTAs |
| **Accent Alt** | Amber | `#FFAA5A` | Secondary highlights, badges |
| **Background** | Warm Off-White | `#F8F9FA` | Page backgrounds |
| **Card** | Pure White | `#FFFFFF` | Cards, panels (with soft shadow) |
| **Text Primary** | Deep Navy | `#1A1A2E` | Headings, body text |
| **Surface Tint** | Light Teal Tint | `#E8F4F8` | Secondary backgrounds, inactive states |

### 5.3 Typography

| Property | Value |
|---|---|
| **Font Family** | DM Sans |
| **Source** | Google Fonts (free, open source) |
| **Cross-platform** | Works on iOS, Android, and web |

| Usage | Weight |
|---|---|
| Page Headings | Bold 700 |
| Section Labels | SemiBold 600 |
| Body / Names | Regular 400 |
| Captions / Tags | Medium 500 |
| Buttons | SemiBold 600 |

### 5.4 Component Library

| Decision | Choice |
|---|---|
| **Base** | Apple Human Interface Guidelines (HIG) for iPad |
| **Approach** | Starting fresh — new component library |
| **Components** | Built from Apple HIG principles — native iPad patterns |

---

## 6. Navigation Structure

### Pattern: Sidebar + Split View

The native iPad 3-column layout — used by Apple Mail, Notes, and most premium iPad apps.

```
┌─────────────┬──────────────────┬──────────────────────┐
│             │                  │                      │
│  SIDEBAR    │   LIST PANEL     │   DETAIL PANEL       │
│  (Nav)      │   (Children/     │   (Child Profile /   │
│             │    Rooms etc)    │    Activity Log)     │
│             │                  │                      │
│  Left       │   Center         │   Right              │
│  ~240px     │   ~320px         │   Remaining space    │
│             │                  │                      │
└─────────────┴──────────────────┴──────────────────────┘
```

### Sidebar Structure

```
┌─────────────────────┐
│  [Logo] 1Core Class │
│                     │
│  Sandbox Class      │
│  Green Room    ▾    │  ← Room switcher dropdown
│                     │
│  ─── MAIN ───       │
│  Home               │
│  Attendance         │
│  Messages           │
│  Communication      │
│                     │
│  ─── CLASSROOM ───  │
│  Food Plan          │
│  Lesson Plan        │
│  Activities         │
│  Pending            │
│                     │
│  ─── RECORDS ───    │
│  Health             │
│  Gallery            │
│                     │
└─────────────────────┘
```

### Split View Behavior Per Module

| Module | Left Panel | Right Panel |
|---|---|---|
| **Attendance** | Children list (grid/list) | Selected child check-in detail |
| **Messages** | Message threads list | Open conversation |
| **Activities** | Children list | Activity log form |
| **Food Plan** | Menu/schedule | Per-child food record |
| **Lesson Plan** | Plan list | Plan detail/editor |
| **Health Screening** | Children list | Health form per child |

### Home / Dashboard — Full-Width Overview

```
┌─────────────┬────────────────────────────────────────┐
│             │                                        │
│  SIDEBAR    │   TODAY'S OVERVIEW                     │
│             │                                        │
│             │   Room Stats Bar                       │
│             │   Staff 0/3 | Children 10 | Ratio 1:10 │
│             │                                        │
│             │   ┌──────┬──────┬──────┬──────┐       │
│             │   │Child │Child │Child │Child │       │
│             │   │Card  │Card  │Card  │Card  │       │
│             │   ├──────┼──────┼──────┼──────┤       │
│             │   │Child │Child │Child │Child │       │
│             │   │Card  │Card  │Card  │Card  │       │
│             │   └──────┴──────┴──────┴──────┘       │
│             │                                        │
│             │   [Check In] [Check Out] [Move] [Log]  │
│             │                                        │
└─────────────┴────────────────────────────────────────┘
```

### Room Switcher — Sidebar Dropdown

Replaces the current modal popup — always accessible, never interrupts the main view.

```
┌─────────────────────┐
│  Green Room    ▾    │
│  ┌───────────────┐  │
│  │ ● Green Room  │  │
│  │   Purple Room │  │
│  │   Red Room    │  │
│  └───────────────┘  │
└─────────────────────┘
```

### Bottom Action Bar — Replaced

| Current (Mobile) | iPad Replacement |
|---|---|
| Bottom bar always visible | Contextual toolbar inside each panel |
| Small icon + label | Full labeled buttons with icons |
| 4 fixed actions | Actions change based on selected child/context |

---

## Decisions Locked In

| Decision | Choice |
|---|---|
| **Primary Device** | iPad |
| **Visual Direction** | Full refresh — Professional + Warm + Modern |
| **Color Palette** | Evolved deep teal + warm coral accent + soft neutrals |
| **Font** | DM Sans |
| **Component Library** | Apple HIG for iPad — starting fresh |
| **Primary Navigation** | Persistent left sidebar |
| **Content Layout** | Split view (list + detail) |
| **Room Switching** | Sidebar dropdown |
| **Module Grouping** | Main / Classroom / Records |
| **Home Screen** | Full-width dashboard overview |
| **Action Buttons** | Contextual, inside panels — not fixed bottom bar |

---

## Next Steps

- [ ] Screen-by-screen detailed redesign starting with Home/Dashboard
- [ ] Define full color system (hover, disabled, error, success states)
- [ ] Component library specification
- [ ] Wireframes / Mockups per module
- [ ] Prototype and user testing with teachers on iPad
