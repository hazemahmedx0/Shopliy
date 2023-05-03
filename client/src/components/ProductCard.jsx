import { SimpleCart } from 'iconoir-react'
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
} from '@mantine/core'

import { notifications } from '@mantine/notifications'

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

const ProductCard = (props) => {
  const { classes, theme } = useStyles()

  return (
    <Card
      //   withBorder
      //   className=" bg-black !border !border-yellow-400"
      radius="md"
      p="md"
      className={
        classes.card +
        ` transition-all  !border !rounded-[20px] hover:shadow-sm  border-[#F2F4F7] hover:border-green-200`
      }
    >
      <Card.Section>
        <Image src={props.image} alt={props.title} height={240} />
      </Card.Section>

      <Card.Section className="px-4" mt="md">
        <Group className="flex flex-col items-start gap-0" position="apart">
          <Text className="text-sm text-gray-400">{props.category}</Text>
          <Text className=" trimTextCard text-lg font-semibold text-left text-[#344054]">
            {props.title}
          </Text>
          {/* <Badge size="sm">{props.title}</Badge> */}
        </Group>
      </Card.Section>

      <Card.Section className="px-4 flex flex-row items-center justify-between mt-6 pb-3">
        <Text className="text-left text-3xl text-[#1D2939] font-semibold  ">
          ${props.price}
        </Text>
        <ActionIcon
          className=" transition-all w-9 h-9 bg-green-100  hover:bg-green-50"
          variant="light"
          onClick={() =>
            notifications.show({
              title: `${props.title} added to cart`,
              message: 'You can review it in the cart section',
            })
          }
        >
          <SimpleCart color="#15BE53" strokeWidth={2} height={20} width={20} />
        </ActionIcon>
      </Card.Section>

      {/* <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
      </Group> */}
    </Card>
  )
}

export default ProductCard
