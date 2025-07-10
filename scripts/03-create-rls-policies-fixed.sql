-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Editors can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can view published portfolio items" ON portfolio_items;
DROP POLICY IF EXISTS "Editors can manage portfolio items" ON portfolio_items;
DROP POLICY IF EXISTS "Anyone can view media" ON media;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON media;
DROP POLICY IF EXISTS "Users can manage own media" ON media;
DROP POLICY IF EXISTS "Admins can manage all media" ON media;
DROP POLICY IF EXISTS "Anyone can create contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can view translations" ON translations;
DROP POLICY IF EXISTS "Editors can manage translations" ON translations;
DROP POLICY IF EXISTS "Anyone can view site settings" ON site_settings;
DROP POLICY IF EXISTS "Admins can manage site settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view tags" ON tags;
DROP POLICY IF EXISTS "Editors can manage tags" ON tags;

-- Disable RLS temporarily to avoid recursion
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

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if user is editor or admin
CREATE OR REPLACE FUNCTION can_edit(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-enable RLS with simplified policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Profiles policies (simplified)
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can insert profiles" ON profiles FOR INSERT WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Admins can delete profiles" ON profiles FOR DELETE USING (is_admin(auth.uid()));

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (
  status = 'published' OR can_edit(auth.uid())
);
CREATE POLICY "Editors can manage blog posts" ON blog_posts FOR ALL USING (can_edit(auth.uid()));

-- Portfolio items policies
CREATE POLICY "Published portfolio items are viewable by everyone" ON portfolio_items FOR SELECT USING (
  status = 'published' OR can_edit(auth.uid())
);
CREATE POLICY "Editors can manage portfolio items" ON portfolio_items FOR ALL USING (can_edit(auth.uid()));

-- Media policies
CREATE POLICY "Media is viewable by everyone" ON media FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload media" ON media FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can manage own media or admins can manage all" ON media FOR UPDATE USING (
  uploaded_by = auth.uid() OR is_admin(auth.uid())
);
CREATE POLICY "Users can delete own media or admins can delete all" ON media FOR DELETE USING (
  uploaded_by = auth.uid() OR is_admin(auth.uid())
);

-- Contact submissions policies
CREATE POLICY "Anyone can create contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact submissions" ON contact_submissions FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Admins can update contact submissions" ON contact_submissions FOR UPDATE USING (is_admin(auth.uid()));

-- Translations policies (public read, no auth required)
CREATE POLICY "Translations are viewable by everyone" ON translations FOR SELECT USING (true);
CREATE POLICY "Editors can manage translations" ON translations FOR ALL USING (can_edit(auth.uid()));

-- Site settings policies (public read)
CREATE POLICY "Site settings are viewable by everyone" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON site_settings FOR ALL USING (is_admin(auth.uid()));

-- Categories and tags policies (public read)
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Tags are viewable by everyone" ON tags FOR SELECT USING (true);
CREATE POLICY "Editors can manage tags" ON tags FOR ALL USING (can_edit(auth.uid()));

-- Junction tables and other tables (no RLS needed for most)
ALTER TABLE blog_post_tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_features DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions DISABLE ROW LEVEL SECURITY;
