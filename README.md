# Bin Aouf — Premium Himalayan Salt Exporter
### Full-Stack MERN Web Application

A premium B2B/B2C export platform for Himalayan salt products, built with React, Node.js, Express, and MongoDB.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or MongoDB Atlas)
- **npm** v9+

---

## 📦 Project Structure

```
Roman_project/
├── backend/         → Express API, MongoDB models, email service
└── frontend/        → React (Vite) SPA — all 5 pages + admin panel
```

---

## ⚙️ Backend Setup

```bash
cd backend

# 1. Copy and fill env variables
cp .env.example .env

# 2. Edit .env → add MONGODB_URI, JWT_SECRET, SMTP details

# 3. Start dev server (requires MongoDB running)
npm run dev

# 4. Seed database with 42 products, categories, testimonials
npm run seed
```

**Backend runs on:** `http://localhost:5000`

---

## 🖥️ Frontend Setup

```bash
cd frontend

# Install dependencies (already done if you ran setup)
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`
The Vite proxy automatically forwards `/api/*` to the backend.

---

## 🔐 Admin Panel

Visit: `http://localhost:3000/admin`

**Default credentials** (after running the seeder):
- Username: `admin`
- Password: `admin123`

> ⚠️ **Change the password immediately after first login** via the MongoDB shell or by updating the AdminUser record.

---

## 📧 Email Notifications Setup (Nodemailer)

To receive email alerts when a quote is submitted:

1. Create a **Gmail App Password**: Google Account → Security → 2-Step Verification → App Passwords
2. In `backend/.env`, set:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-digit-app-password
EMAIL_TO=binaoufchemicals.pk@gmail.com
```

---

## 🌐 Pages

| Route | Page |
|-------|------|
| `/` | Home (Hero, Categories, Why Us, Testimonials) |
| `/products` | Full 7-tab product catalog (42 products) |
| `/about` | Company story, certifications, mine sources |
| `/process` | 5-step production process + quality assurance |
| `/contact` | Contact cards, quote form, FAQ accordion |
| `/admin` | Admin dashboard (protected) |
| `/admin/login` | Admin login page |

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, React Router DOM 7 |
| Styling | Vanilla CSS (custom design system) |
| HTTP Client | Axios |
| Backend | Node.js, Express.js 5 |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT + bcryptjs |
| Image CDN | Cloudinary (multer-storage-cloudinary) |
| Email | Nodemailer + Gmail SMTP |
| Dev Tools | nodemon, Vite HMR |

---

## 📋 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | Public | Admin login |
| POST | `/api/auth/register-first` | Public | Create first admin |
| GET | `/api/auth/me` | Private | Get admin profile |
| GET | `/api/categories` | Public | Get all categories |
| POST | `/api/categories` | Private | Create category |
| PUT | `/api/categories/:id` | Private | Update category |
| DELETE | `/api/categories/:id` | Private | Delete category |
| GET | `/api/products` | Public | Get all products |
| POST | `/api/products` | Private | Create product |
| PUT | `/api/products/:id` | Private | Update product |
| DELETE | `/api/products/:id` | Private | Delete product |
| POST | `/api/quotes` | Public | Submit quote request |
| GET | `/api/quotes` | Private | Get all quotes |
| PUT | `/api/quotes/:id/status` | Private | Update quote status |
| DELETE | `/api/quotes/:id` | Private | Delete quote |
| GET | `/api/quotes/analytics` | Private | Dashboard stats |
| GET | `/api/testimonials` | Public | Get testimonials |
| POST | `/api/testimonials` | Private | Add testimonial |
| PUT | `/api/testimonials/:id` | Private | Update testimonial |
| DELETE | `/api/testimonials/:id` | Private | Delete testimonial |
| GET | `/api/settings` | Public | Get site settings |
| POST | `/api/settings` | Private | Update one setting |
| POST | `/api/settings/bulk` | Private | Bulk update settings |
| POST | `/api/upload` | Private | Upload image to Cloudinary |

---

## 📸 Media Needed (from client)

- 42 product photos (600×400px minimum)
- Company logo (SVG preferred)
- Social media URLs (LinkedIn, Facebook, Instagram, YouTube)
- Domain name choice

---

**Bin Aouf Chemicals** | Khushab, Punjab, Pakistan
binaoufchemicals.pk@gmail.com | +92 311 028 2668
## 📈 Monitoring
- **API health**: `GET https://roman-project-backend.vercel.app/api/health` returns `{ "status":"ok", "timestamp":<ms> }`.
- Use this endpoint in uptime monitors (UptimeRobot, StatusCake, etc.).
