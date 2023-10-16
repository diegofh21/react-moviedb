import React from 'react'

import { Header } from '../components/Header'

import { Link } from 'react-router-dom'

import notFoundImg from '../assets/404/404NotFound.webp'

export const PageNotFound = () => {
  return (
    <>
      <Header></Header>

      <div className="grid place-items-center place-content-center mt-56">
        <img src={notFoundImg} alt="Página no encontrada" />
      </div>
    </>
  )
}
