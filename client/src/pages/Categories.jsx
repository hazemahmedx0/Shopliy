import { NativeSelect } from '@mantine/core'
import { Container } from '@mantine/core'

import { FilterList } from 'iconoir-react'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import productApi from '../api/productApi'
import catApi from '../api/catApi'
import { useCat } from '../context/catCtx'
import { Link } from 'react-router-dom'
const Categories = () => {
  const [products, setProducts] = useState([])
  const [cat, setCat] = useCat()

  const allProducts = async () => {
    try {
      const res = await productApi.getAllProducts()
      setProducts(res.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allProducts()
  }, [])

  return (
    <Container className=" mb-28">
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-md:gap-3 mb-20">
        {cat?.categories?.map((item) => (
          <Link
            to={`/categories/${item._id}`}
            className=" transition-all bg-gray-100 px-4 py-10 rounded-2xl hover:bg-green-200 hover:shadow-low cursor-pointer"
            key={item._id}
          >
            <p className=" text-base font-medium text-gray-800">{item.name}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-between mb-6">
        <p className=" text-gray-500 font-medium text-xl">Products</p>
      </div>
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-md:gap-3">
        {products.map((item) => (
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
export default Categories
