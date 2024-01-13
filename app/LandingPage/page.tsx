import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { SplineViewer } from "@/components/Siplin";
const Page = () => {
  return (
    <div>
      <Navbar />
      <MiddlePart />
    </div>
  );
};

export default Page;

function MiddlePart() {
  return (
    <div className="text-white h-[80vh] flex justify-start items-center mx-10 ">
      <div className="max-w-[500px] flex flex-col mx-20 gap-5  ">
        <div className="text-6xl font-semibold"> Easy, Fast & Secure</div>
        <div>Convert , send Online Money Fast With BoxedGHO</div>
        <div>
          <Button
            variant="ghost"
            className="border-2 border-solid font-semibold text-xl border-white"
          >
            Lets Start
          </Button>
        </div>
      </div>
      <div className="">
        <SplineViewer
          url="https://prod.spline.design/SGE7D4mWJfb9Ax1T/scene.splinecode"
          eventsTarget="global"
        />
      </div>
    </div>
  );
}
