import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Alert from "../../components/Alert"

const Home = () => {
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
    <div className='home'>
      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </div>
  )
}

export default Home