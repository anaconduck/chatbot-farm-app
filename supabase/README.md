# ChickyAI - Supabase Database & Auth Setup Guide

## 1. Quick Start with Supabase Dashboard

1. Create a project at [https://supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase project.
3. Open `supabase/migrations/20260930_initial_schema.sql` and run all queries.
4. (Optional) Run `supabase/seed.sql` to populate initial research documents.
5. In project settings, copy:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** -> `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - **Service Role Key** -> `SUPABASE_SERVICE_ROLE_KEY`
6. Add these keys to your `.env.local` or Vercel Environment Variables.

## 2. Promoting an Admin Account

All public registrations default to `role = 'USER'` for security.
To create an `ADMIN` account:

```sql
-- Replace with the registered email of your admin
UPDATE public.profiles
SET role = 'ADMIN'
WHERE email = 'admin@yourcompany.com';
```

## 3. Development Demo Mode

For local development or previews without setting up Supabase, keep:
```env
NEXT_PUBLIC_DEMO_MODE=true
```
This enables simulated accounts:
- **User Demo:** `user@demo.local` / any password
- **Admin Demo:** `admin@demo.local` / any password
