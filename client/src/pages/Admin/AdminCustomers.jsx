import { useEffect, useState } from 'react'

import authAPI from '../../api/AuthAPI'
import UsersAdminCard from '../../components/common/AdminPanal/UsersAdminCard'

const AdminCustomers = () => {
  const [customers, setcustomers] = useState([])
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
        <h1 className="text-left">Customers </h1>
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
