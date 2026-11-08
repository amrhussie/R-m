export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_user_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: number
          metadata: Json
          organization_id: string | null
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: never
          metadata?: Json
          organization_id?: string | null
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: never
          metadata?: Json
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      child_guardians: {
        Row: {
          child_id: string
          created_at: string
          guardian_user_id: string
          id: string
          is_active: boolean
          is_primary: boolean
          organization_id: string
          relationship: string
        }
        Insert: {
          child_id: string
          created_at?: string
          guardian_user_id: string
          id?: string
          is_active?: boolean
          is_primary?: boolean
          organization_id: string
          relationship?: string
        }
        Update: {
          child_id?: string
          created_at?: string
          guardian_user_id?: string
          id?: string
          is_active?: boolean
          is_primary?: boolean
          organization_id?: string
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_guardians_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_guardians_child_org_fkey"
            columns: ["child_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "child_guardians_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      child_staff_assignments: {
        Row: {
          assigned_at: string
          assignment_role: Database["public"]["Enums"]["app_role"]
          child_id: string
          id: string
          is_active: boolean
          organization_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assignment_role: Database["public"]["Enums"]["app_role"]
          child_id: string
          id?: string
          is_active?: boolean
          organization_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          assignment_role?: Database["public"]["Enums"]["app_role"]
          child_id?: string
          id?: string
          is_active?: boolean
          organization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "child_staff_assignments_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "child_staff_assignments_child_org_fkey"
            columns: ["child_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "child_staff_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          child_code: string
          created_at: string
          created_by: string | null
          date_of_birth: string | null
          display_name: string
          id: string
          organization_id: string
          status: string
          updated_at: string
        }
        Insert: {
          child_code: string
          created_at?: string
          created_by?: string | null
          date_of_birth?: string | null
          display_name: string
          id?: string
          organization_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          child_code?: string
          created_at?: string
          created_by?: string | null
          date_of_birth?: string | null
          display_name?: string
          id?: string
          organization_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          child_id: string
          content_type: string | null
          created_at: string
          document_category: string
          file_name: string
          file_size_bytes: number | null
          id: string
          storage_path: string
          uploaded_by: string
        }
        Insert: {
          child_id: string
          content_type?: string | null
          created_at?: string
          document_category?: string
          file_name: string
          file_size_bytes?: number | null
          id?: string
          storage_path: string
          uploaded_by: string
        }
        Update: {
          child_id?: string
          content_type?: string | null
          created_at?: string
          document_category?: string
          file_name?: string
          file_size_bytes?: number | null
          id?: string
          storage_path?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      iep_goals: {
        Row: {
          baseline: string | null
          child_id: string
          created_at: string
          created_by: string | null
          goal_area: string
          id: string
          iep_plan_id: string
          measurement_method: string | null
          start_date: string | null
          status: string
          target: string | null
          target_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          baseline?: string | null
          child_id: string
          created_at?: string
          created_by?: string | null
          goal_area: string
          id?: string
          iep_plan_id: string
          measurement_method?: string | null
          start_date?: string | null
          status?: string
          target?: string | null
          target_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          baseline?: string | null
          child_id?: string
          created_at?: string
          created_by?: string | null
          goal_area?: string
          id?: string
          iep_plan_id?: string
          measurement_method?: string | null
          start_date?: string | null
          status?: string
          target?: string | null
          target_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "iep_goals_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iep_goals_iep_plan_id_fkey"
            columns: ["iep_plan_id"]
            isOneToOne: false
            referencedRelation: "iep_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      iep_plans: {
        Row: {
          child_id: string
          created_at: string
          created_by: string | null
          effective_from: string | null
          effective_to: string | null
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          title: string
          updated_at: string
          version: number
        }
        Insert: {
          child_id: string
          created_at?: string
          created_by?: string | null
          effective_from?: string | null
          effective_to?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          title: string
          updated_at?: string
          version?: number
        }
        Update: {
          child_id?: string
          created_at?: string
          created_by?: string | null
          effective_from?: string | null
          effective_to?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          title?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "iep_plans_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_memberships: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_memberships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          country_code: string
          created_at: string
          id: string
          name: string
          slug: string
          timezone: string
          updated_at: string
        }
        Insert: {
          country_code?: string
          created_at?: string
          id?: string
          name: string
          slug: string
          timezone?: string
          updated_at?: string
        }
        Update: {
          country_code?: string
          created_at?: string
          id?: string
          name?: string
          slug?: string
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          preferred_language: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          preferred_language?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          preferred_language?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      progress_observations: {
        Row: {
          child_id: string
          created_at: string
          evidence: Json
          id: string
          iep_goal_id: string | null
          measurement_unit: string | null
          measurement_value: number | null
          observation: string
          observed_at: string
          recorded_by: string
          therapy_session_id: string | null
        }
        Insert: {
          child_id: string
          created_at?: string
          evidence?: Json
          id?: string
          iep_goal_id?: string | null
          measurement_unit?: string | null
          measurement_value?: number | null
          observation: string
          observed_at?: string
          recorded_by: string
          therapy_session_id?: string | null
        }
        Update: {
          child_id?: string
          created_at?: string
          evidence?: Json
          id?: string
          iep_goal_id?: string | null
          measurement_unit?: string | null
          measurement_value?: number | null
          observation?: string
          observed_at?: string
          recorded_by?: string
          therapy_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_observations_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_observations_iep_goal_id_fkey"
            columns: ["iep_goal_id"]
            isOneToOne: false
            referencedRelation: "iep_goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_observations_therapy_session_id_fkey"
            columns: ["therapy_session_id"]
            isOneToOne: false
            referencedRelation: "therapy_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      therapy_sessions: {
        Row: {
          child_id: string
          created_at: string
          ended_at: string | null
          id: string
          scheduled_at: string | null
          session_notes: string | null
          session_type: string
          started_at: string | null
          status: string
          therapist_user_id: string
          updated_at: string
        }
        Insert: {
          child_id: string
          created_at?: string
          ended_at?: string | null
          id?: string
          scheduled_at?: string | null
          session_notes?: string | null
          session_type: string
          started_at?: string | null
          status?: string
          therapist_user_id: string
          updated_at?: string
        }
        Update: {
          child_id?: string
          created_at?: string
          ended_at?: string | null
          id?: string
          scheduled_at?: string | null
          session_notes?: string | null
          session_type?: string
          started_at?: string | null
          status?: string
          therapist_user_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapy_sessions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role:
        | "org_admin"
        | "center_manager"
        | "therapist"
        | "teacher"
        | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "org_admin",
        "center_manager",
        "therapist",
        "teacher",
        "parent",
      ],
    },
  },
} as const
