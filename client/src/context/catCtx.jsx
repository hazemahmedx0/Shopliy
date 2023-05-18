import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import catApi from '../api/catApi'

const CatContext = createContext()

const CatProvider = ({ children }) => {
  const navigate = useNavigate()

  const [cat, setCat] = useState({})
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await catApi.allCat()
        setCat(res)
      } catch (error) {
        console.log(error)
      }
    }

    getCats()
  }, [navigate])
  return (
    <CatContext.Provider value={[cat, setCat]}>{children}</CatContext.Provider>
  )
}

const useCat = () => useContext(CatContext)

export { CatProvider, useCat }
