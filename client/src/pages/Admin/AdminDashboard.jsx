import {
  ProfileCircle,
  Svg3DSelectFace,
  Dollar,
  SimpleCart,
} from 'iconoir-react'
import { useEffect, useState } from 'react'
import orderApi from '../../api/orderApi'
import authAPI from '../../api/AuthAPI'
import productApi from '../../api/productApi'

const AdminDashboard = () => {
  const [orders, setorders] = useState([])
  const [ordersNo, setordersNo] = useState(0)
  const [totSales, settotSales] = useState(0)

  const [customers, setcustomers] = useState(0)
  const [products, setproducts] = useState(0)

  const getOrders = async () => {
    try {
      const res = await orderApi.getAllOrders()
      setorders(res.orders)

      setordersNo(res.ordersNo)

      // Calculate total sales
    } catch (error) {
      console.log(error)
    }
  }

  const getCustomers = async () => {
    try {
      const res = await authAPI.allUsers()
      setcustomers(res.length)
    } catch (error) {
      console.log(error)
    }
  }

  const getProducts = async () => {
    try {
      const res = await productApi.getAllProducts()
      setproducts(res.productsNo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrders()
    getCustomers()
    getProducts()
  }, [])

  useEffect(() => {
    let totalSales = 0

    for (let i = 0; i < orders.length; i++) {
      totalSales += orders[i].totalCost
    }

    // Update state
    settotSales(totalSales)
  }, [orders])

  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8">
      <div className=" w-full text-slg text-neutral-600 font-medium mb-12">
        <h1 className="text-left">Overview</h1>
      </div>
      <div className="  w-full grid grid-cols-4 gap-4 ">
        {/* ---------1---------- */}
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
          <p className="text-left font-semibold text-4xl text-[#054F31]">
            ${totSales ? totSales.toFixed(2) : 0}
          </p>
        </div>

        {/* ---------2---------- */}

        <div className="flex flex-col bg-white  p-6  gap-5  card-grad">
          <span className=" flex flex-row items-center gap-2">
            <SimpleCart
              color="#15BE53"
              strokeWidth={2}
              height={32}
              width={32}
              className=" rounded-lg bg-[#ECFDF3] p-1 "
            />
            <p className="text-left font-medium text-lg text-[#027A48]">
              Total Orders
            </p>
          </span>
          <p className="text-left font-semibold text-4xl text-[#054F31]">
            {ordersNo ? ordersNo : 0}
          </p>
        </div>

        {/* ---------3---------- */}

        <div className="flex flex-col bg-white  p-6  gap-5  card-grad">
          <span className=" flex flex-row items-center gap-2">
            <ProfileCircle
              color="#15BE53"
              strokeWidth={2}
              height={32}
              width={32}
              className=" rounded-lg bg-[#ECFDF3] p-1 "
            />
            <p className="text-left font-medium text-lg text-[#027A48]">
              Total Customers
            </p>
          </span>
          <p className="text-left font-semibold text-4xl text-[#054F31]">
            {customers ? customers : 0}
          </p>
        </div>

        {/* ---------4---------- */}

        <div className="flex flex-col bg-white  p-6  gap-5  card-grad">
          <span className=" flex flex-row items-center gap-2">
            <Svg3DSelectFace
              color="#15BE53"
              strokeWidth={2}
              height={32}
              width={32}
              className=" rounded-lg bg-[#ECFDF3] p-1 "
            />
            <p className="text-left font-medium text-lg text-[#027A48]">
              Total Products
            </p>
          </span>
          <p className="text-left font-semibold text-4xl text-[#054F31]">
            {products ? products : 0}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
