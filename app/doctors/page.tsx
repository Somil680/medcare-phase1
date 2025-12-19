"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Loader } from "@/components/ui/Loader";
import { ErrorState } from "@/components/ui/ErrorState";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import RepositoryFactory from "@/lib/repositories";
import { Doctor } from "@/domain/entities/Doctor";
import { Clinic } from "@/domain/entities/Clinic";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<(Doctor & { clinic: Clinic })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setIsLoading(true);
      const clinicRepo = RepositoryFactory.getClinicRepository();
      
      // Get all clinics
      const clinics = await clinicRepo.getAllClinics();
      
      // Get all doctors from all clinics
      const allDoctorsPromises = clinics.map(async (clinic) => {
        const clinicDoctors = await clinicRepo.getDoctorsByClinic(clinic.id);
        return clinicDoctors.map(doctor => ({ ...doctor, clinic }));
      });
      
      const doctorsArrays = await Promise.all(allDoctorsPromises);
      const allDoctors = doctorsArrays.flat();
      
      setDoctors(allDoctors);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load doctors");
    } finally {
      setIsLoading(false);
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

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <ErrorState message={error} onRetry={loadDoctors} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Our Doctors
            </h1>
            <p className="text-gray-600">
              Select a doctor to book an appointment
            </p>
          </div>

          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No doctors available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => {
                const availableCount = doctor.availableSlots.filter(
                  (s) => s.available
                ).length;

                return (
                  <Card key={doctor.id} hover>
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-900 mb-1">
                            {doctor.name}
                          </h2>
                          <Badge variant="info" className="mb-2">
                            {doctor.specialization}
                          </Badge>
                          <p className="text-xs text-gray-500 mb-1">
                            {doctor.clinic.name}
                          </p>
                        </div>
                        <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                          <span className="text-primary-600 font-semibold">
                            {doctor.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {doctor.qualification}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {doctor.experience} years of experience
                      </p>

                      {doctor.bio && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {doctor.bio}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Room</p>
                          <p className="font-semibold text-gray-900">
                            {doctor.roomNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500">Fee</p>
                          <p className="font-semibold text-gray-900">
                            ₹{doctor.consultationFee}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          {availableCount} slots available
                        </p>
                      </div>
                    </div>

                    <Link href={`/appointments/book?doctorId=${doctor.id}`}>
                      <Button variant="primary" className="w-full">
                        Book Appointment
                      </Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

