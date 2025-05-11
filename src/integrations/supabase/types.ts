export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      content: {
        Row: {
          about: Json | null
          clients: Json | null
          contact: Json | null
          created_at: string | null
          ebooks: Json | null
          hero: Json | null
          id: string
          methodology: Json | null
          section_visibility: Json | null
          services: Json | null
          updated_at: string | null
        }
        Insert: {
          about?: Json | null
          clients?: Json | null
          contact?: Json | null
          created_at?: string | null
          ebooks?: Json | null
          hero?: Json | null
          id: string
          methodology?: Json | null
          section_visibility?: Json | null
          services?: Json | null
          updated_at?: string | null
        }
        Update: {
          about?: Json | null
          clients?: Json | null
          contact?: Json | null
          created_at?: string | null
          ebooks?: Json | null
          hero?: Json | null
          id?: string
          methodology?: Json | null
          section_visibility?: Json | null
          services?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      linkedin_posts: {
        Row: {
          comments: number | null
          created_at: string | null
          date: string | null
          id: string
          image_url: string | null
          likes: number | null
          post_url: string
          text_snippet: string
          updated_at: string | null
        }
        Insert: {
          comments?: number | null
          created_at?: string | null
          date?: string | null
          id: string
          image_url?: string | null
          likes?: number | null
          post_url: string
          text_snippet: string
          updated_at?: string | null
        }
        Update: {
          comments?: number | null
          created_at?: string | null
          date?: string | null
          id?: string
          image_url?: string | null
          likes?: number | null
          post_url?: string
          text_snippet?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          client: string
          created_at: string | null
          description: string
          id: string
          image: string
          link: string | null
          title: string
          type: string
          updated_at: string | null
          year: string
        }
        Insert: {
          client: string
          created_at?: string | null
          description: string
          id: string
          image: string
          link?: string | null
          title: string
          type: string
          updated_at?: string | null
          year: string
        }
        Update: {
          client?: string
          created_at?: string | null
          description?: string
          id?: string
          image?: string
          link?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          year?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_function_exists: {
        Args: { function_name: string }
        Returns: boolean
      }
      run_sql: {
        Args: { sql: string }
        Returns: undefined
      }
      table_exists: {
        Args: { table_name: string }
        Returns: boolean
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
