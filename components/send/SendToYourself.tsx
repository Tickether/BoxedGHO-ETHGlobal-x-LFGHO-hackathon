import React from "react";
import ChainSelectMenu from "../boxComps/ChainSelectorMenu";
const SendToYourself = () => {
  return (
    <main className="w-[60%] h-full items-start mt-4   text-white flex justify-around">
      <div className="bg-slate-900 w-[60%] flex h-fit flex-col pt-10  shadow-sm shadow-blue-500   items-center  rounded-2xl">
        <div className="p-3 text border-b-[1px] w-full text-2xl border-gray-300">
          Convert GHO
        </div>
        <div className="p-3 m-3  w-full h-[60%] ">
          {/* Input GHO Part */}
          <div className="flex items-center border-b-[1px] pb-5 gap-2 p-1 h-[50%]">
            <span className="text-sm"> Enter GHO Amount</span>
            <input
              className="bg-slate-800 border-none w-[50%] p-2 h-11"
              placeholder="0"
            />
            <button className="border-[1px] h-11 w-[20%] rounded-lg hover:bg-slate-500 px-3">
              Max
            </button>
            <span className="flex border-[1px] h-11 justify-center rounded-lg items-center w-[30%]">
              0.0/GHO
            </span>
          </div>

          {/* Coin and  Chain Selection  */}
          <div className="w-full h-[50%] border-b-[1px]  items-center py-8 gap-5 justify-center flex">
            {/* Respons / How Much you get */}
            <div className=" w-full   flex flex-col justify-center items-center px-3">
              <span className="flex justify-start w-full">Receving amount</span>
              <span className="bg-slate-800 w-full flex items-center px-4 h-11">
                0
              </span>
            </div>
            <div className="flex flex-col w-[50%]">
              <span>Select Token</span>
              <select className="bg-slate-800 text-center h-11" id="mySelectId">
                <option value="option1">Eth</option>
                <option value="option2">Matic</option>
                <option value="option3">USDC</option>
              </select>
            </div>
            <div className="flex flex-col w-[50%]">
              <span>Select Chain</span>
              <select className="bg-slate-800 text-center h-11" id="mySelectId">
                <option value="option1">Ethereum</option>
                <option value="option2">Polygon</option>
                <option value="option3">Optimisum</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full my-5 pr-5  flex justify-end">
          <button className="border-2 flex  justify-center p-3 rounded-2xl hover:bg-green-500 hover:text-black border-solid font-semibold text-l border-white">
            Confirm Transaction
          </button>
        </div>

        <div className="flex items-end w-[95%] justify-center mb-2 h-full">
          {/* progress bar  */}
          <div className="w-full bg-gray-200 rounded-full  h-2.5 ">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "45%" }}
            />
          </div>
        </div>
      </div>

      {/* Transaction Status Card */}
      <div className="bg-slate-900 h-[60%]  flex flex-col justify-center items-center  rounded-2xl shadow-sm shadow-blue-500  w-[35%]">
        <div className="p-4 mt-4">
          <h1 className="text-2xl text-center font-semibold mb-6">
            Transaction Status
          </h1>
          <div className="container">
            <div className="flex flex-col  grid-cols-12 text-gray-50">
              <div className="flex ">
                <div className="col-start-2 col-end-4   relative">
                  <div className="h-full w-3 flex items-center justify-center">
                    <div className="h-full w-[2px] bg-green-500 pointer-events-none" />
                  </div>
                  <div className="w-3 h-3  absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                    <i className="fas fa-check-circle text-white" />
                  </div>
                </div>
                <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md mx-3">
                  <h3 className="font-semibold text-m mb-1">proccessing</h3>
                </div>
              </div>
              <div className="flex ">
                <div className="col-start-2 col-end-4   relative">
                  <div className="h-full w-3 flex items-center justify-center">
                    <div className="h-full w-[2px] bg-green-500 pointer-events-none" />
                  </div>
                  <div className="w-3 h-3 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                    <i className="fas fa-check-circle text-white" />
                  </div>
                </div>
                <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md mx-3">
                  <h3 className="font-semibold text-m mb-1">Executed</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SendToYourself;
