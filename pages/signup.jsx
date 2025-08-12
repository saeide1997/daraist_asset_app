"use client";

import { useState } from "react";

export default function LoginSignUpPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

    //   if (!res.ok) throw new Error("نام کاربری یا رمز اشتباه است");

      // بعد از ورود موفق، برو به داشبورد
    //   window.location.href = "/"; 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="!h-screen flex items-center justify-center bg-[#e3b34a] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold text-center mb-6 text-[#234350]">
          دارییست
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mx-2 my-1">نام کاربری</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full boxShadow px-3 py-2 border border-[#234350] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium  mx-2 my-1">رمز عبور</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 boxShadow py-2 border border-[#234350] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium  mx-2 my-1">شماره همراه </label>
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            className="w-full px-3 boxShadow py-2 border border-[#234350] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium  mx-2 my-1">شماره همراه </label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 boxShadow py-2 border border-[#234350] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#234350] cursor-pointer boxShadow hover:shadow-lg text-white py-2 rounded-xl hover:bg-[#e3b34a] transition"
        >
          {loading ? "در حال ثبتنام..." : "ثبتنام"}
        </button>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">حساب کاربری دارید؟ </span>
          <a href="/login" className="text-[#234350] font-semibold hover:underline">
            ورود
          </a>
        </div>
      </form>
    </div>
  );
}
