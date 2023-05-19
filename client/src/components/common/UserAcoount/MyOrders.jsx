import React, { useEffect, useState } from 'react'
import orderApi from '../../../api/orderApi'
import { Svg3DSelectFace } from 'iconoir-react'
const MyOrders = () => {
  const [ordersNumbers, setordersNumbers] = useState(0)
  const [Orders, setOrders] = useState([])
  useEffect(() => {
    const geyMyOrders = async () => {
      try {
        const res = await orderApi.getMyOrders()
        setordersNumbers(res.ordersNo)
        setOrders(res.orders)
      } catch (err) {
        console.log(err)
      }
    }
    geyMyOrders()
  }, [])
  const x = {
    shippingAddress: {
      street: 'dsds',
      city: 'dsds',
      state: 'dsds',
      zip: 'dsds',
      country: 'z',
    },
    _id: '6462f31f346f2b06f6d6202d',
    userId: '6462e42d346f2b06f6d618cd',
    items: [
      {
        productId: '6462c6d0346f2b06f6d616af',
        quantity: 4,
        price: 79,
        totalPrice: 316,
        _id: '6462ece7346f2b06f6d61f07',
      },
      {
        productId: '6462c8e1346f2b06f6d616bb',
        quantity: 3,
        price: 84.99,
        totalPrice: 254.96999999999997,
        _id: '6462ed03346f2b06f6d61f78',
      },
    ],
    subTotal: 570.97,
    shippingCost: 21,
    totalCost: 591.97,
    createdAt: '2023-05-15T23:51:13.454Z',
    __v: 0,
  }
  return (
    <div className=" w-full pl-12 font-medium mt-14 pb-4">
      <div className=" w-full flex flex-row text-sm items-center text-neutral-600 font-medium mb-12">
        <h1 className="text-left">My orders </h1>
        <h1 className=" ml-4 bg-slate-100 p-2 rounded-md text-left text-gray-500">
          {ordersNumbers}{' '}
        </h1>
      </div>
      {Orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col w-full border px-3 py-3 rounded-2xl mt-5"
        >
          <div className=" flex flex-row justify-between">
            <div>
              <span className="flex flex-row gap-2">
                {/* <Svg3DSelectFace color="#758193" /> */}
                <p className="text-truncate text-gray-500">
                  Order No. {order._id}
                </p>
              </span>
              <p className="text-left text-gray-600">
                Items No. {order.items.length}
              </p>
            </div>
            <span>
              <p className="text-right text-gray-500 ">Total</p>
              <p className="text-right">{order.totalCost?.toFixed(2)}</p>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyOrders
