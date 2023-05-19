import { useState } from 'react'
import { Avatar, Group, Text, Switch, Button } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { Trash } from 'iconoir-react'
import productApi from '../../../api/productApi'

const ProductCardAdmin = (props) => {
  const navigate = useNavigate()
  const { item } = props
  const [inStock, setinStock] = useState(item.availability)

  const ChangeAvailability = async () => {
    try {
      const res = await productApi.availabilityChange(item._id, {
        availability: !inStock,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAProduct = async () => {
    try {
      const res = await productApi.deleteProduct(item._id)
      props.deleteProductById(item._id)
      navigate('/admin/products')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <tr key={item._id}>
        <td>
          <Group
            spacing="sm"
            className="flex  flex-row content-start items-start"
          >
            <Avatar size={100} src={item?.image[0]} radius={10} />
            <Group className="flex flex-col gap-0 items-start justify-between ">
              <div>
                <Text className="text-left" fz="sm" fw={400} color="#98A2B3">
                  {item?.brand}
                </Text>
                <Text className="trimTextCart text-left" fz="md" fw={500}>
                  {item?.name}
                </Text>
              </div>
              <Text fz="sm" className=" text-gray-400" fw={400}>
                {item?._id}
              </Text>
            </Group>
          </Group>
        </td>

        <td>
          <Group spacing={0} position="left">
            <Switch
              checked={inStock}
              onChange={(event) => setinStock(event.currentTarget.checked)}
              onClick={ChangeAvailability}
            />
          </Group>
        </td>

        <td>
          <Group className="text-lg text-left" spacing={0} position="left">
            <p>{item?.categoryId?.name}</p>
          </Group>
        </td>

        <td>
          <Group className="text-lg" spacing={0} position="left">
            <p>${item?.price}</p>
          </Group>
        </td>

        <td>
          <Group spacing={0} position="left">
            <Link to={`/admin/products/${item?._id}`}>
              <Button variant="default" radius="md" size="sm" className="mr-4">
                Edit
              </Button>
            </Link>
            <Trash
              strokeWidth={2}
              width={42}
              height={42}
              color="#F87171"
              className=" rounded-lg bg-red-100 p-2 cursor-pointer"
              onClick={deleteAProduct}
            />
          </Group>
        </td>
      </tr>
    </>
  )
}

export default ProductCardAdmin
