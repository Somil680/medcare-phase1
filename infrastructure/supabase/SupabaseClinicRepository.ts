import { ClinicRepository } from "@/domain/repositories/ClinicRepository";
import { Clinic } from "@/domain/entities/Clinic";
import { Doctor } from "@/domain/entities/Doctor";
import { getSupabaseClient } from "@/lib/supabase/client";

/**
 * Supabase clinic repository
 * Handles clinic and doctor data operations using Supabase.
 *
 * NOTE: In the current Supabase schema, we only have a `doctor_profile` table
 * and no explicit clinics. To keep the domain/API stable, we:
 * - Expose a single virtual clinic
 * - Map rows from `doctor_profile` to the domain `Doctor` entity
 */
export class SupabaseClinicRepository implements ClinicRepository {
  async getAllClinics(): Promise<Clinic[]> {
    // Return a single virtual clinic representing the OPD / practice
    return [
      {
        id: "virtual-clinic",
        name: "OPD Clinic",
        address: "On-site OPD",
        phone: "",
        email: "",
        description: "Token-based OPD managed via doctor profiles",
        operatingHours: {
          open: "09:00",
          close: "18:00",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        },
      },
    ];
  }

  async getClinicById(id: string): Promise<Clinic | null> {
    if (id === "virtual-clinic") {
      return {
        id: "virtual-clinic",
        name: "OPD Clinic",
        address: "On-site OPD",
        phone: "",
        email: "",
        description: "Token-based OPD managed via doctor profiles",
        operatingHours: {
          open: "09:00",
          close: "18:00",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        },
      };
    }

    // No real clinics in this schema
    return null;
  }

  async getDoctorsByClinic(clinicId: string): Promise<Doctor[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("doctor_profile")
      .select("*")
      .eq("is_active", true)
      .eq("allow_online_booking", true);

    if (error) {
      throw new Error(error.message || "Failed to load doctors");
    }

    return (data || []).map(this.mapToDoctor);
  }

  async getDoctorById(doctorId: string): Promise<Doctor | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("doctor_profile")
      .select("*")
      .eq("id", doctorId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Not found
      }
      throw new Error(error.message || "Failed to load doctor");
    }

    return data ? this.mapToDoctor(data) : null;
  }

  private mapToDoctor(data: any): Doctor {
    return {
      id: data.id,
      // Virtual clinic for backwards compatibility – conceptually there's only a doctor
      clinicId: "virtual-clinic",
      name: data.full_name,
      specialization: data.specialization,
      qualification: data.qualification || "",
      experience: data.experience_years || 0,
      avatar: data.profile_image_url,
      bio: data.bio,
      // No explicit room info in schema; use a generic label
      roomNumber: "OPD",
      consultationFee: Number(data.consultation_fee || 0),
      // Scheduling is controlled by token settings; we don't use explicit slots here
      availableSlots: [],
    };
  }
}

