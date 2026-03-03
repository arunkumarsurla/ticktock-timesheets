"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  function validate() {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const loadingToast = toast.loading("Signing you in...");

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.dismiss(loadingToast);
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("Login successful 🎉");

      router.push("/dashboard");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* LEFT — Login form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 md:px-16 lg:px-24">
        <h1 className="text-5xl font-bold mb-8 text-blue-600">ticktock</h1>

        <h1 className="text-2xl font-bold mb-8">Welcome back</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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