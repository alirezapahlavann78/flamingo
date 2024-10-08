import { formatNumber } from 'utils'

import { DiscountProduct } from 'components'
import { Toman } from 'icons'

interface Props {
  singleProduct?: boolean
  inStock: number
  discount: number
  price: number
}

const ProductPrice: React.FC<Props> = (props) => {
  //? Props
  const { singleProduct, inStock, discount, price } = props

  //? Render(s)
  return (
    <div className={`${singleProduct && 'flex flex-col-reverse'}`}>
      <div className='flex items-center'>
        <span className='text-sm text-gray-700 farsi-digits'>
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <span className='text-gray-700 mr-1'> تومان </span>

      </div>

      {discount > 0 && (
        <div>
          <span className='ml-2 text-sm text-gray-500 line-through farsi-digits'>
            {formatNumber(price)}
          </span>
          {singleProduct && discount > 0 && inStock !== 0 && (
            <DiscountProduct discount={discount} />
          )}
        </div>
      )}
    </div>
  )
}

export default ProductPrice
