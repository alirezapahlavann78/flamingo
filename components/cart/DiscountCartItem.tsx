import { Toman, TomanRed } from 'icons'

import { formatNumber } from 'utils'

interface Props {
  discount: number
  price: number
}

const DiscountCartItem: React.FC<Props> = (props) => {
  //? Props
  const { discount, price } = props

  //? Assets
  const discountPercent = discount / 100

  //? Render(s)
  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <span className='text-primary farsi-digits'>
          {formatNumber(+(price * discountPercent).toFixed())}
        </span>

        <span className='text-primary'> تومان </span>

        <span className='text-primary'>تخفیف</span>
      </div>
      <div className='flex items-center gap-x-2'>
        <span className='text-sm text-gray-700 farsi-digits'>
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <span className='text-gray-700'> تومان </span>

      </div>
    </div>
  )
}

export default DiscountCartItem
