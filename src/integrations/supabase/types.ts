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
      activities: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          opportunity_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          opportunity_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          opportunity_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          category: string | null
          created_at: string | null
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          opportunity_id: string | null
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          opportunity_id?: string | null
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          opportunity_id?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          item_number: number
          lot_id: string | null
          quantity: number | null
          specifications: string | null
          total_price: number | null
          unit: string | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          item_number: number
          lot_id?: string | null
          quantity?: number | null
          specifications?: string | null
          total_price?: number | null
          unit?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          item_number?: number
          lot_id?: string | null
          quantity?: number | null
          specifications?: string | null
          total_price?: number | null
          unit?: string | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lots"
            referencedColumns: ["id"]
          },
        ]
      }
      lots: {
        Row: {
          created_at: string | null
          description: string | null
          estimated_value: number | null
          id: string
          lot_number: number
          opportunity_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          estimated_value?: number | null
          id?: string
          lot_number: number
          opportunity_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          estimated_value?: number | null
          id?: string
          lot_number?: number
          opportunity_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lots_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      opinions: {
        Row: {
          comments: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          id: string
          opportunity_id: string | null
          review_date: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["opinion_status"] | null
          title: string
          type: Database["public"]["Enums"]["opinion_type"]
          updated_at: string | null
        }
        Insert: {
          comments?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          opportunity_id?: string | null
          review_date?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["opinion_status"] | null
          title: string
          type: Database["public"]["Enums"]["opinion_type"]
          updated_at?: string | null
        }
        Update: {
          comments?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          opportunity_id?: string | null
          review_date?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["opinion_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["opinion_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opinions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opinions_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opinions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          assigned_to: string | null
          bidding_number: string | null
          bidding_type: Database["public"]["Enums"]["bidding_type"] | null
          category: string | null
          created_at: string | null
          created_by: string | null
          deadline_date: string | null
          description: string | null
          estimated_value: number | null
          execution_mode: Database["public"]["Enums"]["execution_mode"] | null
          id: string
          notes: string | null
          opening_date: string | null
          organ: string
          publication_date: string | null
          status: Database["public"]["Enums"]["opportunity_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          bidding_number?: string | null
          bidding_type?: Database["public"]["Enums"]["bidding_type"] | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline_date?: string | null
          description?: string | null
          estimated_value?: number | null
          execution_mode?: Database["public"]["Enums"]["execution_mode"] | null
          id?: string
          notes?: string | null
          opening_date?: string | null
          organ: string
          publication_date?: string | null
          status?: Database["public"]["Enums"]["opportunity_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          bidding_number?: string | null
          bidding_type?: Database["public"]["Enums"]["bidding_type"] | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline_date?: string | null
          description?: string | null
          estimated_value?: number | null
          execution_mode?: Database["public"]["Enums"]["execution_mode"] | null
          id?: string
          notes?: string | null
          opening_date?: string | null
          organ?: string
          publication_date?: string | null
          status?: Database["public"]["Enums"]["opportunity_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bidding_type:
        | "pregao_eletronico"
        | "pregao_presencial"
        | "concorrencia"
        | "tomada_precos"
        | "convite"
        | "dispensa"
        | "inexigibilidade"
      execution_mode:
        | "menor_preco"
        | "melhor_tecnica"
        | "tecnica_preco"
        | "maior_lance"
      opinion_status:
        | "pendente"
        | "em_analise"
        | "aprovado"
        | "rejeitado"
        | "revisao"
      opinion_type: "tecnico" | "juridico" | "financeiro" | "comercial"
      opportunity_status:
        | "identificacao"
        | "analise_tecnica"
        | "parecer"
        | "proposta"
        | "em_andamento"
        | "finalizada"
        | "cancelada"
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
    Enums: {
      bidding_type: [
        "pregao_eletronico",
        "pregao_presencial",
        "concorrencia",
        "tomada_precos",
        "convite",
        "dispensa",
        "inexigibilidade",
      ],
      execution_mode: [
        "menor_preco",
        "melhor_tecnica",
        "tecnica_preco",
        "maior_lance",
      ],
      opinion_status: [
        "pendente",
        "em_analise",
        "aprovado",
        "rejeitado",
        "revisao",
      ],
      opinion_type: ["tecnico", "juridico", "financeiro", "comercial"],
      opportunity_status: [
        "identificacao",
        "analise_tecnica",
        "parecer",
        "proposta",
        "em_andamento",
        "finalizada",
        "cancelada",
      ],
    },
  },
} as const
