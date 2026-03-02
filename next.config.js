/** @type {import('next').NextConfig} */
const nextConfig = {
  // These environment variables are required for NextAuth to work
  // Add them to your .env.local file:
  //
  // NEXTAUTH_URL=http://localhost:3000
  // NEXTAUTH_SECRET=any-random-long-string-here
  // NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
  // NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
}

module.exports = nextConfig
