# Ben Hieronta — Premium Finnish Wellness Website

موقع ويب احترافي وعصري لخدمات العافية والتدليك الفنلندي (Ben — Koulutettu Hieroja).

---

## 🚀 التشغيل السريع (Quick Start)

### المتطلبات
- **Node.js** v20+
- **pnpm** (أو **npm**)

### التثبيت
```bash
pnpm install
# أو: npm install
```

### التشغيل في وضع التطوير (Development)
```bash
pnpm dev
# أو: npm run dev
```
الموقع سيعمل مباشرة على: **`http://localhost:5173`**

### بناء المشروع للإنتاج (Production Build)
```bash
pnpm build
# أو: npm run build
```

### فحص الأنواع (Typecheck)
```bash
pnpm run typecheck
```

---

## 📁 هيكل المشروع النظيف (Project Structure)

تم تنظيف هيكل المشروع بالكامل وإزالة كل مخلفات Replit والـ Monorepo المعقدة وحزم الـ API الوهمية، ليصبح مشروع Vite + React قياسياً ومباشراً:

```text
.
├── public/                 # الملفات العامة (favicon, robots.txt)
├── src/
│   ├── components/         # مكونات واجهة المستخدم (UI Components & Radix)
│   ├── hooks/              # الخطافات المخصصة (use-mobile, use-toast)
│   ├── lib/                # دوال مساعدة وأدوات (utils)
│   ├── pages/              # الصفحات (not-found, إلخ)
│   ├── App.tsx             # التطبيق الرئيسي والصفحات والأقسام
│   ├── index.css           # التصميم ونظام الألوان (TailwindCSS v4)
│   └── main.tsx            # نقطة البداية (React Root Entry)
├── components.json         # إعدادات Shadcn UI
├── index.html              # الصفحة الرئيسية
├── package.json            # الحزم والتبعيات المباشرة
├── tsconfig.json           # إعدادات TypeScript
└── vite.config.ts          # إعدادات Vite السريعة
```

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **React 19**
- **Vite 7**
- **TailwindCSS 4**
- **TypeScript 5.7+**
- **Radix UI & Shadcn UI**
- **Lucide Icons**
- **Wouter** (التوجيه السريع والخفيف)
- **TanStack React Query**

---

## 📄 الترخيص
MIT
