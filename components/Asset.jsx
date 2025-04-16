const Asset = ({ amount, assType, amountType, asset }) => {
    return (
      <div className="h-24 px-4 boxShadow rounded-2xl bg-white mx-4 text-[#234350] flex flex-col justify-center items-start ">
        <div className="flex w-full mb-3">
          <div className="w-1/5 text-2xl font-bold">{assType}</div>
          <div className="w-4/5 text-2xl font-bold">{amount}</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/5 ">{amountType}</div>
          <div className="w-4/5">= {asset}</div>
        </div>
      </div>
    );
  }
  
  export default Asset;
  