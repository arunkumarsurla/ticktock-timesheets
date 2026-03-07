"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AuthPage() {
  const { status } = useSession();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [animating, setAnimating] = useState(false);

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  function switchToRegister() {
    if (animating || !isLogin) return;
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(false);
      setAnimating(false);
    }, 500);
  }

  function switchToLogin() {
    if (animating || isLogin) return;
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(true);
      setAnimating(false);
    }, 500);
  }

  function validateLogin() {
    if (!email.trim()) { toast.error("Email is required"); return false; }
    if (!password.trim()) { toast.error("Password is required"); return false; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return false; }
    return true;
  }

  function validateRegister() {
    const { name, email, password, confirmPassword } = formData;
    if (!name.trim()) { toast.error("Full name is required"); return false; }
    if (!email.trim()) { toast.error("Email is required"); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Please enter a valid email address"); return false; }
    if (!password) { toast.error("Password is required"); return false; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return false; }
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return false; }
    return true;
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoginLoading(true);
    const loadingToast = toast.loading("Signing you in...");
    try {
      const result = await signIn("credentials", { email: email.trim(), password, redirect: false });
      toast.dismiss(loadingToast);
      if (result?.error) {
        toast.error("Invalid email or password");
        setLoginLoading(false);
        return;
      }
      toast.success("Login successful 🎉");
      router.push("/dashboard");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
      setLoginLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!validateRegister()) return;
    setRegisterLoading(true);
    const loadingToast = toast.loading("Creating your account...");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name.trim(), email: formData.email.trim(), password: formData.password }),
      });
      const data = await res.json();
      toast.dismiss(loadingToast);
      if (!res.ok) {
        toast.error(data.error || "Registration failed");
        setRegisterLoading(false);
        return;
      }
      toast.success("Account created successfully 🎉");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      switchToLogin();
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Server error. Please try again.");
      setRegisterLoading(false);
    }
  }

  return (
    <>
      

      <div className="auth-root">

        {/* ── Sliding Blue Panel ── */}
        <div className={`blue-panel ${isLogin ? "login-mode" : "register-mode"}`}>
          {/* Login branding (shown when in login mode → panel on right) */}
          <div className={`panel-content ${isLogin ? "visible" : "hidden"}`}>
            <h2>ticktock</h2>
            <p>Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours.</p>
          </div>
          {/* Register branding (shown when in register mode → panel on left) */}
          <div className={`panel-content ${!isLogin ? "visible" : "hidden"}`}>
            <h2>ticktock</h2>
            <p>Join ticktock today and start tracking your team's work hours effortlessly.</p>
          </div>
        </div>

        {/* ── Form Area ── */}
        <div className={`form-area ${isLogin ? "login-mode" : "register-mode"}`}>

          {/* Login Form */}
          <div className={`panel-content ${isLogin ? "visible" : "hidden"}`}>
            <div className="logo">ticktock</div>
            <h1 className="form-heading">Welcome back</h1>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="remember">
                <input type="checkbox" id="remember" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type="submit" className="submit-btn" disabled={loginLoading}>
                {loginLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <p className="switch-link">
              Don't have an account?{" "}
              <button type="button" onClick={switchToRegister}>Register</button>
            </p>
          </div>

          {/* Register Form */}
          <div className={`panel-content ${!isLogin ? "visible" : "hidden"}`}>
            <div className="logo">ticktock</div>
            <h1 className="form-heading">Create an account</h1>
            <form onSubmit={handleRegister}>
              <div className="field">
                <label>Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" value={formData.password} onChange={e => setFormData(p => ({...p, password: e.target.value}))} />
              </div>
              <div className="field">
                <label>Confirm Password</label>
                <input type="password" value={formData.confirmPassword} onChange={e => setFormData(p => ({...p, confirmPassword: e.target.value}))} />
              </div>
              <button type="submit" className="submit-btn" disabled={registerLoading}>
                {registerLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>
            <p className="switch-link">
              Already have an account?{" "}
              <button type="button" onClick={switchToLogin}>Sign in</button>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}