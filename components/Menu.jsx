import { Add, Assessment, Home, HourglassEmpty, ReportOff, Settings } from "@mui/icons-material";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Link from "next/link";
export default function Menu() {
  return (
    <div className="rounded-t-4xl bg-white w-full h-[90px] fixed bottom-0 left-0 ">
      <div className="px-4 font-bold text-[#234350]  flex h-20 justify-between items-center">
      <Link href="/" className="flex flex-col items-center cursor-pointer ">
          <Home className="!text-3xl"/>
          <span>داشبورد</span>
        </Link>
        {/* <Link  href="/assets/newAsset" className="flex flex-col items-center cursor-pointer">
          <Add className="!text-3xl"/>
          <span>افزودن</span>
        </Link > */}
        <Link  href="/assets/list" className="flex flex-col items-center cursor-pointer">
          <EqualizerIcon className="!text-3xl"/>
          <span>دارایی‌ها</span>
        </Link>
        <Link  href="/reports" className="flex flex-col items-center cursor-pointer">
          <Assessment className="!text-3xl"/>
          <span>نمودارها</span>
        </Link>
        <Link  href="/predicts" className="flex flex-col items-center cursor-pointer">
          <HourglassEmpty className="!text-3xl"/>
          <span>پیشبینی‌</span>
        </Link>
        <Link  href="/settings" className="flex flex-col items-center cursor-pointer">
          <Settings className="!text-3xl"/>
          <span>تنظیمات</span>
        </Link>
      </div>
    </div>
  );
}