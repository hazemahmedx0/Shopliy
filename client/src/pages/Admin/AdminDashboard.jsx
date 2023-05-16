import React from 'react'
import {
  Headset,
  ProfileCircle,
  PinAlt,
  Svg3DSelectFace,
  Dollar,
} from 'iconoir-react'

const AdminDashboard = () => {
  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8">
      <div className=" w-full text-slg text-neutral-600 font-medium mb-12">
        <h1 className="text-left">Overview</h1>
      </div>
      <div className="  w-full grid grid-cols-4 gap-4 ">
        <div className="flex flex-col bg-white  p-6  gap-5  card-grad">
          <span className=" flex flex-row items-center gap-2">
            <Dollar
              color="#15BE53"
              strokeWidth={2}
              height={32}
              width={32}
              className=" rounded-lg bg-[#ECFDF3] p-1 "
            />
            <p className="text-left font-medium text-lg text-[#027A48]">
              Total Sales
            </p>
          </span>
          <p className="text-left">$5,453</p>
        </div>
        <div>sp</div>
        <div>sp</div>
        <div>sp</div>
      </div>
    </div>
  )
}

export default AdminDashboard
