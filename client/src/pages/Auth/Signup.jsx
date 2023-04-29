import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
const SignUp = () => {
  const form = useForm({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      fname: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 8
          ? null
          : 'Password must be at least 8 characters long',
      termsOfService: (value) =>
        value === false && 'You must agree to the terms of service',
    },
  })

  return (
    <Box className=" mt-20 mb-20" maw={400} mx="auto">
      <h1 className=" text-3xl font-medium text-gray-600 mb-8">SignUp</h1>

      <form
        className="mb-6"
        onSubmit={form.onSubmit((values) => console.log(values))}
      >
        <span className="flex flex-row gap-4 mb-4">
          <TextInput
            className="flex flex-col w-full items-start"
            withAsterisk
            label="First Name"
            placeholder="John"
            {...form.getInputProps('fname')}
          />
          <TextInput
            className="flex flex-col w-full items-start"
            label="Last Name"
            placeholder="Smith"
            {...form.getInputProps('lname')}
          />
        </span>
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
          placeholder="Choose a strong password"
          {...form.getInputProps('password')}
        />

        <Checkbox
          className="pb-4"
          mt="md"
          label="I agree to the Terms & Privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </Group>
      </form>
      <span className=" text-gray-400 pt-3">
        Have an account?{' '}
        <Link to="/login" className="text-primary font-medium">
          Login
        </Link>
      </span>
    </Box>
  )
}

export default SignUp
