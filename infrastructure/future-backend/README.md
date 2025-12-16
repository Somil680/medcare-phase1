# Future Backend Integration

This directory is a placeholder for future backend implementations.

## Architecture

The application is designed with a repository pattern, allowing easy backend replacement.

## Integration Steps

1. Implement repository interfaces from `/domain/repositories`:
   - `AuthRepository`
   - `ClinicRepository`
   - `AppointmentRepository`
   - `TokenRepository`

2. Replace mock implementations in `/infrastructure/mock` with real implementations here.

3. Update dependency injection in the application to use new implementations.

## Examples

- REST API implementation
- GraphQL implementation
- Firebase/Supabase implementation
- WebSocket for real-time token updates
- Server-Sent Events for token updates

