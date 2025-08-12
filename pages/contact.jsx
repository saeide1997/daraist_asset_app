import { ContactPhone } from "@mui/icons-material";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("در حال ارسال...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("پیام با موفقیت ارسال شد.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("ارسال پیام با خطا مواجه شد.");
      }
    } catch (error) {
      setStatus("خطا در ارتباط با سرور.");
    }
  };

  return (
    <div className="!h-[calc(100vh-24rem)] ">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">تماس با ما</span>
        <div>
          <ContactPhone className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 p-4 ">
        <input
          type="text"
          name="name"
          placeholder="نام (اختیاری)"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-white border-[#234350] boxShadow p-2 border rounded-xl"
        />
        <input
          type="email"
          name="email"
          placeholder="ایمیل شما"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full bg-white border-[#234350] boxShadow p-2 border rounded-xl"
        />
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-white border-[#234350] boxShadow p-2 border rounded-xl"
        >
          <option value="">موضوع پیام</option>
          <option value="پیشنهاد">پیشنهاد</option>
          <option value="مشکل">مشکل</option>
          <option value="سوال">سوال</option>
          <option value="سایر">سایر</option>
        </select>
        <textarea
          name="message"
          placeholder="متن پیام"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-white border-[#234350] boxShadow p-2 border rounded-xl"
        />
        <button
          type="submit"
          className="w-full p-2 bg-[#234350] boxShadow text-white rounded-xl"
        >
          ارسال پیام
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
