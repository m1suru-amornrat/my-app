# Next.js + Tailwind CSS: คู่มือเรียนจากโปรเจกต์ `my-app`

โปรเจกต์นี้ใช้สำหรับเรียนรู้การสร้างเว็บด้วย Next.js, React, TypeScript และ Tailwind CSS โดยเริ่มจากโครงสร้างหน้าเว็บ แล้วค่อยต่อยอดไปสู่การโหลดข้อมูล ฟอร์ม API และการตรวจสอบชนิดข้อมูล

## เวอร์ชันที่ใช้ในโปรเจกต์

ตรวจสอบเมื่อวันที่ **6 สิงหาคม 2026**

| เทคโนโลยี | เวอร์ชัน |
|---|---:|
| Next.js | `16.3.0` |
| React / React DOM | `19.2.8` |
| Tailwind CSS | `4.3.3` |
| Node.js | `20.9` ขึ้นไป |
| TypeScript | `5.x` |

Next.js 16 ใช้ **App Router** เป็นแนวทางหลัก และเปลี่ยนชื่อ Convention จาก `middleware.ts` เป็น `proxy.ts` ดังนั้นบทเรียนนี้จะใช้ `proxy.ts` เมื่อถึงหัวข้อดังกล่าว

ตรวจสอบเวอร์ชันในเครื่อง:

```bash
node --version
npm list next react react-dom tailwindcss
```

> เวอร์ชันของแพ็กเกจอาจเปลี่ยนในอนาคต ก่อนเริ่มโปรเจกต์ใหม่ควรตรวจสอบเอกสารทางการอีกครั้ง

## เตรียมความพร้อมก่อนเรียน

ควรมีพื้นฐานต่อไปนี้:

- HTML และ CSS พื้นฐาน
- JavaScript: Function, Arrow Function, Callback Function, Object, Array, Destructuring และ `.map()`
- คำสั่ง Terminal พื้นฐาน เช่น `cd`, `npm install` และ `npm run dev`
- ความเข้าใจเบื้องต้นเรื่อง Git จะช่วยให้ย้อนดูการเปลี่ยนแปลงได้ง่าย

## 1. เริ่มต้นโปรเจกต์

ถ้าสร้างโปรเจกต์ใหม่ ให้รันคำสั่งจากโฟลเดอร์แม่:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

ระหว่างคำสั่งสร้างโปรเจกต์ ให้เลือกค่าที่เหมาะกับคอร์สนี้:

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No เพื่อให้เห็น `app/` ชัดเจน
- App Router: Yes
- Import alias: `@/*`

เปิดเว็บที่ [http://localhost:3000](http://localhost:3000)

สำหรับโปรเจกต์นี้ติดตั้ง dependencies ไว้แล้ว ใช้คำสั่ง:

```bash
npm install
npm run dev
```

คำสั่งที่ใช้บ่อย:

```bash
npm run dev      # เปิดโหมดพัฒนา
npm run lint     # ตรวจโค้ดด้วย ESLint
npm run build    # สร้าง production build
npm run start    # รัน production build
```

## 2. รู้จักโครงสร้างโปรเจกต์

```text
my-app/
├─ app/
│  ├─ layout.tsx       # Layout หลักของทุกหน้า
│  ├─ page.tsx         # หน้าแรก: /
│  ├─ globals.css      # CSS ที่ใช้ทั่วทั้งแอป
│  └─ favicon.ico
├─ public/             # ไฟล์ static เช่น รูปภาพและไอคอน
├─ next.config.ts      # การตั้งค่า Next.js
├─ postcss.config.mjs  # เชื่อม Tailwind CSS v4 กับ PostCSS
├─ package.json        # scripts และ dependencies
└─ tsconfig.json       # การตั้งค่า TypeScript
```

แนวคิดสำคัญของ App Router คือ **โฟลเดอร์ใน `app/` เป็น route segment และ `page.tsx` เป็นหน้าที่เปิดให้เข้าถึงผ่าน URL**

## 3. Routing ด้วยโฟลเดอร์

โครงสร้างต่อไปนี้จะสร้าง URL ตามคอมเมนต์:

```text
app/
├─ page.tsx                 # /
├─ about/
│  └─ page.tsx              # /about
├─ info/
│  ├─ page.tsx              # /info
│  └─ [id]/
│     └─ page.tsx           # /info/123
├─ (auth)/                  # Route Group ไม่ปรากฏใน URL
│  ├─ login/page.tsx         # /login
│  └─ register/page.tsx      # /register
└─ _components/             # Private Folder ไม่กลายเป็น route
```

สร้างหน้าใหม่ เช่น `app/about/page.tsx`:

```tsx
export default function AboutPage() {
  return <h1>เกี่ยวกับเรา</h1>;
}
```

กฎที่ควรจำ:

- ทุก `page.tsx` ต้องมี `export default` เป็น Component
- ชื่อโฟลเดอร์ปกติจะกลายเป็น URL segment
- `[id]` คือ Dynamic Segment
- `(auth)` คือ Route Group และจะไม่ปรากฏใน URL
- โฟลเดอร์ที่ขึ้นต้นด้วย `_` ใช้เก็บไฟล์ภายในที่ไม่ต้องการให้เป็น route

## 4. Layout และ Metadata

`app/layout.tsx` เป็น Layout หลักที่ครอบทุกหน้า เหมาะสำหรับ `<html>`, `<body>`, ฟอนต์ และส่วนที่ใช้ร่วมกัน

กำหนด Metadata แบบ Static ได้ดังนี้:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roitai Camping",
  description: "Camping in Thailand.",
  keywords: ["Camping", "Thailand", "Roitai"],
};
```

Metadata ช่วยให้ชื่อหน้าและคำอธิบายถูกส่งต่อไปยัง Browser และ Search Engine อย่างเป็นระบบ

## 5. Server Components และ Client Components

ใน App Router Component เป็น **Server Component โดยค่าเริ่มต้น**

Server Component เหมาะกับ:

- ดึงข้อมูลจากฐานข้อมูลหรือ API ฝั่งเซิร์ฟเวอร์
- ลด JavaScript ที่ส่งไปยัง Browser
- ซ่อน logic ที่ไม่ควรเปิดเผยฝั่ง Client

ถ้าต้องใช้ State, Effect, Event Handler หรือ Browser API ให้ประกาศเป็น Client Component ด้วย `'use client'` ที่บรรทัดแรก:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((current) => current + 1)}>
      จำนวน: {count}
    </button>
  );
}
```

หลักคิดคือให้ Server Component เป็นค่าเริ่มต้น และใช้ Client Component เฉพาะส่วนที่ต้องโต้ตอบกับผู้ใช้

## 6. Dynamic Route และ `params`

สร้างไฟล์ `app/info/[id]/page.tsx`:

```tsx
type InfoPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InfoPage({ params }: InfoPageProps) {
  const { id } = await params;

  return <h1>ข้อมูลหมายเลข {id}</h1>;
}
```

ใน Next.js 16 ค่า `params` เป็น Promise จึงต้องใช้ `async` และ `await` ในตัวอย่าง Server Component

## 7. การดึงข้อมูล

Server Component สามารถเรียก API ได้โดยตรง:

```tsx
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default async function TodosPage() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5",
  );

  if (!response.ok) {
    throw new Error("ไม่สามารถโหลดข้อมูลได้");
  }

  const todos: Todo[] = await response.json();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### Loading และ Error UI

สร้าง `loading.tsx` ใน route เดียวกันเพื่อแสดงระหว่างโหลดข้อมูล:

```tsx
export default function Loading() {
  return <p>กำลังโหลดข้อมูล...</p>;
}
```

สร้าง `error.tsx` สำหรับแสดงข้อผิดพลาด โดยไฟล์นี้ต้องเป็น Client Component:

```tsx
"use client";

export default function ErrorPage({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div>
      <p>เกิดข้อผิดพลาด</p>
      <button onClick={() => reset()}>ลองใหม่</button>
    </div>
  );
}
```

## 8. รูปภาพด้วย `next/image`

รูปในโฟลเดอร์ `public` อ้างอิงจาก root URL ได้ เช่น `public/camp.jpg` ใช้เป็น `src="/camp.jpg"`

```tsx
import Image from "next/image";

export default function CampImage() {
  return (
    <Image
      src="/camp.jpg"
      alt="ลานกางเต็นท์ท่ามกลางธรรมชาติ"
      width={800}
      height={500}
    />
  );
}
```

ถ้าใช้รูปจาก Remote Host ต้องอนุญาต Domain ใน `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

หลังแก้ `next.config.ts` ให้หยุดและเปิด Development Server ใหม่

## 9. Tailwind CSS v4

โปรเจกต์นี้ใช้ Tailwind CSS v4 ซึ่งนำเข้าใน `app/globals.css` ด้วย:

```css
@import "tailwindcss";
```

ตัวอย่างการเขียน Utility Class:

```tsx
export default function WelcomeCard() {
  return (
    <section className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
      <h1 className="text-2xl font-bold">ยินดีต้อนรับ</h1>
      <p className="mt-2 text-slate-300">เริ่มเรียน Next.js กัน</p>
    </section>
  );
}
```

ใน JSX ต้องใช้ `className` แทน `class`

| ความต้องการ | Utility ตัวอย่าง |
|---|---|
| จัดวางแบบ Flex | `flex items-center justify-between` |
| ระยะห่าง | `p-6`, `mt-4`, `gap-4` |
| สีพื้นหลัง | `bg-blue-600` |
| สีข้อความ | `text-slate-700` |
| มุมโค้ง | `rounded-xl` |
| Responsive | `grid-cols-1 md:grid-cols-3` |

## 10. Server Actions และฟอร์ม

Server Action ใช้สำหรับการเปลี่ยนแปลงข้อมูล เช่น สร้าง แก้ไข หรือลบข้อมูล ตัวอย่าง Action ที่ถูกต้องควรแยกไว้ใน `app/actions.ts`:

```tsx
"use server";

export async function createCamp(formData: FormData) {
  const title = formData.get("title");

  if (typeof title !== "string" || title.trim() === "") {
    return { message: "กรุณากรอกชื่อแคมป์" };
  }

  // บันทึกลงฐานข้อมูลตรงนี้
  // revalidatePath("/camp");
  return { message: "บันทึกสำเร็จ" };
}
```

เรียกใช้กับ Form ได้:

```tsx
import { createCamp } from "@/app/actions";

export default function CampForm() {
  return (
    <form action={createCamp} className="space-y-4">
      <input name="title" placeholder="ชื่อแคมป์" />
      <button type="submit">บันทึก</button>
    </form>
  );
}
```

ก่อนบันทึกข้อมูลจริงต้องตรวจสอบสิทธิ์ของผู้ใช้และ Validate ข้อมูลฝั่ง Server เสมอ

## 11. `useActionState` และสถานะของฟอร์ม

เมื่อฟอร์มต้องแสดงข้อความตอบกลับจาก Action ให้ใช้ `useActionState` ใน Client Component:

```tsx
"use client";

import { useActionState } from "react";
import { createCamp } from "@/app/actions";

const initialState = { message: "" };

export default function CampForm() {
  const [state, formAction, isPending] = useActionState(
    createCamp,
    initialState,
  );

  return (
    <form action={formAction}>
      <input name="title" placeholder="ชื่อแคมป์" />
      <button disabled={isPending} type="submit">
        {isPending ? "กำลังบันทึก..." : "บันทึก"}
      </button>
      <p aria-live="polite">{state.message}</p>
    </form>
  );
}
```

ถ้าใช้รูปแบบนี้ Action จะรับค่า `previousState` เป็นอาร์กิวเมนต์แรก:

```tsx
"use server";

export async function createCamp(
  previousState: { message: string },
  formData: FormData,
) {
  // ตรวจสอบ formData แล้วคืน state ใหม่
  return { message: "บันทึกสำเร็จ" };
}
```

## 12. Route Handler สำหรับ API

ใน App Router ให้สร้าง `app/api/camp/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const camps = [
    { id: 1, title: "Route 3060" },
    { id: 2, title: "Korat" },
  ];

  const result = id
    ? camps.filter((camp) => String(camp.id) === id)
    : camps;

  return NextResponse.json({ data: result });
}
```

ทดสอบได้ที่:

```text
http://localhost:3000/api/camp
http://localhost:3000/api/camp?id=1
```

Route Handler รองรับ `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` และ `OPTIONS`

## 13. Proxy ใน Next.js 16

ตั้งแต่ Next.js 16 ชื่อ `middleware.ts` ถูกเปลี่ยนเป็น `proxy.ts` เพื่อสะท้อนหน้าที่ที่ทำงานก่อน Request ดำเนินการต่อ

สร้างไฟล์ `proxy.ts` ที่ root ของโปรเจกต์:

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("เข้า Proxy:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/about/:path*", "/counter/:path*"],
};
```

Proxy เหมาะกับ Redirect, Rewrite หรือแก้ Header แบบเบา ๆ ไม่ควรใช้เป็นระบบ Authorization หรือดึงข้อมูลที่ใช้เวลานาน

## 14. TypeScript ที่ควรใช้

TypeScript ช่วยประกาศรูปร่างของข้อมูลและให้ Editor ตรวจสอบก่อนรันจริง:

```ts
type Camp = {
  id: number;
  title: string;
  price: number;
  isAvailable: boolean;
};

const camp: Camp = {
  id: 1,
  title: "Route 3060",
  price: 1500,
  isAvailable: true,
};
```

ประโยชน์หลัก:

- เห็นโครงสร้างข้อมูลชัดเจน
- ลดการใช้ `any` ที่ทำให้สูญเสียการตรวจสอบชนิดข้อมูล
- Editor ช่วยเติมชื่อ Property และแจ้งข้อผิดพลาด
- ทำให้ Function และ Component มีสัญญาการรับส่งข้อมูลชัดเจน

## ลำดับการเรียนแนะนำ

1. ทบทวน HTML, CSS และ JavaScript จากเอกสารในโฟลเดอร์ `docs`
2. อ่านโครงสร้าง `app/` และสร้างหน้า `/about`
3. เรียน Layout, Metadata และ Tailwind CSS
4. เรียน Server/Client Components
5. สร้าง Dynamic Route และแสดงข้อมูลด้วย `.map()`
6. ดึงข้อมูล พร้อมทำ `loading.tsx` และ `error.tsx`
7. จัดการรูปภาพด้วย `next/image`
8. สร้างฟอร์มด้วย Server Actions และ `useActionState`
9. สร้าง Route Handler สำหรับ API
10. เรียน TypeScript, Validation, Authentication และ Authorization ก่อนทำโปรเจกต์จริง

## เช็กลิสต์ก่อนจบบทเริ่มต้น

- [ ] เปิดโปรเจกต์ด้วย `npm run dev` ได้
- [ ] สร้าง route `/about` ได้
- [ ] อธิบายความแตกต่างระหว่าง Server Component และ Client Component ได้
- [ ] ใช้ `params` ของ Dynamic Route ได้
- [ ] ใช้ `.map()` แสดงรายการพร้อม `key` ได้
- [ ] ใช้ Tailwind CSS จัดรูปแบบ Component ได้
- [ ] สร้าง `loading.tsx` และ `error.tsx` ได้
- [ ] สร้าง Route Handler แบบ `GET` ได้
- [ ] อธิบายเหตุผลที่ต้อง Validate และตรวจสิทธิ์ฝั่ง Server ได้

## แหล่งอ้างอิงทางการ

- [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Page and Layout Conventions](https://nextjs.org/docs/app/api-reference/file-conventions/page)
- [Next.js Proxy](https://nextjs.org/docs/app/getting-started/proxy)
- [Next.js Route Handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route)
- [React Versions](https://react.dev/versions)
- [React `useActionState`](https://react.dev/reference/react/useActionState)
- [Tailwind CSS Installation](https://tailwindcss.com/docs/installation)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)