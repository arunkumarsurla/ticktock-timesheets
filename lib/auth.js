import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (error || !user) {
          throw new Error("No account found with that email")
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Wrong password")
        }

        return {
          id:    1,
          name:  user.name,
          email: user.email,
          role:  user.role || "user",
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      session.user.id   = token.id
      session.user.role = token.role
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
