import React from 'react'
import DashboardStats from '../components/DashboardStats'
import SalesCharts from '../components/SalesCharts'
import RecentSalesTable from '../components/RecentSalesTable'
import DashboardWidgets from '../components/DashboardWidgets'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <DashboardStats/>
      <SalesCharts/>
      <RecentSalesTable/>
      <DashboardWidgets/>
      <Footer/>
    </>
  )
}

export default Home