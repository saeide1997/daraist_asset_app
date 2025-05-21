import { AppBlocking } from "@mui/icons-material";

export default function AppVersionPage() {
  const version = "1.0.0"; // این مقدار رو هر بار که نسخه جدید منتشر می‌کنی آپدیت کن

  return (
    <div className=" !h-[calc(100vh-90px)] ">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">نسخه فعال برنامه</span>
        <div>
          <AppBlocking className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>
    <div className="p-4">
      <div className="text-lg text-gray-700 mb-4">
        اپلیکیشن <span className="font-semibold text-black">دارائیست</span>{" "}
        هم‌اکنون در نسخه زیر اجرا می‌شود:
      </div>

      <div className="text-3xl font-mono text-green-600">{version}</div>

      <p className="mt-6 text-sm text-gray-500">
        برای دریافت آخرین امکانات و رفع مشکلات، لطفاً اپ را به‌روز نگه دارید.
      </p>
      </div>
    </div>
  );
}
