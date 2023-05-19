import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from '../../../api/productApi'
import { notifications } from '@mantine/notifications'

import {
  Button,
  TextInput,
  Group,
  Box,
  Textarea,
  Select,
  NumberInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useCat } from '../../../context/catCtx'

const AddNewProduct = (props) => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [cat, setCat] = useCat()
  const [catMenu, setcatMenu] = useState([])

  useEffect(() => {
    let transformedArray = []
    for (let i = 0; i < cat?.categories?.length; i++) {
      transformedArray.push({
        value: cat?.categories[i]._id,
        label: cat?.categories[i].name,
      })
    }
    setcatMenu(transformedArray)
  }, [cat])

  let form = useForm({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      brand: '',
      image: '',
      image1: '',
      image2: '',
      image3: '',
      cat: '',
    },

    validate: {},
  })

  const submitHandler = async (values) => {
    setloading(true)
    try {
      setloading(true)

      const isImageUrl = (url) => {
        // Implement your URL validation logic here
        // For example, you can use a regular expression to check if the URL is valid
        // This is a simple example that checks for the presence of "http://" or "https://" at the beginning of the URL
        return /^https?:\/\//i.test(url)
      }

      const imageArray = [
        values.image,
        values.image1,
        values.image2,
        values.image3,
      ].filter(
        (image) => image && typeof image === 'string' && isImageUrl(image)
      )

      const res = await productApi.addProduct({
        name: values.name,
        description: values.description,
        price: values.price,
        brand: values.brand,
        image: imageArray,
        categoryId: values.cat,
      })
      notifications.show({
        color: 'primary',
        title: 'Success',
        message: `Product Added successfully`,
      })
      navigate('/admin/products')

      setloading(false)
    } catch (err) {
      setloading(false)
    }
    setloading(false)
  }

  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8 overflow-auto">
      <div className=" w-full text-slg text-neutral-600 font-medium mb-12">
        <h1 className="text-left">Add a new product </h1>
      </div>
      <div className="w-full">
        <Box className=" w-full" mx="auto">
          <form
            className="mb-6 flex flex-row w-full gap-10 "
            onSubmit={form.onSubmit((values) => submitHandler(values))}
          >
            <div className="w-full">
              <div className="flex flex-row gap-4 w-full">
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="name"
                  placeholder=""
                  {...form.getInputProps('name')}
                />
                <Select
                  className="w-full text-left"
                  label="Category"
                  placeholder="Pick one"
                  data={catMenu}
                  {...form.getInputProps('cat')}
                />
              </div>
              <div className="flex flex-row gap-4 w-full ">
                <Textarea
                  className="flex flex-col w-full items-start mb-4 "
                  minRows={2}
                  autosize
                  withAsterisk
                  label="description"
                  placeholder=""
                  {...form.getInputProps('description')}
                />
              </div>

              <div className="flex flex-row gap-4 w-full">
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="brand"
                  placeholder=""
                  {...form.getInputProps('brand')}
                />
                <NumberInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="price"
                  placeholder=""
                  precision={2}
                  min={0}
                  {...form.getInputProps('price')}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="image 1"
                  placeholder=""
                  {...form.getInputProps('image')}
                />
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  label="image 2"
                  placeholder=""
                  {...form.getInputProps('image1')}
                />
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  label="image 3"
                  placeholder=""
                  {...form.getInputProps('image2')}
                />
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  label="image 4"
                  placeholder=""
                  {...form.getInputProps('image3')}
                />
              </div>

              <Group position="right" mt="md">
                <Button className="w-full mt-4" type="submit" loading={loading}>
                  Submit
                </Button>
              </Group>
            </div>
          </form>
        </Box>
      </div>
    </div>
  )
}

export default AddNewProduct
