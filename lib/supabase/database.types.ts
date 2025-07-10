export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
      }
      blog_post_tags: {
        Row: {
          blog_post_id: string
          tag_id: string
        }
        Insert: {
          blog_post_id: string
          tag_id: string
        }
        Update: {
          blog_post_id?: string
          tag_id?: string
        }
      }
      blog_posts: {
        Row: {
          author_id: string
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          language: Database["public"]["Enums"]["language_code"]
          published_at: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          author_id: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          language?: Database["public"]["Enums"]["language_code"]
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          author_id?: string
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          language?: Database["public"]["Enums"]["language_code"]
          published_at?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          view_count?: number
        }
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
      }
      contact_submissions: {
        Row: {
          budget_range: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          ip_address: unknown | null
          message: string
          name: string
          project_type: string | null
          status: Database["public"]["Enums"]["contact_status"]
          timeline: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown | null
          message: string
          name: string
          project_type?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          timeline?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown | null
          message?: string
          name?: string
          project_type?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          timeline?: string | null
          updated_at?: string
          user_agent?: string | null
        }
      }
      media: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          file_path: string
          file_size: number
          filename: string
          id: string
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type: string
          original_name: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_path: string
          file_size: number
          filename: string
          id?: string
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type: string
          original_name: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          file_path?: string
          file_size?: number
          filename?: string
          id?: string
          media_type?: Database["public"]["Enums"]["media_type"]
          mime_type?: string
          original_name?: string
          uploaded_by?: string | null
        }
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
      }
      portfolio_features: {
        Row: {
          created_at: string
          feature_name: string
          id: string
          portfolio_item_id: string
        }
        Insert: {
          created_at?: string
          feature_name: string
          id?: string
          portfolio_item_id: string
        }
        Update: {
          created_at?: string
          feature_name?: string
          id?: string
          portfolio_item_id?: string
        }
      }
      portfolio_images: {
        Row: {
          created_at: string
          id: string
          media_id: string
          portfolio_item_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          media_id: string
          portfolio_item_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          media_id?: string
          portfolio_item_id?: string
          sort_order?: number
        }
      }
      portfolio_items: {
        Row: {
          category_id: string | null
          client_name: string | null
          created_at: string
          created_by: string
          description: string | null
          featured_image: string | null
          id: string
          language: Database["public"]["Enums"]["language_code"]
          project_date: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          client_name?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          featured_image?: string | null
          id?: string
          language?: Database["public"]["Enums"]["language_code"]
          project_date?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          featured_image?: string | null
          id?: string
          language?: Database["public"]["Enums"]["language_code"]
          project_date?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
      }
      translations: {
        Row: {
          context: string | null
          created_at: string
          id: string
          language: Database["public"]["Enums"]["language_code"]
          translation_key: string
          updated_at: string
          value: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          id?: string
          language: Database["public"]["Enums"]["language_code"]
          translation_key: string
          updated_at?: string
          value: string
        }
        Update: {
          context?: string | null
          created_at?: string
          id?: string
          language?: Database["public"]["Enums"]["language_code"]
          translation_key?: string
          updated_at?: string
          value?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contact_status: "new" | "read" | "replied" | "archived"
      content_status: "draft" | "published" | "archived"
      language_code: "en" | "sk" | "cs" | "de" | "es" | "it"
      media_type: "image" | "document" | "video"
      user_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
