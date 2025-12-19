"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Loader } from "@/components/ui/Loader";
import { ErrorState } from "@/components/ui/ErrorState";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import RepositoryFactory from "@/lib/repositories";
import { Appointment, AppointmentStatus } from "@/domain/entities/Appointment";
import { Doctor } from "@/domain/entities/Doctor";
import { Token } from "@/domain/entities/Token";

export default function AppointmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.appointmentId as string;

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [token, setToken] = useState<Token | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const appointmentRepo = RepositoryFactory.getAppointmentRepository();
      const clinicRepo = RepositoryFactory.getClinicRepository();

      const appointmentData = await appointmentRepo.getAppointmentById(
        appointmentId
      );

      if (!appointmentData) {
        setError("Appointment not found");
        return;
      }

      setAppointment(appointmentData);

      // Load doctor information
      const doctorData = await clinicRepo.getDoctorById(appointmentData.doctorId);
      
      if (!doctorData) {
        setError("Doctor not found");
        return;
      }

      setDoctor(doctorData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load appointment");
    } finally {
      setIsLoading(false);
    }
  }, [appointmentId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // useEffect(() => {
  //   if (!appointment) return;

  //   const tokenRepo = RepositoryFactory.getTokenRepository();
  //   const clinicId = "virtual-clinic"; // Use virtual clinic ID
    
  //   const unsubscribe = tokenRepo.subscribeToTokenUpdates(
  //     appointment.doctorId,
  //     clinicId,
  //     (updatedToken) => {
  //       setToken(updatedToken);
  //     }
  //   );

  //   // Load initial token
  //   tokenRepo
  //     .getCurrentToken(appointment.doctorId, clinicId)
  //     .then(setToken);

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [appointment]);

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

  const getTokensAhead = () => {
    if (!token || !appointment) return 0;
    if (token.currentToken >= appointment.tokenNumber) return 0;
    return appointment.tokenNumber - token.currentToken;
  };

  const getEstimatedWaitTime = () => {
    const tokensAhead = getTokensAhead();
    // Assume 15 minutes per patient
    const minutesPerPatient = 15;
    return tokensAhead * minutesPerPatient;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !appointment || !doctor) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <ErrorState
            message={error || "Appointment not found"}
            onRetry={loadData}
          />
        </main>
        <Footer />
      </div>
    );
  }

  const tokensAhead = getTokensAhead();
  const estimatedWait = getEstimatedWaitTime();
  const isYourTurn = token && token.currentToken >= appointment.tokenNumber;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Appointment Details
            </h1>
          </div>

          {/* Token Status Card */}
          <Card className="mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <div className="text-center">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Your Token Number</p>
                <div className="text-6xl font-bold text-primary-600 mb-2">
                  {appointment.tokenNumber}
                </div>
                {getStatusBadge(appointment.status)}
              </div>

              {token && (
                <div className="mt-6 pt-6 border-t border-primary-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Currently Serving
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {token.currentToken}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tokens Ahead</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {tokensAhead}
                      </p>
                    </div>
                  </div>

                  {isYourTurn ? (
                    <div className="mt-6 p-4 bg-secondary-100 rounded-lg">
                      <p className="text-lg font-semibold text-secondary-800">
                        🎉 It`s your turn! Please proceed to Room {doctor.roomNumber}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6">
                      <p className="text-sm text-gray-600 mb-1">
                        Estimated Wait Time
                      </p>
                      <p className="text-xl font-semibold text-gray-900">
                        {estimatedWait} minutes
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Appointment Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {appointment.timeSlot.startTime && (
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-gray-900">
                      {appointment.timeSlot.startTime}
                      {appointment.timeSlot.endTime && ` - ${appointment.timeSlot.endTime}`}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(appointment.status)}</div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Doctor Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-900">{doctor.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialization</p>
                  <p className="font-semibold text-gray-900">
                    {doctor.specialization}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room Number</p>
                  <p className="font-semibold text-gray-900">
                    {doctor.roomNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  <p className="font-semibold text-gray-900">
                    ₹{doctor.consultationFee}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Patient Information */}
          {appointment.patientName && (
            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Patient Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                </div>
                {appointment.patientPhone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-900">{appointment.patientPhone}</p>
                  </div>
                )}
                {appointment.patientAge && (
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-semibold text-gray-900">{appointment.patientAge} years</p>
                  </div>
                )}
                {appointment.patientGender && (
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-semibold text-gray-900 capitalize">{appointment.patientGender}</p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

