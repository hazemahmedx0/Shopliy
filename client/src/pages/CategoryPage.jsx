import { useParams } from 'react-router-dom'
import { Breadcrumbs, Anchor, Container } from '@mantine/core'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import productApi from '../api/productApi'

const CategoryPage = () => {
  const { categoryId } = useParams()

  const [products, setProducts] = useState([])
  const [catInfo, setcatInfo] = useState({})

  const allProducts = async () => {
    try {
      const res = await productApi.catProducts(categoryId)
      setcatInfo(res.category)
      setProducts(res.productsInCategory)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allProducts()
  }, [])

  const items = [
    { title: 'Home', href: '/' },
    { title: `${catInfo?.name}`, href: `/categories/${catInfo?._id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))
  return (
    <Container className=" mb-28">
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-md:gap-3 mb-20">
        <Breadcrumbs separator="→" mt="xs">
          {items}
        </Breadcrumbs>
      </div>
      <div className="flex flex-row justify-between mb-6">
        <p className=" text-gray-500 font-medium text-xl">Products</p>
      </div>
      {products.length === 0 ? (
        <p className="text-center text-2xl w-full">Could not find product </p>
      ) : null}
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
export default CategoryPage
