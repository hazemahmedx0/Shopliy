import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import {
  Drawer,
  Button,
  Group,
  Input,
  TextInput,
  Checkbox,
  Box,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { Edit, Trash } from 'iconoir-react'
import catApi from '../../../api/catApi'
const CatCardAdmin = (props) => {
  const { item } = props
  const [name, setname] = useState(item?.name)
  const [description, setdescription] = useState(item?.description)
  const [opened, { open, close }] = useDisclosure(false)
  const [laoding, setlaoding] = useState(false)
  const form = useForm({
    initialValues: {
      name: `${name ? name : ''}`,
      description: `${description ? description : ''}`,
    },

    validate: {},
  })

  const submitChanges = async (values) => {
    setlaoding(true)

    try {
      const res = await catApi.editCat(item._id, {
        name: values?.name,
        description: values?.description,
      })
      setlaoding(false)

      setname(values?.name)
      setdescription(values?.description)
      close()
    } catch (error) {
      setlaoding(false)
      console.log(error)
    }
    setlaoding(false)
  }

  const deleteCat = async () => {
    setlaoding(true)

    try {
      const res = await catApi.deleteCat(item._id)
      props.deleteCatbyId(item._id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className=" flex flex-row items-center justify-between text-left transition-all bg-gray-100 px-10 py-10 rounded-2xl hover:bg-green-200 hover:shadow-low"
      key={item._id}
    >
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Edit Category"
      >
        <form onSubmit={form.onSubmit((values) => submitChanges(values))}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Name"
            {...form.getInputProps('name')}
          />
          <Textarea
            withAsterisk
            label="description"
            placeholder="description"
            {...form.getInputProps('description')}
          />
          <Group position="right" mt="md">
            <Button type="submit" loading={laoding}>
              Submit
            </Button>
          </Group>
        </form>
      </Drawer>
      <div>
        <p className=" text-lg font-medium text-gray-800">{name}</p>
        <p>{description}</p>
      </div>
      <div className="flex flex-col gap-4">
        <Edit
          onClick={open}
          className="w-6 h-6 bg-green-100 p-1 rounded-md text-green-800 cursor-pointer"
        />
        <Trash
          onClick={deleteCat}
          className="w-6 h-6 bg-red-100 p-1 rounded-md text-red-800 cursor-pointer"
        />
      </div>
    </div>
  )
}

export default CatCardAdmin
