"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Loader } from "@/components/ui/Loader";
import { ErrorState } from "@/components/ui/ErrorState";
import { Modal } from "@/components/ui/Modal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import RepositoryFactory from "@/lib/repositories";
import { Doctor } from "@/domain/entities/Doctor";
import { Clinic } from "@/domain/entities/Clinic";
import { PatientDetails } from "@/types/patient";

export default function BookAppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const clinicId = searchParams.get("clinicId");

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    name: "",
    age: 0,
    gender: "male",
    phoneNumber: "",
    email: "",
    address: "",
    medicalHistory: "",
  });
  const [tokenNumber, setTokenNumber] = useState<number | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const clinicRepo = RepositoryFactory.getClinicRepository();
      const [doctorData, clinicData] = await Promise.all([
        clinicRepo.getDoctorById(doctorId!),
        clinicRepo.getClinicById(clinicId!),
      ]);

      if (!doctorData || !clinicData) {
        setError("Doctor or clinic not found");
        return;
      }

      setDoctor(doctorData);
      setClinic(clinicData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [doctorId, clinicId]);

  useEffect(() => {
    if (!doctorId || !clinicId) {
      setError("Doctor and clinic information is required");
      setIsLoading(false);
      return;
    }
    loadData();
  }, [doctorId, clinicId, loadData]);

  /**
   * Generate token number for the appointment
   * Calculates the next available token based on current token state
   */
  const generateTokenNumber = async (): Promise<number> => {
    if (!doctor || !clinic) {
      throw new Error("Doctor or clinic information is missing");
    }

    const tokenRepo = RepositoryFactory.getTokenRepository();
    const tokenState = await tokenRepo.getCurrentToken(doctor.id, clinic.id);
    
    // Generate next token number (increment from total tokens)
    const nextToken = tokenState.totalTokens + 1;
    return nextToken;
  };


  /**
   * Validate patient details form
   */
  const validatePatientDetails = (): boolean => {
    if (!patientDetails.name.trim()) {
      setError("Please enter patient name");
      return false;
    }
    if (patientDetails.age <= 0 || patientDetails.age > 150) {
      setError("Please enter a valid age");
      return false;
    }
    if (!patientDetails.phoneNumber.trim()) {
      setError("Please enter phone number");
      return false;
    }
    // Basic phone validation
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(patientDetails.phoneNumber)) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  /**
   * Confirm booking and generate token number
   * This function handles the complete booking flow:
   * 1. Validates patient details
   * 2. Generates token number
   * 3. Creates appointment for today
   * 4. Shows token number in modal
   */
  const confirmBooking = async () => {
    // Validation
    if (!doctor || !clinic) {
      setError("Doctor or clinic information is missing");
      return;
    }

    if (!validatePatientDetails()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Generate token number
      const generatedToken = await generateTokenNumber();
      setTokenNumber(generatedToken);

      // Get today's date
      const today = new Date().toISOString().split("T")[0];
      
      // Calculate estimated time slot based on token number
      // Time is allocated based on token number (assuming 15 minutes per patient)
      const tokenRepo = RepositoryFactory.getTokenRepository();
      const currentTokenState = await tokenRepo.getCurrentToken(doctor.id, clinic.id);
      const tokensAhead = Math.max(0, generatedToken - currentTokenState.currentToken);
      const estimatedMinutes = tokensAhead * 15;
      
      // Calculate time slot starting from clinic opening time
      const [openHour, openMin] = clinic.operatingHours.open.split(":").map(Number);
      const totalMinutes = openHour * 60 + openMin + estimatedMinutes;
      const startHour = Math.floor(totalMinutes / 60);
      const startMin = totalMinutes % 60;
      const endHour = Math.floor((totalMinutes + 15) / 60);
      const endMin = (totalMinutes + 15) % 60;

      const startTime = `${String(startHour).padStart(2, "0")}:${String(startMin).padStart(2, "0")}`;
      const endTime = `${String(endHour).padStart(2, "0")}:${String(endMin).padStart(2, "0")}`;

      // Check if user is authenticated (for linking to user account)
      const authRepo = RepositoryFactory.getAuthRepository();
      const isAuth = await authRepo.isAuthenticated();
      let userId = "guest";

      if (isAuth) {
        const user = await authRepo.getCurrentUser();
        if (user) {
          userId = user.id;
        }
      }

      // Create appointment
      const appointmentRepo = RepositoryFactory.getAppointmentRepository();
      const appointment = await appointmentRepo.createAppointment({
        userId: userId,
        doctorId: doctor.id,
        clinicId: clinic.id,
        date: today,
        timeSlot: {
          startTime: startTime,
          endTime: endTime,
        },
        tokenNumber: generatedToken,
        status: "upcoming" as any,
      });

      // Update token repository total tokens count
      const tokenRepoInstance = RepositoryFactory.getTokenRepository();
      if (tokenRepoInstance && typeof (tokenRepoInstance as any).incrementTotalTokens === 'function') {
        await (tokenRepoInstance as any).incrementTotalTokens(doctor.id, clinic.id);
      }

      // Store appointment ID for navigation
      setAppointmentId(appointment.id);

      // Show token confirmation modal
      setShowTokenModal(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to confirm booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewAppointment = () => {
    if (appointmentId) {
      router.push(`/appointments/${appointmentId}`);
      setShowTokenModal(false);
    } else {
      router.push("/dashboard");
      setShowTokenModal(false);
    }
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

  if (error || !doctor || !clinic) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <ErrorState
            message={error || "Doctor or clinic not found"}
            onRetry={loadData}
          />
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mb-4"
            >
              ← Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Appointment
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Doctor Info */}
            <div className="lg:col-span-1">
              <Card>
                <div className="text-center mb-4">
                  <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-600 font-bold text-2xl">
                      {doctor.name.charAt(0)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {doctor.name}
                  </h2>
                  <Badge variant="info" className="mb-2">
                    {doctor.specialization}
                  </Badge>
                  <p className="text-sm text-gray-600">{doctor.qualification}</p>
                </div>

                <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Room</span>
                    <span className="font-semibold">{doctor.roomNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fee</span>
                    <span className="font-semibold">₹{doctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Clinic</span>
                    <span className="font-semibold text-right">{clinic.name}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Patient Details Form */}
            <div className="lg:col-span-2">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Patient Details
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Appointment will be scheduled for today. Time will be allocated based on your token number.
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); confirmBooking(); }}>
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={patientDetails.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter patient name"
                    />
                  </div>

                  {/* Age and Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        required
                        min="1"
                        max="150"
                        value={patientDetails.age || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={patientDetails.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={patientDetails.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={patientDetails.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="patient@example.com"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address (Optional)
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={patientDetails.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>

                  {/* Medical History */}
                  <div>
                    <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 mb-1">
                      Medical History (Optional)
                    </label>
                    <textarea
                      id="medicalHistory"
                      name="medicalHistory"
                      rows={3}
                      value={patientDetails.medicalHistory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Any relevant medical history or notes"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Confirming..." : "Confirm Booking"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Token Confirmation Modal */}
      <Modal
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        title="Booking Confirmed!"
        size="md"
      >
        <div className="text-center py-4">
          <div className="mb-6">
            <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-10 w-10 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Your Appointment is Booked!
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Please note your token number for tracking
            </p>
          </div>

          <div className="mb-6 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg border-2 border-primary-200">
            <p className="text-sm text-gray-600 mb-2">Your Token Number</p>
            <p className="text-5xl font-bold text-primary-600 mb-2">
              {tokenNumber}
            </p>
            <p className="text-xs text-gray-500">
              Appointment Date: {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-left bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-900 mb-2">Appointment Details:</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Doctor:</strong> {doctor?.name}</p>
                <p><strong>Specialization:</strong> {doctor?.specialization}</p>
                <p><strong>Room:</strong> {doctor?.roomNumber}</p>
                <p><strong>Clinic:</strong> {clinic?.name}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleViewAppointment}
              >
                View Appointment
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowTokenModal(false);
                  router.push("/doctors");
                }}
              >
                Book Another
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

