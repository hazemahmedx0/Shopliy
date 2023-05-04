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
  rem,
} from '@mantine/core'

import { Trash } from 'iconoir-react'

const CartProduct = (props) => {
  const item = props.item
  const handlers = useRef()
  const [value, setValue] = useState(0)
  const [total, setTotal] = useState(`${(+item.price * +value).toFixed(2)}`)

  useEffect(() => {
    setTotal(`${(+item.price * +value).toFixed(2)}`)
  }, [value])

  return (
    <>
      <tr key={item.name}>
        <td>
          <Group
            spacing="sm"
            className="flex  flex-row content-start items-start"
          >
            <Avatar size={100} src={item.avatar} radius={10} />
            <Group className="flex flex-col gap-0 items-start justify-between ">
              <div>
                <Text className="text-left" fz="sm" fw={400} color="#98A2B3">
                  {item.name}
                </Text>
                <Text fz="md" fw={500}>
                  {item.name}
                </Text>
              </div>
              <Text fz="md" fw={500}>
                ${item.price}
              </Text>
            </Group>
          </Group>
        </td>

        <td>
          <Group spacing={0}>
            <ActionIcon
              size={36}
              radius={0}
              className="  rounded-tl-lg rounded-bl-lg"
              variant="default"
              onClick={() => handlers.current.decrement()}
              //   onClick={(e) => handleDecrement(e)}
            >
              –
            </ActionIcon>

            <NumberInput
              hideControls
              value={value}
              onChange={(val) => setValue(val)}
              handlersRef={handlers}
              max={5}
              min={0}
              step={1}
              radius="0"
              styles={{ input: { width: rem(54), textAlign: 'center' } }}
            />

            <ActionIcon
              size={36}
              radius={0}
              className="  rounded-tr-lg rounded-br-lg"
              variant="default"
              onClick={() => handlers.current.increment()}
              //   onClick={(e) => handleIncrement(e)}
            >
              +
            </ActionIcon>
          </Group>
        </td>

        <td>
          <Text className="text-left" fz="sm" c="dimmed">
            {`$${total}`}
          </Text>
        </td>

        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <Trash />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    </>
  )
}

export default CartProduct
