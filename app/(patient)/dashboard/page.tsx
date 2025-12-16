"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Loader } from "@/components/ui/Loader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import RepositoryFactory from "@/lib/repositories";
import { Appointment, AppointmentStatus } from "@/domain/entities/Appointment";
import { User } from "@/domain/entities/User";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuthAndLoad = useCallback(async () => {
    try {
      const authRepo = RepositoryFactory.getAuthRepository();
      const isAuth = await authRepo.isAuthenticated();

      if (!isAuth) {
        router.push("/auth/login?redirect=/dashboard");
        return;
      }

      const currentUser = await authRepo.getCurrentUser();
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }

      setUser(currentUser);

      const appointmentRepo = RepositoryFactory.getAppointmentRepository();
      const userAppointments = await appointmentRepo.getAppointmentsByUser(
        currentUser.id
      );
      setAppointments(userAppointments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuthAndLoad();
  }, [checkAuthAndLoad]);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.UPCOMING:
        return <Badge variant="info">Upcoming</Badge>;
      case AppointmentStatus.IN_PROGRESS:
        return <Badge variant="warning">In Progress</Badge>;
      case AppointmentStatus.COMPLETED:
        return <Badge variant="success">Completed</Badge>;
      case AppointmentStatus.CANCELLED:
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const upcomingAppointments = appointments.filter(
    (a) => a.status === AppointmentStatus.UPCOMING
  );
  const pastAppointments = appointments.filter(
    (a) =>
      a.status === AppointmentStatus.COMPLETED ||
      a.status === AppointmentStatus.CANCELLED
  );

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header user={user || undefined} />
        <main className="flex-1 flex items-center justify-center">
          <Loader size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header user={user || undefined} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={checkAuthAndLoad}>Retry</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user || undefined} />
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">Manage your appointments and health</p>
          </div>

          <div className="mb-8">
            <Link href="/doctors">
              <Button variant="primary" size="lg">
                Book New Appointment
              </Button>
            </Link>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Upcoming Appointments
            </h2>
            {upcomingAppointments.length === 0 ? (
              <EmptyState
                title="No upcoming appointments"
                description="Book your first appointment to get started"
                action={
                  <Link href="/doctors">
                    <Button variant="primary">Book Appointment</Button>
                  </Link>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} hover>
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Token</p>
                          <p className="text-2xl font-bold text-primary-600">
                            {appointment.tokenNumber}
                          </p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(appointment.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Time</p>
                          <p className="font-semibold text-gray-900">
                            {appointment.timeSlot.startTime} -{" "}
                            {appointment.timeSlot.endTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link href={`/appointments/${appointment.id}`}>
                      <Button variant="primary" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Past Appointments
            </h2>
            {pastAppointments.length === 0 ? (
              <EmptyState
                title="No past appointments"
                description="Your completed appointments will appear here"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Token</p>
                          <p className="text-2xl font-bold text-gray-400">
                            {appointment.tokenNumber}
                          </p>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(appointment.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Time</p>
                          <p className="font-semibold text-gray-900">
                            {appointment.timeSlot.startTime} -{" "}
                            {appointment.timeSlot.endTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link href={`/appointments/${appointment.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

