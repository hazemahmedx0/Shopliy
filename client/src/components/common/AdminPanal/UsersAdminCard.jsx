import { Trash } from 'iconoir-react'
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  ActionIcon,
  createStyles,
  rem,
} from '@mantine/core'
import { modals } from '@mantine/modals'

import { notifications } from '@mantine/notifications'

import { useEffect, useState } from 'react'
import authAPI from '../../../api/AuthAPI'
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

const calculateDurationInDays = (createdAt) => {
  const now = new Date() // Current date and time
  const createdDate = new Date(createdAt) // Convert createdAt to a Date object

  // Calculate the difference in milliseconds
  const durationInMs = now.getTime() - createdDate.getTime()

  // Convert milliseconds to days
  const durationInDays = Math.floor(durationInMs / (1000 * 60 * 60 * 24))

  return durationInDays
}

const UsersAdminCard = (props) => {
  const { classes, theme } = useStyles()

  const [duration, setduration] = useState('')

  useEffect(() => {
    setduration(calculateDurationInDays(props.item.createdAt))
  }, [])

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete User ${props.item.name}`,
      centered: true,
      children: (
        <Text size="sm" className=" z-30">
          Are you sure you want to delete {props.item.name} ?
        </Text>
      ),
      labels: { confirm: 'Delete User', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log(''),
      onConfirm: () => deleteAUser(),
    })
  const deleteAUser = async () => {
    try {
      const res = await authAPI.deleteUser(props.item._id)
      props.deleteUserbyId(props.item._id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card
      radius="md"
      p="md"
      className={
        classes.card +
        ` transition-all flex flex-col !border !rounded-[20px] hover:shadow-sm  border-[#F2F4F7] hover:border-green-200`
      }
    >
      <Card.Section className="relative">
        <ActionIcon
          className=" addToWishListbtn transition-all w-9 h-9 bg-red-100  hover:bg-red-50"
          variant="light"
          onClick={openDeleteModal}
        >
          <Trash color="#F34141" strokeWidth={2} height={20} width={20} />
        </ActionIcon>
        {props.item.isAdmin ? (
          <Badge className=" absolute left-3 top-3  z-10" variant="light">
            {props.item.isAdmin ? 'Admin' : ''}
          </Badge>
        ) : (
          ''
        )}
        <span className=" text-sm text-gray-700 bg-gray-300 px-2 rounded-lg absolute right-3 bottom-3  z-10">
          {duration} days
        </span>
        <Image src={props.item.photo} alt={props.item.firstName} height={200} />
      </Card.Section>

      <Card.Section className="px-4 mb-auto" mt="md">
        <Group className="flex flex-col items-start gap-0" position="apart">
          <Text className="text-sm text-gray-400">{props.brand}</Text>
          <div className="flex flex-row items-center w-full">
            <Text className="grow trimTextCard text-lg font-semibold text-left text-[#344054]">
              {props.item.firstName} {props.item.lastName}
            </Text>
          </div>
          <Text className=" trimTextCard text-sm font-regular text-left text-gray-400">
            {props.item.email}
          </Text>
          <div className=" text-left mt-2 text-sm text-gray-400">
            <p className="text-gray-600">
              {props.item?.shippingAddress ? 'Address' : ''}
            </p>
            <p>{props.item?.shippingAddress?.street}</p>
            <p>
              {props.item?.shippingAddress?.city}{' '}
              {props.item?.shippingAddress?.zip}
            </p>
            <p>
              {props.item?.shippingAddress?.state}{' '}
              {props.item?.shippingAddress?.country}
            </p>
          </div>
        </Group>
      </Card.Section>

      <Card.Section className="px-4 flex flex-row items-center justify-between mt-6 pb-3"></Card.Section>
    </Card>
  )
}

export default UsersAdminCard
