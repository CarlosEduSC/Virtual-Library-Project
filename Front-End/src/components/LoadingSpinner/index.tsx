import './index.css'

interface LoadingSpinnerProps {
  circleColor?: string,
  barColor?: string,
  size?: number,
  borderSize?: number
}

const LoadingSpinner = ({ circleColor = "#E3F2F4", barColor = "#9FD5D8", size = 20, borderSize = 7}: LoadingSpinnerProps) => {
  return (
    <div
      className='loading-spinner'
      style={{
        border: borderSize + "px " + circleColor + " solid",
        borderTop: borderSize + "px " + barColor + " solid",
        width: size + "px",
        height: size + "px"
      }}
    />
  )
}

export default LoadingSpinner