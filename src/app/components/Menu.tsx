import { Add, Home, Settings } from "@mui/icons-material";
import EqualizerIcon from '@mui/icons-material/Equalizer';
export default function Menu() {
  return (
    <div className="rounded-t-4xl bg-white w-full h-[90px] absolute bottom-0 ">
      <div className="px-4 font-bold text-[#234350]  flex h-20 justify-between items-center">
        <div className="flex flex-col items-center cursor-pointer ">
          <Home className="!text-3xl"/>
          <span>داشبورد</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <Add className="!text-3xl"/>
          <span>افزودن</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <EqualizerIcon className="!text-3xl"/>
          <span>گزارشات</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <Settings className="!text-3xl"/>
          <span>تنظیمات</span>
        </div>
      </div>
    </div>
  );
}
