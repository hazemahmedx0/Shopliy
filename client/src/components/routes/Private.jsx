import React from 'react'
import { useAuth } from '../../context/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import authAPI from '../../api/AuthAPI'
import {
  Navigate,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { Loader } from '@mantine/core'

const Private = () => {
  const [ok, setOk] = useState(null)
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await authAPI.verifyUser()
        setOk(true)
      } catch (err) {
        setOk(false)
        // navigate('/login', { state: location.pathname },replace: true)
      }
    }
    authCheck()
  }, [navigate, location])

  if (ok === null) {
    return (
      <div className="w-full h-[calc(100vh-405px)] justify-center  flex flex-col items-center">
        <Loader variant="dots" />
      </div>
    )
  }

  return (
    <div>
      {ok ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login"
          state={{ from: location.pathname }}
          replace={true}
        />
      )}
    </div>
  )
}

export default Private
