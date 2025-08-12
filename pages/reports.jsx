import { Assessment } from "@mui/icons-material";
import InflationAssetChart from "../components/clcAssetChange";
import ForecastAssetChart from "../components/forecastAssetChart";

export default function Reports() {
  return (
    <div className="min-h-screen flex flex-col space-y-6">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2"> نمودارها</span>
        <div>
          <Assessment className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>
      <div className="w-screen bg-[#e3b34aad] rounded-xl flex flex-col space-y-4 shadow-md p-4 text-right">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
          📊 تغییرات ارزش واقعی دارایی‌ها با در نظر گرفتن تورم
        </h2>
        <p className="text-gray-600  text-sm">
          این نمودار نشان می‌دهد که با در نظر گرفتن تورم، ارزش واقعی دارایی‌های
          شما در طول زمان چگونه تغییر کرده است.
        </p>
      <div className="bg-white  rounded-2xl shadow-lg p-4">
        <InflationAssetChart />
      </div>
      </div>

      {/* Chart Cards */}

      <div className="w-screen bg-[#e3b34aad] rounded-xl flex flex-col space-y-4 shadow-md p-4 text-right">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
          📈 تحلیل تاریخی و پیش‌بینی آینده دارایی با در نظر گرفتن تورم
        </h2>
        <p className="text-gray-600 text-sm">
          این نمودار ترکیبی، روند تغییرات دارایی اسمی و واقعی شما را همراه با
          نرخ تورم نمایش می‌دهد و ۶ ماه آینده را نیز بر اساس میانگین تورم
          پیش‌بینی می‌کند.
        </p>
      <div className="bg-white  rounded-2xl shadow-lg p-4">
        <ForecastAssetChart />
      </div>
      </div>


      {/* Footer/Menu Section */}
      <div className="h-[90px]"></div>
    </div>
  );
}
