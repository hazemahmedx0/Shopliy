import React, { useEffect, useRef, useState } from 'react'
import {
  Breadcrumbs,
  Anchor,
  Container,
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  NumberInput,
  // NumberInputHandlers,
  Switch,
  Button,
  rem,
} from '@mantine/core'

import { Trash } from 'iconoir-react'
import cartApi from '../../../api/cartApi'
import { useCart } from '../../../context/cartctx'

const ProductCardAdmin = (props) => {
  const { item } = props
  const [inStock, setinStock] = useState(item.availability)
  console.log(inStock)
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
            />
          </Group>
        </td>

        <td>
          <Group className="text-lg" spacing={0} position="left">
            <p>${item.price}</p>
          </Group>
        </td>

        <td>
          <Group className="text-lg" spacing={0} position="left">
            <p>${item.price}</p>
          </Group>
        </td>

        <td>
          <Group spacing={0} position="left">
            <Button variant="default" radius="md" size="sm" className="mr-4">
              Edit
            </Button>
            <Trash
              strokeWidth={2}
              width={42}
              height={42}
              color="#F87171"
              className=" rounded-lg bg-red-100 p-2"
            />
          </Group>
        </td>
      </tr>
    </>
  )
}

export default ProductCardAdmin
