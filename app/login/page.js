"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);

    const result = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false, // ← false = don't auto-redirect, let us handle it
    });

    if (result?.error) {
      setError("Invalid email or password");
      toast.error("Invalid Credentials.!");

      setLoading(false);
      return;
    }

    // Login worked — go to dashboard
    router.push("/dashboard");
    toast.success("Login successful 🎉");
  }

  return (
    <div className="flex min-h-screen">
      {/* LEFT — Login form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 md:px-16 lg:px-24">
        <h1 className="text-5xl font-bold mb-8 text-blue-600">ticktock</h1>

        <h1 className="text-2xl font-bold mb-8">Welcome back</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>

      {/* RIGHT — Branding */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-blue-600 px-16 text-white">
        <h2 className="text-4xl font-bold mb-6">ticktock</h2>
        <p className="text-lg leading-relaxed text-blue-100">
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours.
        </p>
      </div>
    </div>
  );
}
