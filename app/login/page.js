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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          overflow: hidden;
          background: #fff;
          position: relative;
        }

        /* ── sliding blue panel ── */
        .blue-panel {
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
          background: #2563eb;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5%;
          color: #fff;
          z-index: 10;
          transition: left 0.55s cubic-bezier(0.77, 0, 0.175, 1);
          will-change: left;
        }
        .blue-panel.login-mode  { left: 50%; }
        .blue-panel.register-mode { left: 0%; }

        .blue-panel h2 { font-size: 2.2rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.03em; }
        .blue-panel p  { font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,0.8); max-width: 340px; }

        /* ── form panel ── */
        .form-area {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5%;
          transition: margin-left 0.55s cubic-bezier(0.77, 0, 0.175, 1);
          will-change: margin-left;
          position: relative;
          z-index: 5;
          min-height: 100vh;
        }
        .form-area.login-mode   { margin-left: 0%; }
        .form-area.register-mode { margin-left: 50%; }

        /* panel fade/slide content */
        .panel-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 12%;
          transition: opacity 0.3s, transform 0.3s;
        }
        .panel-content.hidden {
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px);
        }
        .panel-content.visible {
          opacity: 1;
          pointer-events: all;
          transform: translateY(0);
        }

        /* ── logo ── */
        .logo {
          font-size: 2.4rem;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: -0.04em;
          margin-bottom: 2rem;
        }

        /* ── form heading ── */
        .form-heading {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.8rem;
          letter-spacing: -0.02em;
        }

        /* ── inputs ── */
        .field { margin-bottom: 1.1rem; }
        .field label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.35rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .field input {
          width: 100%;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.7rem 1rem;
          font-size: 0.9rem;
          font-family: inherit;
          color: #0f172a;
          background: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          outline: none;
        }
        .field input:focus {
          border-color: #2563eb;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }

        /* ── remember me ── */
        .remember {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.3rem;
        }
        .remember input { width: 16px; height: 16px; accent-color: #2563eb; }
        .remember label { font-size: 0.85rem; color: #64748b; }

        /* ── submit button ── */
        .submit-btn {
          width: 100%;
          background: #2563eb;
          color: #fff;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.8rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) {
          background: #1d4ed8;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
          transform: translateY(-1px);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* ── switch link ── */
        .switch-link {
          margin-top: 1.4rem;
          text-align: center;
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .switch-link button {
          background: none;
          border: none;
          color: #2563eb;
          font-weight: 600;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          padding: 0;
        }
        .switch-link button:hover { color: #1d4ed8; }

        /* ── responsive ── */
        @media (max-width: 768px) {
          .blue-panel { display: none; }
          .form-area { width: 100%; margin-left: 0 !important; }
          .panel-content.hidden { opacity: 0; pointer-events: none; }
          .panel-content.visible { opacity: 1; pointer-events: all; }
        }
      `}</style>

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