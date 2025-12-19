# Supabase Integration

This directory contains Supabase implementations of the repository interfaces.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be fully provisioned

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials:
   - Go to your Supabase project settings
   - Navigate to API settings
   - Copy the following:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **service_role key** (optional, for admin operations) → `SUPABASE_SERVICE_ROLE_KEY`

### 4. Database Schema

Run the following SQL in your Supabase SQL Editor to create the required tables:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clinics table
CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  image TEXT,
  description TEXT,
  operating_hours JSONB DEFAULT '{"open": "09:00", "close": "18:00", "days": []}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  qualification TEXT NOT NULL,
  experience INTEGER DEFAULT 0,
  avatar TEXT,
  bio TEXT,
  room_number TEXT NOT NULL,
  consultation_fee DECIMAL(10, 2) DEFAULT 0,
  available_slots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time_slot JSONB NOT NULL,
  token_number INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tokens table (for real-time tracking)
CREATE TABLE IF NOT EXISTS tokens (
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  current_token INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (doctor_id, clinic_id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_doctors_clinic_id ON doctors(clinic_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies (adjust based on your security requirements)
-- Allow public read access to clinics and doctors
CREATE POLICY "Public read access to clinics" ON clinics FOR SELECT USING (true);
CREATE POLICY "Public read access to doctors" ON doctors FOR SELECT USING (true);

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own appointments
CREATE POLICY "Users can view own appointments" ON appointments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own appointments" ON appointments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read access to tokens (for real-time tracking)
CREATE POLICY "Public read access to tokens" ON tokens FOR SELECT USING (true);
```

### 5. Enable Realtime

1. Go to Database → Replication in Supabase dashboard
2. Enable replication for the `tokens` table
3. This allows real-time token updates

### 6. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The app will automatically use Supabase if environment variables are set
3. If variables are missing, it will fall back to mock implementations

## Switching Between Mock and Supabase

The repository factory automatically detects if Supabase is configured:
- If `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set → Uses Supabase
- Otherwise → Uses Mock implementations

## Notes

- The service role key should NEVER be exposed in client-side code
- Always use the anon key for client-side operations
- RLS policies should be configured based on your security requirements
- Realtime subscriptions require the tokens table to have replication enabled

