-- Completely disable RLS for all tables to avoid recursion issues
-- This is a temporary solution for development

ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE media DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE translations DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_features DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to clean up
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON profiles;
DROP POLICY IF EXISTS "Published blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Editors can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Published portfolio items are viewable by everyone" ON portfolio_items;
DROP POLICY IF EXISTS "Editors can manage portfolio items" ON portfolio_items;
DROP POLICY IF EXISTS "Media is viewable by everyone" ON media;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON media;
DROP POLICY IF EXISTS "Users can manage own media or admins can manage all" ON media;
DROP POLICY IF EXISTS "Users can delete own media or admins can delete all" ON media;
DROP POLICY IF EXISTS "Anyone can create contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Translations are viewable by everyone" ON translations;
DROP POLICY IF EXISTS "Editors can manage translations" ON translations;
DROP POLICY IF EXISTS "Site settings are viewable by everyone" ON site_settings;
DROP POLICY IF EXISTS "Admins can manage site settings" ON site_settings;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Tags are viewable by everyone" ON tags;
DROP POLICY IF EXISTS "Editors can manage tags" ON tags;

-- Drop the functions that were causing issues
DROP FUNCTION IF EXISTS is_admin(UUID);
DROP FUNCTION IF EXISTS can_edit(UUID);

-- Note: In production, you would want to implement proper RLS policies
-- For now, we're disabling them to get the application working
