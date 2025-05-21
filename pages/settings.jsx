import Link from "next/link";
import { Settings } from "@mui/icons-material";

export default function SettingsPage() {
  return (
    <div className=" !h-[calc(100vh-90px)] bg-slate-200/50">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">تنظیمات</span>
        <div>
          <Settings className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>
      <div className="grid gap-6 p-4 ">
        <Link className="text-[#234350] text-xl boxShadow bg-white px-4 py-3 font-bold rounded-2xl border border-[#e3b34a]" href={"/profile"}>
          <span>پروفایل</span>
        </Link>
        <Link className="text-[#234350] text-xl boxShadow bg-white px-4 py-3 font-bold rounded-2xl border border-[#e3b34a]" href={"/profile"}>
          <span>ظاهر</span>
        </Link>
        <Link className="text-[#234350] text-xl boxShadow bg-white px-4 py-3 font-bold rounded-2xl border border-[#e3b34a]" href={"/profile"}>
          <span> پیشرفته</span>
        </Link>
        <Link className="text-[#234350] text-xl boxShadow bg-white px-4 py-3 font-bold rounded-2xl border border-[#e3b34a]" href={"/aboute"}>
          <span> درباره دارايیست</span>
        </Link>
      </div>
    </div>
  );
}
