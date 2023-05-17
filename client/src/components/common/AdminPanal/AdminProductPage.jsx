import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from '../../../api/productApi'
import { Avatar, Button, TextInput, Checkbox, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

import { Cancel } from 'iconoir-react'
const AdminProductPage = (props) => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setproduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  console.log(product)
  useEffect(() => {
    const getTheProduct = async () => {
      try {
        const res = await productApi.getProductById(productId)
        setproduct(res)
        console.log(res)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getTheProduct()
  }, [navigate, productId])

  let form = useForm({
    initialValues: {
      name: `${product.name}`,
      description: `${product?.description ? product.description : ''}`,
      price: `${product?.price ? product.price : ''}`,
      brand: `${product?.brand ? product.brand : ''}`,
      image: `${product?.image ? product.image[0] : ''}`,
    },

    validate: {},
  })

  useEffect(() => {
    form.setValues({
      name: `${product.name}`,
      description: `${product?.description ? product.description : ''}`,
      price: `${product?.price ? product.price : ''}`,
      brand: `${product?.brand ? product.brand : ''}`,
      image: `${product?.image ? product.image[0] : ''}`,
    })
  }, [product])

  const submitHandler = async (values) => {
    console.log(values)
  }

  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8 overflow-auto">
      <div className=" w-full text-slg text-neutral-600 font-medium mb-12">
        <h1 className="text-left">{product.name}</h1>
      </div>
      <div>
        <Box className=" w-full" mx="auto">
          <form
            className="mb-6 flex flex-row w-full gap-10 "
            onSubmit={form.onSubmit((values) => submitHandler(values))}
          >
            <div className="w-full">
              <TextInput
                className="flex flex-col w-full items-start mb-4"
                withAsterisk
                label="name"
                placeholder=""
                {...form.getInputProps('name')}
              />
              <div className="flex flex-row gap-4 w-full">
                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="description"
                  placeholder=""
                  {...form.getInputProps('description')}
                />

                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="price"
                  placeholder=""
                  {...form.getInputProps('price')}
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

                <TextInput
                  className="flex flex-col w-full items-start mb-4"
                  withAsterisk
                  label="image"
                  placeholder=""
                  {...form.getInputProps('image')}
                />
              </div>

              <Group position="right" mt="md">
                <Button className="w-full mt-4" type="submit">
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

export default AdminProductPage
