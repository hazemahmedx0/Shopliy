import { useState } from 'react'
import { createStyles, Table, ScrollArea, rem } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'static',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

function TableScrollArea() {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  const data = [
    {
      id: 1,
      products: [123, 456, 789],
      date: '2022-05-09',
      price: 49.99,
      status: 'Shipped',
    },
    {
      id: 2,
      products: [234, 567, 890],
      date: '2022-05-08',
      price: 99.99,
      status: 'Delivered',
    },
    {
      id: 3,
      products: [345, 678, 901],
      date: '2022-05-07',
      price: 149.99,
      status: 'Pending',
    },
  ]
  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.products}</td>
      <td>{row.date}</td>
      <td>{row.price}</td>
      <td>{row.status}</td>
    </tr>
  ))

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Order ID</th>
            <th>Products No.</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}

export default TableScrollArea
