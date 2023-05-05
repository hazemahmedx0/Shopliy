import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextInput, Checkbox, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

import { useAuth } from '../../../context/auth'
import { useNavigate } from 'react-router-dom'
import UserApi from '../../../api/userApi'

import handleImageUpload from '../../../utils/imageUpload'
const MyInfoAddress = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [auth, setAuth] = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [photo, setphoto] = useState([])
  const [shippingAddress, setShippingAddress] = useState({})
  console.log(shippingAddress)
  const [addAddress, setaddAddress] = useState(false)
  // const [photo, setphoto] = useState([])
  const [file, setFile] = useState([])
  useEffect(() => {
    setFirstName(auth.user.firstName)
    setlastName(auth.user.lastName)
    setemail(auth.user.email)
    setphoto(auth.user.photo)
    auth.user.shippingAddress
      ? setShippingAddress(auth.user.shippingAddress)
      : null
  }, [editing])

  const onImageChange = async (e) => {
    setphoto(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const form = useForm({
    initialValues: {
      firstName: `${auth.user.firstName}`,
      lastName: `${auth.user.lastName}`,
      email: `${auth.user.email}`,
    },

    validate: {
      firstName: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  const submitHandler = async (values) => {
    let newimage
    if (photo !== auth.user.photo) {
      newimage = await handleImageUpload(file)
    }
    // e.preventDefault()
    setloading(true)
    try {
      setloading(true)
      UserApi
      const res = await UserApi.UpdateMe({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        photo: newimage ? newimage : photo,
      })

      notifications.show({
        color: 'primary',
        title: 'Success',
        message: `Your Account has been updated successfully`,
      })

      setAuth({
        ...auth,
        user: {
          ...auth.user,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          photo: newimage ? newimage : photo,
        },
      })
      setEditing(false)
    } catch (err) {
      setloading(false)

      notifications.show({
        color: 'red',
        title: 'An error occured',
        message: `Please fill the form correctly`,
      })
      form.setErrors({
        firstName: `${err.data?.firstName}`,
        lastName: `${err.data?.lastName}`,
        email: `${err.data?.email}`,
      })
    }
    setloading(false)
  }

  return (
    <>
      <div className=" pl-8 mt-14 pb-4 w-full flex flex-col items-start ">
        {/* {!shippingAddress && !addAddress ? (
          <div className=" w-full text-sm text-neutral-600 font-medium mb-12">
            <h1 className="text-left">Add your address</h1>
            <Button radius="md" size="md" onClick={() => setaddAddress(true)}>
              Add
            </Button>
          </div>
        ) : (
          <Box className=" w-full" mx="auto">
            <p className="text-left text-xl text-gray-600 mb-4 font-semibold">
              Update your information
            </p>
            <form
              className="mb-6 flex flex-row w-full gap-10 "
              onSubmit={form.onSubmit((values) => submitHandler(values))}
            >
              <div className="w-full">
                <div className="flex flex-row gap-4 w-full">
                  <TextInput
                    className="flex flex-col w-full items-start mb-4"
                    withAsterisk
                    label="First Name"
                    placeholder="xzxz@email.com"
                    {...form.getInputProps('firstName')}
                  />

                  <TextInput
                    className="flex flex-col w-full items-start mb-4"
                    withAsterisk
                    label="Last Name"
                    placeholder="your@email.com"
                    {...form.getInputProps('lastName')}
                  />
                </div>
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps('email')}
                />
                <Group position="right" mt="md">
                  <Button
                    className="w-full mt-4"
                    type="submit"
                    loading={loading}
                  >
                    Submit
                  </Button>
                </Group>
              </div>
            </form>
          </Box>
        )} */}

        {!editing || !shippingAddress ? (
          <>
            <div className=" w-full text-sm text-neutral-600 font-medium mb-12">
              <h1 className="text-left">My Address</h1>
            </div>
            <div className="flex w-full flex-row gap-6 justify-between">
              <div className="flex flex-row gap-4">
                {!auth.user.shippingAddress ? (
                  <div className="flex flex-col text-gray-700">
                    <p className="text-left">Please add an address </p>
                  </div>
                ) : (
                  <div className="flex flex-col text-gray-700">
                    <p className="text-left">{shippingAddress.street}</p>
                    <p className="text-left">{shippingAddress.city}</p>
                    <p className="text-left">{shippingAddress.zip}</p>
                    <p className="text-left">{shippingAddress.country}</p>
                  </div>
                )}
              </div>
              <Button radius="md" size="md" onClick={() => setEditing(true)}>
                {!auth.user.shippingAddress ? 'Add' : 'Edit'}
              </Button>
            </div>
          </>
        ) : (
          <Box className=" w-full" mx="auto">
            <p className="text-left text-xl text-gray-600 mb-4 font-semibold">
              Update your information
            </p>
            <form
              className="mb-6 flex flex-row w-full gap-10 "
              onSubmit={form.onSubmit((values) => submitHandler(values))}
            >
              <div className="w-full">
                <div className="flex flex-row gap-4 w-full">
                  <TextInput
                    className="flex flex-col w-full items-start mb-4"
                    withAsterisk
                    label="First Name"
                    placeholder="xzxz@email.com"
                    {...form.getInputProps('firstName')}
                  />

                  <TextInput
                    className="flex flex-col w-full items-start mb-4"
                    withAsterisk
                    label="Last Name"
                    placeholder="your@email.com"
                    {...form.getInputProps('lastName')}
                  />
                </div>
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps('email')}
                />
                <Group position="right" mt="md">
                  <Button
                    className="w-full mt-4"
                    type="submit"
                    loading={loading}
                  >
                    Submit
                  </Button>
                </Group>
              </div>
            </form>
          </Box>
        )}

        {/* Form */}
      </div>
    </>
  )
}

export default MyInfoAddress
