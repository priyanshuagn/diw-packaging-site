import dotenv from 'dotenv';
import { createClient as CC } from "@supabase/supabase-js"

 const NEXT_PUBLIC_SUPABASE_URL='https://ohnjdnqrvhnpafrdkcrk.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obmpkbnFydmhucGFmcmRrY3JrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjA1MTc5NCwiZXhwIjoyMDY3NjI3Nzk0fQ.oKnXL9FQ1v6qwZqgy_SyJcUXXcudJul1wCsSUP14C0c'
// Create a single supabase client for the browser
export const createClient = () => CC(process.env.NEXT_PUBLIC_SUPABASE_URL! || NEXT_PUBLIC_SUPABASE_URL , process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || SUPABASE_SERVICE_ROLE_KEY)