import { Text, ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'

import { Trash } from 'iconoir-react'
import orderApi from '../../../api/orderApi'

const OrderCardAdmin = (props) => {
  const { item } = props

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete Order ${item._id}`,
      centered: true,
      children: (
        <Text size="sm" className=" z-30">
          Are you sure you want to delete {item._id} ?
        </Text>
      ),
      labels: { confirm: 'Delete Order', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log(''),
      onConfirm: () => deleteAUser(),
    })
  const deleteAUser = async () => {
    try {
      const res = await orderApi.deleteOrder(item._id)

      props.deleteOrderbyId(item._id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" flex flex-row border px-4 py-4 rounded-lg w-full justify-between ">
      <div className="flex flex-col text-left">
        <span>
          Order NO. <span className=" text-gray-600">{item._id}</span>
        </span>
        <span>
          {item?.userId?.firstName} {item?.userId?.lastName}
        </span>
        <span>{item?.userId?.email}</span>
        <div className=" text-left mt-2 text-sm text-gray-400">
          <p>{item?.shippingAddress?.street}</p>
          <p>
            {item?.shippingAddress?.city} {item?.shippingAddress?.zip}
          </p>
          <p>
            {item?.shippingAddress?.state} {item?.shippingAddress?.country}
          </p>
        </div>
      </div>

      <div className=" flex pl-auto flex-col text-right">
        <span>
          Sub Total : <span>${item.subTotal}</span>
        </span>
        <span>
          Shipping Cost : <span>${item.shippingCost}</span>
        </span>
        <span>
          Total : <span className=" text-lg">${item.totalCost}</span>
        </span>
        <span className="text-righ flex flex-col items-end mt-auto">
          <ActionIcon
            className="  transition-all w-9 h-9 bg-red-100  hover:bg-red-50"
            variant="light"
            onClick={openDeleteModal}
          >
            <Trash color="#F34141" strokeWidth={2} height={20} width={20} />
          </ActionIcon>
        </span>
      </div>
    </div>
  )
}

export default OrderCardAdmin
