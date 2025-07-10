-- Create an admin user profile
-- Note: This assumes you have already created a user in Supabase Auth
-- Replace 'your-user-id' with the actual UUID from auth.users

-- First, you need to sign up a user through Supabase Auth UI or API
-- Then run this script with the user's ID

-- Example: INSERT INTO profiles (id, email, full_name, role) VALUES 
-- ('your-auth-user-id-here', 'admin@diwpackaging.com', 'Admin User', 'admin');

-- For now, we'll create a trigger to automatically create profiles for new auth users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    'editor'  -- Default role, can be changed to 'admin' manually
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
