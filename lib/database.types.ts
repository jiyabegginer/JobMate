export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          phone: string | null
          email: string | null
          password_hash: string
          full_name: string | null
          date_of_birth: string | null
          address: string | null
          profile_picture: string | null
          bio: string | null
          is_verified: boolean
          verification_token: string | null
          reset_token: string | null
          reset_token_expires_at: string | null
          preferred_language: string
          accessibility_settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          phone?: string | null
          email?: string | null
          password_hash: string
          full_name?: string | null
          date_of_birth?: string | null
          address?: string | null
          profile_picture?: string | null
          bio?: string | null
          is_verified?: boolean
          verification_token?: string | null
          reset_token?: string | null
          reset_token_expires_at?: string | null
          preferred_language?: string
          accessibility_settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string | null
          email?: string | null
          password_hash?: string
          full_name?: string | null
          date_of_birth?: string | null
          address?: string | null
          profile_picture?: string | null
          bio?: string | null
          is_verified?: boolean
          verification_token?: string | null
          reset_token?: string | null
          reset_token_expires_at?: string | null
          preferred_language?: string
          accessibility_settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          logo: string | null
          website: string | null
          description: string | null
          industry: string | null
          company_size: string | null
          founded_year: number | null
          headquarters: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo?: string | null
          website?: string | null
          description?: string | null
          industry?: string | null
          company_size?: string | null
          founded_year?: number | null
          headquarters?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo?: string | null
          website?: string | null
          description?: string | null
          industry?: string | null
          company_size?: string | null
          founded_year?: number | null
          headquarters?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      job_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          city: string
          province: string
          country: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          city: string
          province: string
          country?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          city?: string
          province?: string
          country?: string
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          company_id: string
          title: string
          description: string
          requirements: string | null
          responsibilities: string | null
          category_id: string | null
          location_id: string | null
          job_type: string
          salary_min: number | null
          salary_max: number | null
          salary_currency: string
          is_salary_visible: boolean
          is_remote: boolean
          experience_level: string | null
          education_level: string | null
          no_age_limit: boolean
          disability_friendly: boolean
          suitable_for: string | null
          application_deadline: string | null
          is_active: boolean
          views_count: number
          applications_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          description: string
          requirements?: string | null
          responsibilities?: string | null
          category_id?: string | null
          location_id?: string | null
          job_type: string
          salary_min?: number | null
          salary_max?: number | null
          salary_currency?: string
          is_salary_visible?: boolean
          is_remote?: boolean
          experience_level?: string | null
          education_level?: string | null
          no_age_limit?: boolean
          disability_friendly?: boolean
          suitable_for?: string | null
          application_deadline?: string | null
          is_active?: boolean
          views_count?: number
          applications_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          description?: string
          requirements?: string | null
          responsibilities?: string | null
          category_id?: string | null
          location_id?: string | null
          job_type?: string
          salary_min?: number | null
          salary_max?: number | null
          salary_currency?: string
          is_salary_visible?: boolean
          is_remote?: boolean
          experience_level?: string | null
          education_level?: string | null
          no_age_limit?: boolean
          disability_friendly?: boolean
          suitable_for?: string | null
          application_deadline?: string | null
          is_active?: boolean
          views_count?: number
          applications_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      job_skills: {
        Row: {
          id: string
          job_id: string
          skill_id: string
          created_at: string
        }
        Insert: {
          id?: string
          job_id: string
          skill_id: string
          created_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          skill_id?: string
          created_at?: string
        }
      }
      user_skills: {
        Row: {
          id: string
          user_id: string
          skill_id: string
          proficiency_level: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_id: string
          proficiency_level?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_id?: string
          proficiency_level?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      education: {
        Row: {
          id: string
          user_id: string
          institution: string
          degree: string | null
          field_of_study: string | null
          start_year: number
          end_year: number | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          institution: string
          degree?: string | null
          field_of_study?: string | null
          start_year: number
          end_year?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          institution?: string
          degree?: string | null
          field_of_study?: string | null
          start_year?: number
          end_year?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      experience: {
        Row: {
          id: string
          user_id: string
          company: string
          position: string
          start_date: string
          end_date: string | null
          is_current: boolean
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company: string
          position: string
          start_date: string
          end_date?: string | null
          is_current?: boolean
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company?: string
          position?: string
          start_date?: string
          end_date?: string | null
          is_current?: boolean
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          title: string
          file_url: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          file_url?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          file_url?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          job_id: string
          user_id: string
          resume_id: string | null
          cover_letter: string | null
          status: string
          application_date: string
          last_status_change: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          user_id: string
          resume_id?: string | null
          cover_letter?: string | null
          status?: string
          application_date?: string
          last_status_change?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          user_id?: string
          resume_id?: string | null
          cover_letter?: string | null
          status?: string
          application_date?: string
          last_status_change?: string
          created_at?: string
          updated_at?: string
        }
      }
      application_status_history: {
        Row: {
          id: string
          application_id: string
          status: string
          notes: string | null
          changed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          application_id: string
          status: string
          notes?: string | null
          changed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          status?: string
          notes?: string | null
          changed_at?: string
          created_at?: string
        }
      }
      saved_jobs: {
        Row: {
          id: string
          user_id: string
          job_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          created_at?: string
        }
      }
      company_reviews: {
        Row: {
          id: string
          company_id: string
          user_id: string
          rating: number
          title: string | null
          review_text: string | null
          pros: string | null
          cons: string | null
          is_anonymous: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          user_id: string
          rating: number
          title?: string | null
          review_text?: string | null
          pros?: string | null
          cons?: string | null
          is_anonymous?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          user_id?: string
          rating?: number
          title?: string | null
          review_text?: string | null
          pros?: string | null
          cons?: string | null
          is_anonymous?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          related_entity_type: string | null
          related_entity_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          is_read?: boolean
          related_entity_type?: string | null
          related_entity_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          related_entity_type?: string | null
          related_entity_id?: string | null
          created_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          job_categories: Json | null
          preferred_locations: Json | null
          min_salary: number | null
          job_types: Json | null
          is_remote: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_categories?: Json | null
          preferred_locations?: Json | null
          min_salary?: number | null
          job_types?: Json | null
          is_remote?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_categories?: Json | null
          preferred_locations?: Json | null
          min_salary?: number | null
          job_types?: Json | null
          is_remote?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string | null
          session_id: string
          role: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id: string
          role: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string
          role?: string
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      active_jobs: {
        Row: {
          id: string
          company_id: string
          title: string
          description: string
          requirements: string | null
          responsibilities: string | null
          category_id: string | null
          location_id: string | null
          job_type: string
          salary_min: number | null
          salary_max: number | null
          salary_currency: string
          is_salary_visible: boolean
          is_remote: boolean
          experience_level: string | null
          education_level: string | null
          no_age_limit: boolean
          disability_friendly: boolean
          suitable_for: string | null
          application_deadline: string | null
          is_active: boolean
          views_count: number
          applications_count: number
          created_at: string
          updated_at: string
          company_name: string
          company_logo: string | null
          city: string | null
          province: string | null
          category_name: string | null
        }
      }
      job_application_stats: {
        Row: {
          job_id: string
          job_title: string
          company_name: string
          total_applications: number
          applied_count: number
          reviewed_count: number
          interview_count: number
          accepted_count: number
          rejected_count: number
        }
      }
      company_rating_stats: {
        Row: {
          company_id: string
          company_name: string
          total_reviews: number
          average_rating: number
        }
      }
    }
    Functions: {
      increment_applications_count: {
        Args: {
          job_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
