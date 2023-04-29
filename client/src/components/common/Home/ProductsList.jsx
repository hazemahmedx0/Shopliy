import { NativeSelect } from '@mantine/core'
import { Container } from '@mantine/core'

import { FilterList } from 'iconoir-react'
const ProductsList = () => {
  return (
    <Container>
      <div className="flex flex-row justify-between">
        <p className=" text-gray-500 font-medium text-xl">New Products</p>
        <NativeSelect
          placeholder="Pick a hashtag"
          data={['React', 'Angular', 'Svelte', 'Vue']}
          icon={<FilterList width="1rem" />}
        />
      </div>
      <div></div>
    </Container>
  )
}

export default ProductsList
