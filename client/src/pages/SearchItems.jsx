import { Container } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from '../api/productApi'
import ProductCard from '../components/ProductCard'

const SearchItems = () => {
  const { searchName } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const allProducts = async () => {
    try {
      const res = await productApi.getAllProducts()
      setProducts(res.products)
    } catch (error) {}
  }

  useEffect(() => {
    const filteredProductsx = products.filter((product) =>
      product.name.includes(searchName)
    )

    setFilteredProducts(filteredProductsx)
  }, [navigate, products])

  return (
    <Container className=" mt-8 mb-28">
      <h1 className="text-left font-bold text-zinc-800 mt-6">
        {filteredProducts.length} Results for {searchName}
      </h1>
      <div className="flex flex-row justify-between mt-4 gap-7 items-start">
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
      </div>
    </Container>
  )
}

export default SearchItems
