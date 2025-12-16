# MedCare - Phase 1

Online Doctor Appointment & Real-Time Token Tracking System (Patient Side)

## Overview

This is a UI-first, architecture-first implementation of a patient-facing application for booking doctor appointments and tracking tokens in real-time. The application is built with a clean architecture that allows easy backend replacement in the future.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Component-driven architecture**

## Architecture

The application follows a clean architecture pattern with clear separation of concerns:

```
/domain
  /entities          # Domain entities (User, Clinic, Doctor, Appointment, Token)
  /repositories      # Repository interfaces (abstractions)

/infrastructure
  /mock              # Mock implementations (current)
  /future-backend    # Placeholder for future backend implementations

/app                 # Next.js app router pages
/components          # Reusable UI components
/mock-data           # Static mock data
/lib                 # Utilities and repository factory
```

### Key Design Principles

1. **Backend-Agnostic**: UI depends only on repository interfaces, not concrete implementations
2. **Mock Data Only**: All data operations use in-memory mocks with simulated delays
3. **Easy Backend Replacement**: Simply implement repository interfaces and swap in the factory
4. **Clear Separation**: Domain logic is separate from UI and infrastructure

## Features

### ✅ Implemented

- **Landing Page**: Clean, modern homepage with call-to-action
- **Authentication (Mock)**: Simulated login with localStorage persistence
- **Clinic Listing**: Browse available clinics
- **Doctor Listing**: View doctors by clinic with availability
- **Appointment Booking**: Date and time slot selection with token preview
- **Appointment Details**: View appointment with real-time token tracking
- **Live Token Tracking**: Simulated real-time updates using setInterval
- **Patient Dashboard**: View upcoming and past appointments
- **Profile Page**: View user information and logout

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Mock Login Credentials

The application uses mock authentication. You can login with:

- **Email**: `john.doe@example.com`
- **Phone**: `+1 (555) 111-2222`
- **Password**: (Optional - not required for mock)

## Project Structure

```
medcare-phase1/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication routes
│   ├── (patient)/         # Patient routes
│   ├── appointments/      # Appointment pages
│   ├── clinics/           # Clinic pages
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   └── layout/            # Layout components
├── domain/
│   ├── entities/          # Domain models
│   └── repositories/      # Repository interfaces
├── infrastructure/
│   ├── mock/              # Mock implementations
│   └── future-backend/    # Placeholder for real backend
├── lib/                    # Utilities
├── mock-data/             # Static mock data
└── types/                 # TypeScript types
```

## Mock Data

All data is stored in `/mock-data`:

- `clinics.ts` - Clinic information
- `doctors.ts` - Doctor profiles and availability
- `users.ts` - User accounts
- `appointments.ts` - Appointment records
- `tokens.ts` - Token state

## Real-Time Token Tracking

Token updates are simulated using `setInterval` in `MockTokenRepository`. The repository:

- Updates token state every 3 seconds
- Notifies subscribers via callbacks
- Maintains subscription lifecycle

**Future**: Replace with WebSocket, Server-Sent Events, or polling API.

## Backend Integration Guide

To integrate a real backend:

1. **Implement Repository Interfaces** in `/infrastructure/future-backend`:
   - `AuthRepository` - Authentication provider
   - `ClinicRepository` - Clinic/doctor data API
   - `AppointmentRepository` - Appointment CRUD API
   - `TokenRepository` - Real-time token updates

2. **Update Repository Factory** in `/lib/repositories.ts`:
   ```typescript
   // Replace MockAuthRepository with YourAuthRepository
   this.authRepository = new YourAuthRepository();
   ```

3. **Remove Mock Data**: Delete or replace mock data files

4. **Add Environment Variables**: Create `.env.local` for API endpoints, keys, etc.

## UI Components

All reusable components are in `/components/ui`:

- `Button` - Primary, secondary, outline, ghost variants
- `Card` - Container with hover effects
- `Badge` - Status indicators
- `Loader` - Loading spinner
- `Modal` - Dialog overlay
- `EmptyState` - Empty state placeholder
- `ErrorState` - Error display with retry

## Development

```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Important Notes

⚠️ **This is NOT a production build**

- No real authentication
- No database connections
- No real-time services
- Mock data only
- Simulated delays for UX

This is a **UI + architecture foundation** designed for easy backend integration later.

## Future Enhancements

- [ ] Real authentication (Firebase, Supabase, Custom)
- [ ] Database integration
- [ ] Real-time WebSocket for tokens
- [ ] Payment integration
- [ ] Email/SMS notifications
- [ ] Appointment reminders
- [ ] Doctor reviews and ratings
- [ ] Medical history tracking

## License

This project is part of MedCare Phase 1 development.

---

Built with ❤️ for Somil Agrawal and team

