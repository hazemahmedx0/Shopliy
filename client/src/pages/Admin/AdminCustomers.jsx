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
import ProductCardAdmin from '../../components/common/AdminPanal/ProductCardAdmin'
import { Link } from 'react-router-dom'
import authAPI from '../../api/AuthAPI'
import UsersAdminCard from '../../components/common/AdminPanal/UsersAdminCard'

const AdminCustomers = () => {
  const [customers, setcustomers] = useState([])
  // const [productsNo, setproductsNo] = useState([])
  useEffect(() => {
    const getAdminUsers = async () => {
      try {
        const res = await authAPI.allUsers()
        setcustomers(res)
      } catch (error) {
        console.log(error)
      }
    }
    getAdminUsers()
  }, [])

  const deleteUserbyId = (id) => {
    setcustomers((prevcustomers) =>
      prevcustomers.filter((customers) => customers._id !== id)
    )
  }

  const rows = customers?.map((item) => (
    <UsersAdminCard
      item={item}
      key={item._id}
      deleteUserbyId={deleteUserbyId}
    />
  ))

  return (
    <div className=" flex flex-col items-start w-full bg-[#FCFCFD] p-8 pt-8 overflow-auto">
      <div className=" w-full text-slg text-neutral-600 font-medium mb-12 flex flex-row items-center">
        <h1 className="text-left">Customers </h1>{' '}
        {/* <span className="text-lg bg-slate-300 ml-3 rounded-xl px-5 text-gray-800 p-2">
          3
        </span> */}
      </div>
      <div className="grow w-full mb-28">
        <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 max-md:gap-3">
          {rows}
        </div>
      </div>
    </div>
  )
}

export default AdminCustomers
