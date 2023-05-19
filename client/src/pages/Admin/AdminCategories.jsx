import React, { useState } from 'react'
import { useCat } from '../../context/catCtx'
import { Table, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  Drawer,
  Group,
  Input,
  TextInput,
  Checkbox,
  Box,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { Link } from 'react-router-dom'
import CatCardAdmin from '../../components/common/AdminPanal/CatCardAdmin'
import catApi from '../../api/catApi'
const AdminCategories = () => {
  const [cat, setCat] = useCat()
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setlaoding] = useState(false)
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
    },

    validate: {},
  })

  const addCatToList = async (values) => {
    setlaoding(true)

    try {
      const res = await catApi.addCat({
        name: values?.name,
        description: values?.description,
      })
      setlaoding(false)
      setCat((prevCat) => ({
        ...prevCat,
        categories: [...prevCat.categories, res.category],
      }))
      close()
    } catch (error) {
      setlaoding(false)
      console.log(error)
    }
    setlaoding(false)
  }

  const deleteCatbyId = (categoryId) => {
    const updatedCategories = cat.categories.filter(
      (category) => category._id !== categoryId
    )

    // Update the state with the updated categories
    setCat((prevCat) => ({
      ...prevCat,
      categories: updatedCategories,
    }))
  }
  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8 overflow-auto">
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Add Category"
      >
        <form onSubmit={form.onSubmit((values) => addCatToList(values))}>
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
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </Group>
        </form>
      </Drawer>

      <div className=" w-full text-slg text-neutral-600 font-medium mb-12 flex flex-row items-center">
        <h1 className="text-left">Categories </h1>{' '}
        <span className="text-lg bg-slate-300 ml-3 rounded-xl px-5 text-gray-800 p-2">
          {cat?.categories?.length}
        </span>
        <Button className=" ml-auto" variant="filled" onClick={open}>
          Add Category
        </Button>
      </div>
      <div className="grow w-full mb-28">
        <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2 max-md:gap-3">
          {cat?.categories?.map((item) => (
            <CatCardAdmin
              item={item}
              key={item._id}
              deleteCatbyId={deleteCatbyId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminCategories
