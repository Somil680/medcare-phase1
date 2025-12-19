# Supabase Setup Guide

This guide will help you set up Supabase integration for the MedCare application.

## Prerequisites

- A Supabase account ([sign up here](https://supabase.com))
- Node.js and npm installed

## Step 1: Install Dependencies

```bash
npm install
```

This will install `@supabase/supabase-js` and other required packages.

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Project Name**: medcare (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for the project to be provisioned

## Step 3: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`) - Keep this secret!

## Step 4: Create Environment File

1. Create a file named `.env.local` in the root of your project
2. Add the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Environment
NEXT_PUBLIC_ENVIRONMENT=development
```

3. Replace the placeholder values with your actual Supabase credentials

**⚠️ Important**: 
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Never expose the service role key in client-side code

## Step 5: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the SQL from `infrastructure/supabase/README.md` (Database Schema section)
4. Click "Run" to execute the SQL
5. Verify tables were created by going to **Table Editor**

## Step 6: Enable Realtime

1. Go to **Database** → **Replication** in Supabase dashboard
2. Find the `tokens` table
3. Toggle the switch to enable replication
4. This allows real-time token updates

## Step 7: Configure Row Level Security (RLS)

The SQL script includes basic RLS policies. You may want to adjust them based on your security requirements:

- **Public access**: Clinics, doctors, tokens (for viewing)
- **Authenticated users**: Can view/update their own profile and appointments

## Step 8: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. The app will automatically detect Supabase configuration:
   - If `.env.local` is configured → Uses Supabase
   - If not configured → Falls back to mock data

3. Test the following:
   - View doctors list (should load from Supabase)
   - Book an appointment (should save to Supabase)
   - View token tracking (should use real-time updates)

## Troubleshooting

### "Missing Supabase environment variables" error

- Check that `.env.local` exists in the project root
- Verify variable names match exactly (case-sensitive)
- Restart your dev server after adding environment variables

### "Failed to load clinics/doctors" error

- Verify your database tables were created
- Check RLS policies allow public read access
- Check Supabase project is active (not paused)

### Real-time updates not working

- Ensure replication is enabled for the `tokens` table
- Check browser console for WebSocket connection errors
- Verify your Supabase project is not on the free tier (which has connection limits)

### Authentication not working

- Check that the `users` table exists
- Verify RLS policies for the `users` table
- Check Supabase Auth settings in dashboard

## Next Steps

1. **Seed initial data**: Add some clinics and doctors to your database
2. **Set up authentication**: Configure email/password or OTP authentication
3. **Customize RLS policies**: Adjust security policies based on your needs
4. **Set up backups**: Configure automatic backups in Supabase dashboard

## Switching Back to Mock Data

If you want to temporarily use mock data:
1. Rename `.env.local` to `.env.local.backup`
2. Restart your dev server
3. The app will automatically use mock implementations

## Production Deployment

When deploying to production:

1. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Use the same variable names:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (if needed for server-side operations)
3. Never commit `.env.local` to your repository

## Support

For issues with:
- **Supabase**: Check [Supabase Documentation](https://supabase.com/docs)
- **This integration**: Check `infrastructure/supabase/README.md`

