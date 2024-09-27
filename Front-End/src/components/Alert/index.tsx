import './index.css'

interface AlertProps {
    message: string,
    tittle: string,
    onClose: () => void
}

const Alert = ({ message, tittle, onClose }: AlertProps) => {
    return (
        <div className='alert'>
            <div className='alert-top'>
                <h2 className='alert-tittle'>{tittle}</h2>

                <img className='alert-img' alt='Fechar' src='/images/close.png' onClick={onClose} />
            </div>

            <span className='alert-message'>{message}</span>
        </div>
    )
}

export default Alert