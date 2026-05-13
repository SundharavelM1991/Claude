# Childcare Parent App — Project Memory

## Product Context
- **Product**: Mobile app for parents enrolled in childcare centers
- **Market**: US & Canada
- **Type**: Legacy product revamp (15-year-old product) — usability improvement + modern UI
- **Platform**: React Native / Expo (iOS & Android)
- **Prototype**: HTML/CSS at `/prototype/dashboard.html`

---

## Design System

### Primary Color — Teal Blue
| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#0A7EA4` | Buttons, links, active states |
| `--color-primary-dark` | `#065E7C` | Header gradient end, pressed states |
| `--color-primary-darker` | `#044A61` | Status bar, header gradient start |
| `--color-primary-light` | `#38A8C8` | Hover, lighter accents |
| `--color-primary-surface` | `#E6F4F9` | Background tints, icon backgrounds |

### Semantic Colors
| Role | Color | Hex | Usage |
|---|---|---|---|
| Success / Check-in | Emerald | `#10B981` | Checked-in status ring, success states |
| Warning / Reminder | Amber | `#F59E0B` | Reminder section, bring-in alerts |
| Danger / Incident | Rose Red | `#EF4444` | Incident cards, urgent alerts |
| Info / Forms | Indigo | `#6366F1` | Forms, messages, informational |

### Neutral Palette
| Token | Hex | Usage |
|---|---|---|
| Background | `#F8FAFC` | App background (Slate 50) |
| Surface | `#FFFFFF` | Cards, sheets |
| Surface Subtle | `#F1F5F9` | Section backgrounds, disabled |
| Text Primary | `#0F172A` | Headings, names (Slate 900) |
| Text Secondary | `#475569` | Descriptions (Slate 600) |
| Text Tertiary | `#94A3B8` | Timestamps, placeholders (Slate 400) |
| Border | `#E2E8F0` | Card borders (Slate 200) |

### Activity Feed Type Colors
| Activity | Icon Color | Background |
|---|---|---|
| Notes | `#6366F1` | `#EEF2FF` |
| Food / Meal | `#F59E0B` | `#FFFBEB` |
| Diaper | `#14B8A6` | `#F0FDFA` |
| Nap | `#8B5CF6` | `#F5F3FF` |
| Incident | `#EF4444` | `#FEF2F2` |
| Homework | `#3B82F6` | `#EFF6FF` |
| Health Screening | `#10B981` | `#ECFDF5` |
| Photo / Activity | `#EC4899` | `#FDF2F8` |
| Medicine | `#F97316` | `#FFF7ED` |
| Absence | `#94A3B8` | `#F8FAFC` |
| Bottle | `#06B6D4` | `#ECFEFF` |

---

### Typography — Plus Jakarta Sans
- **Source**: Google Fonts
- **Rationale**: Warm humanist curves, modern, excellent mobile readability, variable font

| Scale | Size | Weight | Usage |
|---|---|---|---|
| Display | 22px | 700 | Greeting name |
| H1 | 20px | 700 | Page titles |
| H2 | 18px | 600 | Section headers |
| H3 | 16px | 600 | Card titles |
| Body | 15px | 400 | Primary content |
| Body SM | 14px | 400 | Secondary content, descriptions |
| Caption | 12px | 400 | Timestamps, meta info |
| Label | 11px | 600 | Tags, badges (uppercase) |
| Button | 15px | 600 | All buttons |

---

### Spacing (4px base grid)
`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`

### Border Radius
| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 8px | Small chips, icons |
| `--radius-md` | 12px | Icon containers |
| `--radius-lg` | 16px | Cards (standard) |
| `--radius-xl` | 20px | Cards (large), action buttons |
| `--radius-2xl` | 24px | Pills, tags |
| `--radius-full` | 9999px | Avatar rings, badge pills |

### Shadows (soft diffused, 3 levels)
```
xs  : 0 1px 2px rgba(15,23,42,0.04)
sm  : 0 1px 4px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)
md  : 0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04)
lg  : 0 8px 24px rgba(15,23,42,0.10), 0 4px 8px rgba(15,23,42,0.05)
primary: 0 8px 24px rgba(10,126,164,0.28)   ← CTA buttons
card   : 0 2px 12px rgba(15,23,42,0.07)     ← default cards
```

---

## Dashboard Structure (Parent-First)

Sections in order, all conditional except 1 & 2:

| # | Section | Visibility |
|---|---|---|
| 1 | My Children (photo, name, classroom, teacher, check-in status + time) | Always |
| 2 | Quick Actions (Scan QR, Mark Absence) | Always |
| 3 | Incident to Acknowledge | Only when pending |
| 4 | Forms to Complete | Only when pending |
| 5 | Reminders (bring-in, immunization, health screening) | Only when pending |
| 6 | Message Nudge | Only when unread messages |
| 7 | Activity Feed (Notes, Food, Diaper, Nap, Incident, Homework, Health, Photo, Medicine, Absence, Bottle) | Always — infinite scroll, 10 at a time |

### Design Decisions
- **Payment removed from dashboard** — accessible via billing section in nav. Reduces anxiety/debt-collection feel.
- **Forms section added** — action-required items same as incidents, conditional.
- **Message nudge added** — surfaces unread teacher messages without full messaging section.
- **Child-first, not operation-first** — children's status is the hero of the dashboard.

### Multi-Child Behavior
- Horizontal scroll cards for children section
- Activity feed filtered by All / Child Name pill tabs
- Each child card shows individual check-in status and time

---

## Key UX Principles Applied
- **Thumb zone design** — critical actions in bottom 60% of screen
- **Minimum tap target** — 48×48px for all interactive elements
- **Color never sole indicator** — always paired with icon or text (WCAG AA)
- **Conditional sections** — hide when empty, never show empty states for alert sections
- **Status ring** — animated green ring on child avatar = checked in; gray = not checked in
- **Left accent bar** on alert cards = severity at-a-glance (red/amber/indigo/teal)

---

## File Structure
```
/prototype
  design-system.css   ← all CSS tokens, utilities, base styles
  dashboard.html      ← full dashboard prototype

/src/theme
  index.ts            ← React Native theme (to be updated from design system)
```
