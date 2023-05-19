import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextInput, Checkbox, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

import { useAuth } from '../../../context/auth'
import { useNavigate } from 'react-router-dom'
import UserApi from '../../../api/userApi'
import { Cancel } from 'iconoir-react'

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
      street: `${
        auth.user.shippingAddress?.street
          ? auth.user.shippingAddress.street
          : ''
      }`,
      city: `${
        auth.user.shippingAddress?.city ? auth.user.shippingAddress.city : ''
      }`,
      state: `${
        auth.user.shippingAddress?.state ? auth.user.shippingAddress.state : ''
      }`,
      zip: `${
        auth.user.shippingAddress?.zip ? auth.user.shippingAddress.zip : ''
      }`,
      country: `${
        auth.user.shippingAddress?.country
          ? auth.user.shippingAddress.country
          : ''
      }`,
    },

    validate: {},
  })

  const submitHandler = async (values) => {
    setloading(true)
    try {
      setloading(true)
      const res = await UserApi.UpdateMe({
        shippingAddress: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
        },
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
          shippingAddress: {
            street: values.street,
            city: values.city,
            state: values.state,
            zip: values.zip,
            country: values.country,
          },
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
    }
    setloading(false)
  }

  return (
    <>
      <div className=" pl-8 mt-14 pb-4 w-full flex flex-col items-start ">
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
                    <p className="text-left">
                      {shippingAddress.street ? shippingAddress.street : ''}
                    </p>
                    <p className="text-left">{shippingAddress.city}</p>
                    <p className="text-left">{shippingAddress.zip}</p>
                    <p className="text-left">{shippingAddress.country}</p>
                  </div>
                )}
              </div>
              <Button
                variant="default"
                radius="md"
                size="md"
                onClick={() => setEditing(true)}
              >
                {!auth.user.shippingAddress ? 'Add' : 'Edit'}
              </Button>
            </div>
          </>
        ) : (
          <Box className=" w-full" mx="auto">
            <div className="flex flex-row justify-between">
              <p className="text-left text-xl text-gray-600 mb-4 font-semibold">
                Update your information
              </p>
              <Cancel
                width={32}
                height={32}
                color="#F34141"
                className=" bg-red-50 p-1 rounded-lg cursor-pointer"
                onClick={() => setEditing(false)}
              />
            </div>
            <form
              className="mb-6 flex flex-row w-full gap-10 "
              onSubmit={form.onSubmit((values) => submitHandler(values))}
            >
              <div className="w-full">
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="Street"
                  placeholder=""
                  {...form.getInputProps('street')}
                />
                <div className="flex flex-row gap-4 w-full">
                  <TextInput
                    className="flex flex-col w-full items-start mb-4"
                    withAsterisk
                    label="City"
                    placeholder=""
                    {...form.getInputProps('city')}
                  />

                  <TextInput
                    className="flex flex-col w-full items-start mb-4"
                    withAsterisk
                    label="state"
                    placeholder=""
                    {...form.getInputProps('state')}
                  />
                </div>

                <div className="flex flex-row gap-4 w-full">
                  <TextInput
                    className="flex flex-col w-full items-start mb-4"
                    withAsterisk
                    label="Postal code"
                    placeholder=""
                    {...form.getInputProps('zip')}
                  />

                  <TextInput
                    className="flex flex-col w-full items-start mb-4"
                    withAsterisk
                    label="Country"
                    placeholder=""
                    {...form.getInputProps('country')}
                  />
                </div>

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
