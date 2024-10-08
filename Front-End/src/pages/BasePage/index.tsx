import { Outlet, useLocation } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import './index.css'
import { useEffect, useState } from "react"
import Alert from "../../components/Alert"

const BasePage = () => {
  const location = useLocation()

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (location.state && location.state.alertTitle && location.state.alertMessage) {
      setAlertTitle(location.state.alertTitle);
      setAlertMessage(location.state.alertMessage);
      setIsAlertOpen(true)
    }
  }, [location.state]);

  return (
    <div className="base-page">
      <Header />

      <section className="content">
        <Outlet />

        {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
      </section>

      <Footer />
    </div>
  )
}

export default BasePage