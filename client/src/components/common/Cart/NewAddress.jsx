import React from 'react'
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAuth } from '../../../context/auth'

const NewAddress = (props) => {
  const [auth, setAuth] = useAuth()
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
    props.confimOrderHandler(values)
  }
  return (
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
          <Button className="w-full mt-4" type="submit">
            Submit
          </Button>
        </Group>
      </div>
    </form>
  )
}

export default NewAddress
