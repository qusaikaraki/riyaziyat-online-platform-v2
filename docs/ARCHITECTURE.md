# Riyaziyat Online V2 Architecture

## Stack
- Next.js App Router
- Tailwind CSS
- Supabase Auth + Postgres
- Resend for admin notifications

## Core flow
1. Student submits registration form.
2. A Supabase auth user is created immediately.
3. `student_profiles` row is saved with `pending`.
4. Admin receives email notification.
5. Admin approves or rejects inside `/admin`.
6. Only `approved` students can access dashboard.

## Main routes
- `/{locale}` landing page
- `/{locale}/register`
- `/{locale}/login`
- `/{locale}/dashboard`
- `/admin`

## Next production targets
- Add actual lesson booking
- Add teacher profile CMS
- Add pricing editor
- Add content upload for worksheets
- Add analytics / conversion tracking
