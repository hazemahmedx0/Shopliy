import React from 'react'
import { Avatar, Badge, Card, Paper, Text } from '@mantine/core'

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'offline',
  },
  {
    id: 3,
    name: 'Bob Smith',
    email: 'bobsmith@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'away',
  },
  {
    id: 4,
    name: 'Alice Johnson',
    email: 'alicejohnson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'online',
  },
]

const RecentUsersList = () => {
  const renderBadge = (status) => {
    return <Badge color={status === 'online' ? 'teal' : 'gray'}>{status}</Badge>
  }

  const renderListItem = (user) => {
    return (
      <Paper
        key={user.id}
        shadow="sm"
        padding="sm"
        radius="md"
        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
      >
        <Avatar src={user.avatar} alt={user.name} radius="md" size="sm" />
        <div style={{ marginLeft: '10px', flexGrow: 1 }}>
          <Text>{user.name}</Text>
          <Text size="xs" color="gray">
            {user.email}
          </Text>
        </div>
        {renderBadge(user.status)}
      </Paper>
    )
  }

  return <div>{users.map((user) => renderListItem(user))}</div>
}

const RecentUsersCard = () => {
  return (
    <Card shadow="sm" radius="md" padding="xl">
      <h2>Recent Users</h2>
      <RecentUsersList />
    </Card>
  )
}

export default RecentUsersCard
