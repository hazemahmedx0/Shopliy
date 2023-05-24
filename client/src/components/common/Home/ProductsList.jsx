import { NativeSelect } from '@mantine/core'
import { Container } from '@mantine/core'

import { FilterList } from 'iconoir-react'
import ProductCard from '../../ProductCard'
import { useEffect, useState } from 'react'
import productApi from '../../../api/productApi'
import { useCat } from '../../../context/catCtx'
const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [cat, setCat] = useCat()
  const [catHere, setCatHere] = useState()
  useEffect(() => {
    cat?.categories
      ? setCatHere([
          { _id: '111', name: 'All', description: 'All', __v: 0 },
          ...cat.categories,
        ])
      : null
  }, [cat])

  const categoryOptions = catHere?.map((category) => ({
    value: category._id,
    label: category.name,
  }))

  const [value, setValue] = useState('')
  const allProducts = async () => {
    try {
      const res = await productApi.getAllProducts()
      setProducts(res.products)
    } catch (error) {}
  }

  useEffect(() => {
    allProducts()
  }, [])

  useEffect(() => {
    if (value === '111') {
      setFilteredProducts(products) // Set all products
    } else if (value) {
      const filtered = products.filter(
        (product) => product.categoryId._id === value
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [value, products])

  return (
    <Container className=" mb-28">
      <div className="flex flex-row justify-between mb-6">
        <p className=" text-gray-500 font-medium text-xl">New Products</p>
        <NativeSelect
          placeholder="Pick a hashtag"
          data={categoryOptions ? categoryOptions : []}
          onChange={(event) => setValue(event.currentTarget.value)}
          icon={<FilterList width="1rem" />}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-2xl w-full">Could not find product </p>
      ) : null}
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-md:gap-3">
        {filteredProducts.map((item) => (
          <ProductCard
            item={item}
            key={item._id}
            id={item._id}
            title={item.name}
            image={item.image}
            price={item.price}
            brand={item.brand}
            availability={item.availability}
            // category={item.category}
          />
        ))}
      </div>
    </Container>
  )
}

export default ProductsList
