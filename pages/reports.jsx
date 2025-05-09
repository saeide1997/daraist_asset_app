import { Assessment } from "@mui/icons-material";
import InflationAssetChart from '../components/clcAssetChange';
import ForecastAssetChart from '../components/forecastAssetChart';

export default function Reports() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#234350] h-24 text-white flex justify-center items-center rounded-b-4xl">
        <span className="text-3xl mx-2">لیست دارایی‌ها</span>
        <div>
          <Assessment className="!text-5xl text-[#e3b34a]" />
        </div>
      </div>
        <div>
            <InflationAssetChart/>
            <ForecastAssetChart/>
        </div>
        
        {/* Footer/Menu Section */}
      <div className="h-[90px]">
        
        </div>
    </div>
  );
}
