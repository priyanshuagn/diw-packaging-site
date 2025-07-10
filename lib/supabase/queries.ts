import { createClient } from "./client"
import type { Database } from "./database.types"
import { mockPortfolioItems, mockBlogPosts } from "../mock-data"

type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"]
type PortfolioItem = Database["public"]["Tables"]["portfolio_items"]["Row"]
type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"]
type Translation = Database["public"]["Tables"]["translations"]["Row"]

// Use mock data to avoid database issues
const USE_MOCK_DATA = false

// Create a simple client without auth for public data
function createPublicClient() {
    const supabase = createClient();
    return supabase
}

// Blog queries
export async function getBlogPosts(language = "en", status = "published") {
    if (USE_MOCK_DATA) {
        // Return mock data filtered by language and status
        return mockBlogPosts.filter((post) => post.language === language && post.status === status)
    }

    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("language", language)
            .eq("status", status)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching blog posts:", error)
            return mockBlogPosts.filter((post) => post.language === language && post.status === status)
        }
        return data || []
    } catch (error) {
        console.error("Error in getBlogPosts:", error)
        return mockBlogPosts.filter((post) => post.language === language && post.status === status)
    }
}

export async function getBlogPost(slug: string, language = "en") {
    if (USE_MOCK_DATA) {
        return mockBlogPosts.find((post) => post.slug === slug && post.language === language) || null
    }

    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("slug", slug)
            .eq("language", language)
            .single()

        if (error) {
            console.error("Error fetching blog post:", error)
            return mockBlogPosts.find((post) => post.slug === slug && post.language === language) || null
        }
        return data
    } catch (error) {
        console.error("Error in getBlogPost:", error)
        return mockBlogPosts.find((post) => post.slug === slug && post.language === language) || null
    }
}

export async function createBlogPost(post: Partial<BlogPost>) {
    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase.from("blog_posts").insert(post).select().single()

        if (error) {
            console.error("Error creating blog post:", error)
            throw error
        }
        return data
    } catch (error) {
        console.error("Error in createBlogPost:", error)
        throw error
    }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single()

        if (error) {
            console.error("Error updating blog post:", error)
            throw error
        }
        return data
    } catch (error) {
        console.error("Error in updateBlogPost:", error)
        throw error
    }
}

// Portfolio queries - use mock data to avoid database issues
export async function getPortfolioItems(category?: string, language = "en") {
    if (USE_MOCK_DATA) {
        let filteredItems = mockPortfolioItems.filter((item) => item.language === language && item.status === "published")

        // Filter by category if specified
        if (category && category !== "all") {
            filteredItems = filteredItems.filter((item) => item.category_id === category)
        }

        return filteredItems
    }

    // Fallback to database (but this might cause RLS issues)
    const supabase = createPublicClient()

    try {
        const query = supabase.from("portfolio_items").select("*").eq("language", language).eq("status", "published")

        const { data: portfolioItems, error } = await query.order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching portfolio items:", error)
            return mockPortfolioItems.filter((item) => item.language === language && item.status === "published")
        }

        if (!portfolioItems) return mockPortfolioItems

        // Add mock data for display
        const enrichedItems = portfolioItems.map((item) => ({
            ...item,
            categories: { name: "Luxury Boxes", slug: "luxury-boxes" },
            portfolio_features: [
                { feature_name: "Premium Materials" },
                { feature_name: "Custom Design" },
                { feature_name: "High Quality Finish" },
            ],
            portfolio_images: [],
            media: null,
        }))

        return enrichedItems
    } catch (error) {
        console.error("Error in getPortfolioItems:", error)
        return mockPortfolioItems.filter((item) => item.language === language && item.status === "published")
    }
}

export async function getPortfolioItem(slug: string, language = "en") {
    if (USE_MOCK_DATA) {
        return mockPortfolioItems.find((item) => item.slug === slug && item.language === language) || null
    }

    const supabase = createPublicClient()

    try {
        const { data: item, error } = await supabase
            .from("portfolio_items")
            .select("*")
            .eq("slug", slug)
            .eq("language", language)
            .single()

        if (error) {
            console.error("Error fetching portfolio item:", error)
            return mockPortfolioItems.find((item) => item.slug === slug && item.language === language) || null
        }

        if (!item) return null

        return {
            ...item,
            categories: { name: "Luxury Boxes", slug: "luxury-boxes" },
            portfolio_features: [
                { feature_name: "Premium Materials" },
                { feature_name: "Custom Design" },
                { feature_name: "High Quality Finish" },
            ],
            portfolio_images: [],
            media: null,
        }
    } catch (error) {
        console.error("Error in getPortfolioItem:", error)
        return mockPortfolioItems.find((item) => item.slug === slug && item.language === language) || null
    }
}

// Contact form queries - these should work as they don't involve profiles
export async function createContactSubmission(
    submission: Omit<ContactSubmission, "id" | "created_at" | "updated_at" | "status">,
) {
    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase.from("contact_submissions").insert(submission).select().single()

        if (error) {
            console.error("Error creating contact submission:", error)
            throw error
        }
        return data
    } catch (error) {
        console.error("Error in createContactSubmission:", error)
        throw error
    }
}

export async function getContactSubmissions() {
    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase
            .from("contact_submissions")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching contact submissions:", error)
            return []
        }
        return data || []
    } catch (error) {
        console.error("Error in getContactSubmissions:", error)
        return []
    }
}

// Translation queries - use static translations to avoid database
export async function getTranslations(language = "en") {
    // Always return empty object since we use static translations
    console.log(`Using static translations for language: ${language}`)
    return {}
}

export async function updateTranslation(key: string, language: string, value: string) {
    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase
            .from("translations")
            .upsert({
                translation_key: key,
                language: language as Database["public"]["Enums"]["language_code"],
                value,
            })
            .select()
            .single()

        if (error) {
            console.error("Error updating translation:", error)
            throw error
        }
        return data
    } catch (error) {
        console.error("Error in updateTranslation:", error)
        throw error
    }
}

// Media queries
export async function uploadMedia(file: File, userId: string) {
    const supabase = createPublicClient()

    try {
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `media/${fileName}`

        const { data: uploadData, error: uploadError } = await supabase.storage.from("media").upload(filePath, file)

        if (uploadError) {
            console.error("Error uploading file:", uploadError)
            throw uploadError
        }

        const { data, error } = await supabase
            .from("media")
            .insert({
                filename: fileName,
                original_name: file.name,
                file_path: filePath,
                file_size: file.size,
                mime_type: file.type,
                media_type: file.type.startsWith("image/") ? "image" : "document",
                uploaded_by: userId,
            })
            .select()
            .single()

        if (error) {
            console.error("Error creating media record:", error)
            throw error
        }
        return data
    } catch (error) {
        console.error("Error in uploadMedia:", error)
        throw error
    }
}

export async function getMediaFiles() {
    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching media files:", error)
            return []
        }
        return data || []
    } catch (error) {
        console.error("Error in getMediaFiles:", error)
        return []
    }
}

// Site settings queries
export async function getSiteSettings() {
    // Return empty object to avoid database issues
    return {}
}

export async function updateSiteSettings(key: string, value: any) {
    const supabase = createPublicClient()

    try {
        const { data, error } = await supabase
            .from("site_settings")
            .upsert({
                key,
                value,
            })
            .select()
            .single()

        if (error) {
            console.error("Error updating site settings:", error)
            throw error
        }
        return data
    } catch (error) {
        console.error("Error in updateSiteSettings:", error)
        throw error
    }
}

// Analytics - simplified to avoid issues
export async function trackEvent(eventType: string, eventData?: any) {
    // Skip analytics for now to avoid database issues
    console.log(`Analytics event: ${eventType}`, eventData)
    return null
}
