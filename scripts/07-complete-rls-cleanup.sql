-- Complete cleanup of all RLS policies and functions
-- This will ensure no RLS-related issues remain

-- Drop all existing policies completely
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop all policies on all tables
    FOR r IN (SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON ' || r.schemaname || '.' || r.tablename;
    END LOOP;
END $$;

-- Disable RLS on all tables
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS portfolio_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS media DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS translations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blog_post_tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS portfolio_features DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS portfolio_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS analytics_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS newsletter_subscriptions DISABLE ROW LEVEL SECURITY;

-- Drop any remaining functions that might cause issues
DROP FUNCTION IF EXISTS is_admin(UUID);
DROP FUNCTION IF EXISTS can_edit(UUID);
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Remove the trigger that might be causing issues
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Grant full access to authenticated users for now
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant access to anonymous users for public data
GRANT SELECT ON translations TO anon;
GRANT SELECT ON site_settings TO anon;
GRANT SELECT ON categories TO anon;
GRANT SELECT ON tags TO anon;
GRANT SELECT ON blog_posts TO anon;
GRANT SELECT ON portfolio_items TO anon;
GRANT SELECT ON media TO anon;
GRANT INSERT ON contact_submissions TO anon;
GRANT INSERT ON analytics_events TO anon;
GRANT INSERT ON newsletter_subscriptions TO anon;
