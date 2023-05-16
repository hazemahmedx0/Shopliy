import React from 'react'
import { Avatar, Badge, Card, Paper, Text } from '@mantine/core'

const users = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Bob Smith',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?img=4',
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
        padding="sm"
        radius="md"
        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
      >
        <Avatar src={user.avatar} alt={user.name} radius="md" size="sm" />
        <div style={{ marginLeft: '10px', flexGrow: 1 }}>
          <Text>{user.name}</Text>
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
