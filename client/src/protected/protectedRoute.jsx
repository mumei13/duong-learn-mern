// import { Children, Component, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
// import { Route, Navigate, Outlet } from 'react-router-dom'
import Dashboard from '../page/Dashboard.page'
import LoginForm from '../page/login.page'
import NavbarMenu from '../components/NavbarMenu'
import { Outlet } from 'react-router-dom'
// import LoginForm from './login.page'


function ProtectedRoute () {
    const {
        authState: { isAuthenticated }
    } = useContext(AuthContext)

  return (
    console.log(isAuthenticated),
    (isAuthenticated) ? (
        <>
        <NavbarMenu />,
        <Outlet />
        </>

    ) : <LoginForm />
    )
}

export default ProtectedRoute
