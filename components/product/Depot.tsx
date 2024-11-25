import { Save } from 'icons'
import { formatNumber } from 'utils'

interface Props {
  inStock: number
}

const Depot: React.FC<Props> = ({ inStock }) => {
  //? Render(s)
  if (inStock < 5 && inStock !== 0) {
    return (
      <span className='text-red-500 farsi-digits'>
        تنها {formatNumber(inStock)} عدد در انبار باقی مانده
      </span>
    )
  } else if (inStock > 10) {
    return (
      <div className='flex text-teal-400 gap-x-1'>
        <Save className='text-teal-400 icon' />
        <span className='text-teal-700'>موجود در انبار  </span>
      </div>
    )
  } else if (inStock === 0) {
    return null
  }
}

export default Depot
