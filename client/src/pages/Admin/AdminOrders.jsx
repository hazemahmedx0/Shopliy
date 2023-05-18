import { useEffect, useState } from 'react'

import OrderCardAdmin from '../../components/common/AdminPanal/OrderCardAdmin'
import orderApi from '../../api/orderApi'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [ordersNo, setOrdersNo] = useState([])
  useEffect(() => {
    const getAdminOders = async () => {
      try {
        const res = await orderApi.getAllOrders()
        setOrders(res.orders)
        setOrdersNo(res.ordersNo)
      } catch (error) {
        console.log(error)
      }
    }
    getAdminOders()
  }, [])

  const deleteOrderbyId = (id) => {
    setOrders((prevorder) => prevorder.filter((order) => order._id !== id))
  }

  const rows = orders?.map((item) => (
    <OrderCardAdmin
      key={item._id}
      item={item}
      deleteOrderbyId={deleteOrderbyId}
    />
  ))

  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8 overflow-auto">
      <div className=" w-full text-slg text-neutral-600 font-medium mb-12 flex flex-row items-center">
        <h1 className="text-left">Orders </h1>{' '}
        <span className="text-lg bg-slate-300 ml-3 rounded-xl px-5 text-gray-800 p-2">
          {ordersNo ? ordersNo : 0}
        </span>
      </div>
      <div className="grow w-full mb-28">
        <div className="grid grid-row-1 gap-6 max-md:grid-cols-2 max-md:gap-3">
          {rows}
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
