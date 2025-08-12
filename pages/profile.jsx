import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Portrait, Settings } from "@mui/icons-material";

export default function Profile() {
  const [form, setForm] = useState({
    usename: "",
    email: "",
    number: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setForm(data.data);
          console.log(data);
        } else {
          setError("خطا در بارگذاری دارایی‌ها");
        }
      } catch (err) {
        setError("خطا در برقراری ارتباط با سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    // ارسال اطلاعات به API
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      // هدایت به صفحه اصلی در صورت موفقیت
      router.push("/settings");
    } else {
      console.error("Error in adding asset");
    }
  };
  return (
    <div className="flex flex-col space-y-5 !h-[calc(100vh-2rem)] bg-slate-200/50">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">پروفایل</span>
        <div>
          <Portrait className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mx-8">
        <input
          name="username"
          placeholder="نام‌کاربری "
          type="text"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded-lg"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="ایمیل "
          type="email"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded-lg"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="number"
          placeholder="شماره تماس "
          type="text"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded-lg"
          value={form.number}
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="رمز عبور "
          type="password"
          className="w-full border border-[#e3b34a] bg-slate-50 boxShadow p-2 rounded-lg"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#234350] text-white px-4 py-2 boxShadow hover:shadow-2xl rounded-lg cursor-pointer hover:bg-blue-700"
        >
          ذخیره
        </button>
      </form>
    </div>
  );
}
