import { useEffect, useState } from 'react'
import { Table, Button } from '@mantine/core'
import productApi from '../../api/productApi'
import ProductCardAdmin from '../../components/common/AdminPanal/ProductCardAdmin'
import { Link } from 'react-router-dom'

const AdminProducts = () => {
  const [products, setproducts] = useState([])
  const [productsNo, setproductsNo] = useState([])
  useEffect(() => {
    const getAdminProducts = async () => {
      try {
        const res = await productApi.adminProduts()
        setproducts(res.products)
        setproductsNo(res.productsNo)
      } catch (error) {
        console.log(error)
      }
    }
    getAdminProducts()
  }, [])

  const deleteProductById = (id) => {
    setproducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    )
    setproductsNo((prevProductsNo) => prevProductsNo - 1)
  }

  const rows = products?.map((item) => (
    <ProductCardAdmin
      item={item}
      key={item._id}
      deleteProductById={deleteProductById}
    />
  ))

  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8 overflow-auto">
      <div className=" w-full text-slg text-neutral-600 font-medium mb-12 flex flex-row items-center">
        <h1 className="text-left">Products </h1>{' '}
        <span className="text-lg bg-slate-300 ml-3 rounded-xl px-5 text-gray-800 p-2">
          {productsNo}
        </span>
        <Button className=" ml-auto" variant="filled">
          <Link to="addnewproduct">Add Product</Link>
        </Button>
      </div>
      <div className="grow w-full mb-28">
        <div className="flex w-full flex-row justify-between gap-7 items-start">
          <div className=" w-full gorw">
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Status</th>
                  <th>category</th>
                  <th>Price</th>
                  <th className=" w-40">Actions</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts
