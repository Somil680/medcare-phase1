"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Loader } from "@/components/ui/Loader";
import { ErrorState } from "@/components/ui/ErrorState";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import RepositoryFactory from "@/lib/repositories";
import { Doctor } from "@/domain/entities/Doctor";
import { Clinic } from "@/domain/entities/Clinic";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<(Doctor & { clinic: Clinic })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  useEffect(() => {
    loadDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Get unique locations from clinics
  const locations = useMemo(() => {
    const uniqueAddresses = new Set<string>();
    doctors.forEach(doctor => {
      if (doctor.clinic.address) {
        uniqueAddresses.add(doctor.clinic.address);
      }
    });
    return Array.from(uniqueAddresses).sort();
  }, [doctors]);

  // Filter doctors based on search query and location
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      // Location filter
      const locationMatch = 
        selectedLocation === "all" || 
        doctor.clinic.address === selectedLocation;

      // Search filter - search in name, specialization, qualification, and bio
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = 
        !searchQuery ||
        doctor.name.toLowerCase().includes(searchLower) ||
        doctor.specialization.toLowerCase().includes(searchLower) ||
        doctor.qualification.toLowerCase().includes(searchLower) ||
        (doctor.bio && doctor.bio.toLowerCase().includes(searchLower));

      return locationMatch && searchMatch;
    });
  }, [doctors, searchQuery, selectedLocation]);

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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        <section className="section-gradient-light py-16 md:py-20">
          <div className="section-container">
            <div className="mb-10">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Doctors
              </h1>
              <p className="text-xl text-gray-600 font-light">
                Select a doctor to book an appointment
              </p>
            </div>

            {/* Filters Section */}
            <div className="mb-10 bg-white rounded-3xl shadow-lg border-2 border-emerald-100 p-8 hover:border-emerald-300 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search Input */}
              <div>
                <label htmlFor="doctor-search" className="block text-sm font-semibold text-gray-700 mb-3">
                  Search
                </label>
                <div className="relative">
                  <Input
                    id="doctor-search"
                    type="search"
                    placeholder="Search by name, specialization, or qualification..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400"
                    aria-label="Search doctors"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label htmlFor="location-filter" className="block text-sm font-semibold text-gray-700 mb-3">
                  Location
                </label>
                <div className="relative">
                  <select
                    id="location-filter"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="block w-full px-4 py-3 pl-12 pr-10 text-base rounded-xl border-2 border-gray-200 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-colors appearance-none cursor-pointer"
                    aria-label="Filter by location"
                  >
                    <option value="all">All Locations</option>
                    {locations.map((address, index) => (
                      <option key={`location-${index}`} value={address}>
                        {address}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Results Count */}
            {(searchQuery || selectedLocation !== "all") && (
              <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-base text-gray-600">
                  Showing <span className="font-bold text-emerald-600">{filteredDoctors.length}</span> of{" "}
                  <span className="font-bold text-gray-900">{doctors.length}</span> doctors
                </div>
                {(searchQuery || selectedLocation !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedLocation("all");
                    }}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-colors flex items-center gap-2"
                    aria-label="Clear all filters"
                  >
                    Clear filters
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>

            {doctors.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-gray-100">
                <p className="text-gray-500 text-lg">No doctors available at this time.</p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-emerald-100">
                <p className="text-gray-900 text-xl font-semibold mb-2">No doctors found</p>
                <p className="text-gray-500 text-base">
                  Try adjusting your search or location filter
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor) => {
                  const availableCount = doctor.availableSlots.filter(
                    (s) => s.available
                  ).length;

                  return (
                    <Card key={doctor.id} hover className="border-2 border-gray-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300">
                      <div className="mb-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
                              {doctor.name}
                            </h2>
                            <Badge variant="info" className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
                              {doctor.specialization}
                            </Badge>
                            <p className="text-sm text-gray-500 font-medium mb-1">
                              {doctor.clinic.name}
                            </p>
                          </div>
                          <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 ml-3 shadow-lg">
                            <span className="text-white font-bold text-xl">
                              {doctor.name.charAt(0)}
                            </span>
                          </div>
                        </div>

                        <p className="text-base text-gray-700 mb-3 font-medium">
                          {doctor.qualification}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          {doctor.experience} years of experience
                        </p>

                        {doctor.bio && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                            {doctor.bio}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-sm mb-4 p-4 bg-emerald-50 rounded-xl">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Room</p>
                            <p className="font-bold text-gray-900 text-base">
                              {doctor.roomNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500 text-xs mb-1">Fee</p>
                            <p className="font-bold text-emerald-600 text-base">
                              ₹{doctor.consultationFee}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600 font-medium">
                            <span className="text-emerald-600 font-bold">{availableCount}</span> slots available
                          </p>
                        </div>
                      </div>

                      <Link href={`/appointments/book?doctorId=${doctor.id}`}>
                        <Button variant="primary" className="w-full rounded-xl font-semibold py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300">
                          Book Appointment
                        </Button>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

