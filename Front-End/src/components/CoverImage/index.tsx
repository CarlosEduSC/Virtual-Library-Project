import './index.css'

interface CoverImageProps {
    image: string
}

const CoverImage = ({image}: CoverImageProps) => {
  return (
    <img className='cover-image' alt='Capa do livro.' src={image} />
  )
}

export default CoverImage