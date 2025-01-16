export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      actors: {
        Row: {
          born: string | null;
          created_at: string;
          id: number;
          image: string | null;
          name_en: string | null;
          name_ka: string | null;
          nominations: number | null;
          oscar: number | null;
          wins: number | null;
        };
        Insert: {
          born?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          name_en?: string | null;
          name_ka?: string | null;
          nominations?: number | null;
          oscar?: number | null;
          wins?: number | null;
        };
        Update: {
          born?: string | null;
          created_at?: string;
          id?: number;
          image?: string | null;
          name_en?: string | null;
          name_ka?: string | null;
          nominations?: number | null;
          oscar?: number | null;
          wins?: number | null;
        };
        Relationships: [];
      };
      genres: {
        Row: {
          created_at: string;
          id: number;
          name_en: string | null;
          name_ka: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name_en?: string | null;
          name_ka?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name_en?: string | null;
          name_ka?: string | null;
        };
        Relationships: [];
      };
      movie_actors: {
        Row: {
          act_id: number | null;
          created_at: string;
          id: number;
          m_id: number | null;
        };
        Insert: {
          act_id?: number | null;
          created_at?: string;
          id?: number;
          m_id?: number | null;
        };
        Update: {
          act_id?: number | null;
          created_at?: string;
          id?: number;
          m_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "movie_actors_act_id_fkey";
            columns: ["act_id"];
            isOneToOne: false;
            referencedRelation: "actors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "movie_actors_m_id_fkey";
            columns: ["m_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
        ];
      };
      movie_genres: {
        Row: {
          created_at: string;
          g_id: number | null;
          id: number;
          m_id: number | null;
        };
        Insert: {
          created_at?: string;
          g_id?: number | null;
          id?: number;
          m_id?: number | null;
        };
        Update: {
          created_at?: string;
          g_id?: number | null;
          id?: number;
          m_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "movie_genres_g_id_fkey";
            columns: ["g_id"];
            isOneToOne: false;
            referencedRelation: "genres";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "movie_genres_m_id_fkey";
            columns: ["m_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
        ];
      };
      movies: {
        Row: {
          awards: number | null;
          created_at: string;
          description_en: string | null;
          description_ka: string | null;
          id: number;
          image: string | null;
          name_en: string | null;
          name_ka: string | null;
          nomination: number | null;
          oscars: number | null;
          rating_count: number | null;
          rating_sum: number | null;
          release_date: string | null;
          trailer: string | null;
        };
        Insert: {
          awards?: number | null;
          created_at?: string;
          description_en?: string | null;
          description_ka?: string | null;
          id?: number;
          image?: string | null;
          name_en?: string | null;
          name_ka?: string | null;
          nomination?: number | null;
          oscars?: number | null;
          rating_count?: number | null;
          rating_sum?: number | null;
          release_date?: string | null;
          trailer?: string | null;
        };
        Update: {
          awards?: number | null;
          created_at?: string;
          description_en?: string | null;
          description_ka?: string | null;
          id?: number;
          image?: string | null;
          name_en?: string | null;
          name_ka?: string | null;
          nomination?: number | null;
          oscars?: number | null;
          rating_count?: number | null;
          rating_sum?: number | null;
          release_date?: string | null;
          trailer?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          image: string | null;
          name_en: string | null;
          name_ka: string | null;
          phone: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          image?: string | null;
          name_en?: string | null;
          name_ka?: string | null;
          phone?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          image?: string | null;
          name_en?: string | null;
          name_ka?: string | null;
          phone?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_ratings: {
        Row: {
          created_at: string;
          id: number;
          m_id: number | null;
          rating: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          m_id?: number | null;
          rating?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          m_id?: number | null;
          rating?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_ratings_m_id_fkey";
            columns: ["m_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
