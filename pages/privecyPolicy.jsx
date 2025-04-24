import { PrivacyTipRounded } from "@mui/icons-material";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">حریم خصوصی</span>
        <div>
          <PrivacyTipRounded className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow p-4 overflow-y-auto">
        <p className="mb-4">
          اپلیکیشن <strong>دارائیست</strong> متعهد به حفظ حریم خصوصی کاربران خود
          است. این سند، نحوه جمع‌آوری، استفاده و محافظت از اطلاعات شخصی شما را
          توضیح می‌دهد.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          ۱. اطلاعات جمع‌آوری‌شده
        </h2>
        <p className="mb-4">
          هنگام ثبت‌نام، ورود یا استفاده از اپ، اطلاعاتی مانند نام کاربری،
          دارایی‌ها و ایمیل (در صورت نیاز) از شما دریافت می‌شود. این اطلاعات
          صرفاً برای ارائه خدمات بهتر به شما ذخیره می‌شود.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          ۲. استفاده از اطلاعات
        </h2>
        <p className="mb-4">
          داده‌های شما برای محاسبه دارایی‌ها، نمایش نمودارها و ارائه تجربه
          شخصی‌سازی‌شده استفاده می‌شود. اطلاعات شما به هیچ وجه با شخص یا سازمانی
          به اشتراک گذاشته نخواهد شد.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">۳. امنیت اطلاعات</h2>
        <p className="mb-4">
          ما از استانداردهای امنیتی روز برای حفاظت از داده‌های کاربران استفاده
          می‌کنیم. رمزگذاری، احراز هویت و ذخیره امن اطلاعات از جمله این موارد
          هستند.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">۴. حقوق کاربر</h2>
        <p className="mb-4">
          شما در هر زمان می‌توانید حساب کاربری خود را حذف کنید و یا اطلاعات
          ثبت‌شده را ویرایش نمایید. همچنین در صورت نیاز به حذف کامل داده‌ها، با
          ما تماس بگیرید.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">۵. تماس با ما</h2>
        <p>
          در صورت هرگونه سؤال یا درخواست مرتبط با حریم خصوصی، لطفاً از طریق تب{" "}
          <a href="/contact" className="text-blue-600 underline">
            تماس با ما
          </a>{" "}
          اقدام کنید.
        </p>

        <p className="mt-6 text-sm text-gray-500 text-center">
          آخرین به‌روزرسانی: فروردین ۱۴۰۴
        </p>
      </div>

      {/* Footer/Menu Section */}
      <div className="h-[90px]">
        
      </div>
    </div>
  );
}
