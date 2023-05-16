import React, { useEffect, useState } from 'react'
import {
  Breadcrumbs,
  Anchor,
  Container,
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  NumberInput,
  // NumberInputHandlers,
  rem,
  Button,
  Modal,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import productApi from '../../api/productApi'
import ProductCardAdmin from '../../components/common/Admin/ProductCardAdmin'

const AdminProducts = () => {
  const [products, setproducts] = useState([])
  const [productsNo, setproductsNo] = useState([])
  useEffect(() => {
    const getAdminProducts = async () => {
      try {
        const res = await productApi.adminProduts()
        console.log(res)
        setproducts(res.products)
        setproductsNo(res.productsNo)
      } catch (error) {
        console.log(error)
      }
    }
    getAdminProducts()
  }, [])

  const rows = products?.map((item) => (
    <ProductCardAdmin item={item} key={item._id} />
  ))

  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8 overflow-auto">
      <div className=" w-full text-slg text-neutral-600 font-medium mb-12">
        <h1 className="text-left">Products</h1>
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
