import LoadingSpinner from '../../components/LoadingSpinner'
import './index.css'

const LoadingPage = () => {
  return (
    <div className='loading-page'>

      <h1>Carregando</h1>

      <LoadingSpinner
        circleColor='#356E73'
        barColor='#7EBDC2'
        size={25}
        borderSize={10}
      />
    </div>
  )
}

export default LoadingPage