export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      product: {
        Row: {
          count: number
          created_at: string
          id: number
          name: string
          price: number
          purchased: boolean
        }
        Insert: {
          count?: number
          created_at?: string
          id?: number
          name?: string
          price?: number
          purchased?: boolean
        }
        Update: {
          count?: number
          created_at?: string
          id?: number
          name?: string
          price?: number
          purchased?: boolean
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
