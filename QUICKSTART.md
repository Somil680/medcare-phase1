# Quick Start Guide

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## First Steps

1. **Explore the landing page** - See the homepage with clinic information

2. **Browse clinics** - Click "Book Appointment" or navigate to `/clinics`

3. **View doctors** - Select a clinic to see available doctors

4. **Login (Mock)** - Use one of these credentials:
   - Email: `john.doe@example.com`
   - Phone: `+1 (555) 111-2222`
   - Password: (not required)

5. **Book an appointment:**
   - Select a clinic
   - Choose a doctor
   - Pick a date and time slot
   - Confirm booking

6. **Track your token:**
   - View appointment details
   - See real-time token updates (simulated)
   - Monitor your position in the queue

## Project Structure Overview

```
medcare-phase1/
├── app/                    # Next.js pages
│   ├── (auth)/            # Login page
│   ├── (patient)/         # Dashboard & Profile
│   ├── appointments/      # Booking & Details
│   └── clinics/           # Clinic & Doctor listings
├── components/            # Reusable UI components
├── domain/                # Business logic & interfaces
├── infrastructure/        # Data layer (mock implementations)
└── mock-data/             # Static test data
```

## Key Features to Test

- ✅ Landing page navigation
- ✅ Clinic browsing
- ✅ Doctor selection
- ✅ Appointment booking flow
- ✅ Real-time token tracking (simulated)
- ✅ Patient dashboard
- ✅ Profile management
- ✅ Mock authentication

## Troubleshooting

**Linter errors?** 
- Run `npm install` first
- Errors should resolve after dependencies are installed

**Page not loading?**
- Ensure you're running `npm run dev`
- Check that port 3000 is available

**Authentication not working?**
- This is mock auth - use the provided credentials
- Check browser console for errors

## Next Steps

- Review the architecture in `/domain` and `/infrastructure`
- Explore mock data in `/mock-data`
- Check component library in `/components/ui`
- Read `README.md` for detailed documentation

