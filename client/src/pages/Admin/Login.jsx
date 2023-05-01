import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
const AdminLogin = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <Box className=" mt-20 mb-20" maw={400} mx="auto">
      <h1 className=" text-3xl font-medium text-gray-600 mb-8">Admin Login</h1>

      <form
        className="mb-6"
        onSubmit={form.onSubmit((values) => console.log(values))}
      >
        <TextInput
          className="flex flex-col w-full items-start mb-4"
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          className="flex flex-col w-full items-start"
          withAsterisk
          label="Password"
          placeholder="Type your password"
          {...form.getInputProps('password')}
        />

        <Group position="right" mt="md">
          <Button className="w-full mt-4" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default AdminLogin
