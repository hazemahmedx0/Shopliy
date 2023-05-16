import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextInput, Checkbox, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

import { useAuth } from '../../../context/auth'
import { useNavigate } from 'react-router-dom'
import UserApi from '../../../api/userApi'
import { Cancel } from 'iconoir-react'
import handleImageUpload from '../../../utils/imageUpload'

const MyInfo = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [auth, setAuth] = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [photo, setphoto] = useState([])
  // const [photo, setphoto] = useState([])
  const [file, setFile] = useState([])
  useEffect(() => {
    setFirstName(auth.user?.firstName)
    setlastName(auth.user?.lastName)
    setemail(auth.user?.email)
    setphoto(auth.user?.photo)
  }, [editing])

  const onImageChange = async (e) => {
    setphoto(URL.createObjectURL(e.target.files[0]))
    setFile(e.target.files[0])
  }

  const form = useForm({
    initialValues: {
      firstName: `${auth.user?.firstName}`,
      lastName: `${auth.user?.lastName}`,
      email: `${auth.user?.email}`,
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
        {!editing ? (
          <>
            <div className=" w-full text-sm text-neutral-600 font-medium mb-12">
              <h1 className="text-left">My Info</h1>
            </div>
            <div className="flex w-full flex-row gap-6 justify-between">
              <div className="flex flex-row gap-4">
                <Avatar
                  className="shadow-sm outline-2 outline-slate-300 outline-dashed "
                  size="xl"
                  src={photo}
                />
                <div className="flex flex-col text-gray-700">
                  <div className="flex flex-row gap-1 text-gray-700 font-semibold">
                    <p className=" text-lg ">{firstName} </p>
                    <p className=" text-lg">{lastName} </p>
                  </div>
                  <p className="text-left">{email}</p>
                </div>
              </div>
              <Button
                variant="default"
                radius="md"
                size="md"
                onClick={() => setEditing(true)}
              >
                Edit
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
              <div className="flex flex-col gap-4 justify-between">
                <Avatar
                  className="shadow-sm outline-2 outline-slate-300 outline-dashed "
                  size={128}
                  src={photo}
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className=" cursor-pointer inline-block px-6 py-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-[#FFD848] rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:shadow-outline-orange active:bg-yellow-700"
                  >
                    Choose an Image
                  </label>
                </div>
              </div>
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

export default MyInfo
