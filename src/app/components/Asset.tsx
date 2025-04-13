interface AssetProps {
    amount:  any;
    assType: any;
    amountType: any;
    asset: any;
  }
  
  const Asset: React.FC<AssetProps> = ({ amount, assType, amountType, asset }) => {
    return (

        <div className="h-24 px-4 boxShadow rounded-2xl bg-white mx-4 text-[#234350] flex flex-col justify-center items-start ">
          <div className="flex w-full mb-3">
            <div className="w-2/5 text-2xl font-bold">{amount}</div>
            <div className="w-3/5 text-2xl font-bold">{assType}</div>
          </div>
          <div className="flex w-full">
            <div className="w-2/5 ">{amountType}</div>
            <div className="w-3/5">= {asset}</div>
          </div>
        </div>

    );
  }
  
  export default Asset;