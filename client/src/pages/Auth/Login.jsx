import { useEffect, useState } from 'react'

import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Loader,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { useForm } from '@mantine/form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import authAPI from '../../api/AuthAPI'
import { useAuth } from '../../context/auth'
import { User } from 'iconoir-react'
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setloading] = useState(false)
  const [auth, setAuth] = useAuth()
  const [loginLoading, setLoginLoading] = useState(true)

  const fromUrl = location.state?.from || '/'

  useEffect(() => {
    const checkUser = async () => {
      try {
        // setLoginLoading(false)

        const res = await authAPI.verifyUser()
        navigate(fromUrl)
      } catch (err) {
        console.log(err)
        setLoginLoading(false)
      }
    }
    checkUser()
  }, [auth, navigate, fromUrl])

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const submitHandler = async (values) => {
    // e.preventDefault()
    setloading(true)
    try {
      setloading(true)

      const res = await authAPI.login({
        email: values.email,
        password: values.password,
      })
      setAuth({
        ...auth,
        token: res.user,
      })
      navigate(fromUrl)
    } catch (err) {
      notifications.show({
        color: 'red',
        title: 'Invalid credentials',
        message: `${err.data.email} ${err.data.password}`,
      })
      form.setErrors({ email: 'Cloud not find your accounts', password: ' ' })

      setloading(false)
    }
    setloading(false)
  }

  return (
    <>
      {loginLoading ? (
        <div className="w-full h-[calc(100vh-405px)] justify-center  flex flex-col items-center">
          <Loader variant="dots" />
        </div>
      ) : (
        <Box className=" mt-20 mb-20" maw={400} mx="auto">
          <h1 className=" text-3xl font-medium text-gray-600 mb-8">Login</h1>

          <form
            className="mb-6"
            onSubmit={form.onSubmit((values) => submitHandler(values))}
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
              <Button className="w-full mt-4" type="submit" loading={loading}>
                Submit
              </Button>
            </Group>
          </form>
          <span className=" text-gray-400 pt-3">
            Do not have an account?{' '}
            <Link to="/signup" className="text-primary font-medium">
              Sign Up
            </Link>
          </span>
        </Box>
      )}
    </>
  )
}

export default Login
