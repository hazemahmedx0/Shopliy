import { Link } from 'react-router-dom'
import { fullLogo } from '../../assets'
// Icons
import { Facebook, Twitter, GitHub, LinkedIn } from 'iconoir-react'

const Footer = () => {
  return (
    <div className=" flex flex-col gap-8 items-center py-14 w-full footerGrad">
      <div className="flex flex-row gap-4">
        <Link className=" text-[#98A2B3] text-sm">Home</Link>
        <Link className=" text-[#98A2B3] text-sm">Categories</Link>
        <Link className=" text-[#98A2B3] text-sm">Top Deals</Link>
        <Link className=" text-[#98A2B3] text-sm">Offers</Link>
      </div>
      <img src={fullLogo} alt="logo" className="" />
      <div className="flex flex-row gap-4">
        <Link to="" className="footericon ">
          <Facebook />
        </Link>
        <Link to="" className="footericon ">
          <Twitter />
        </Link>
        <Link to="" className="footericon">
          <GitHub />
        </Link>
        <Link to="" className="footericon ">
          <LinkedIn />
        </Link>
      </div>
    </div>
  )
}

export default Footer
