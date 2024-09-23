import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import './index.css'

const BasePage = () => {
  return (
    <div className="base-page">
      <Header />

      <section className="content">
        <Outlet />
      </section>

      <Footer />
    </div>
  )
}

export default BasePage