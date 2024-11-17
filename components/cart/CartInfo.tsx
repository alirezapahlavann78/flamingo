import { formatNumber } from 'utils'

import { Button } from 'components'
import { Toman, TomanRed } from 'icons'

import { useAppSelector } from 'hooks'

interface Props {
  cart?: boolean
  handleRoute?: () => void
}

const CartInfo: React.FC<Props> = (props) => {
  //? Porps
  const { handleRoute, cart } = props

  //? Store
  const { totalItems, totalPrice, totalDiscount } = useAppSelector(
    (state) => state.cart
  )
  let totalPriceByDis = totalPrice - totalDiscount
  //? Render(s)
  return (
    <div className='px-4 py-2 mt-10 space-y-5 lg:mt-0 lg:h-fit lg:py-4'>
      {/* total cart price */}
      <div className='pb-2  flex justify-between'>
        <span className='text-sm farsi-digits'>
          قیمت کالاها ({formatNumber(totalItems)})
        </span>
        <div className='flex-center'>
          <span className='farsi-digits'>{formatNumber(totalPrice)}</span>
          <span className='text-gray-700 mr-1'> تومان </span>
        </div>
      </div>
      <div className='pb-2 border-b border-gray-200 flex justify-between'>
        <span className='text-sm farsi-digits'>هزینه ارسال</span>
        <div className='flex-center'>
          <span className='farsi-digits'>{formatNumber(45000)}</span>
          <span className='text-gray-700 mr-1'> تومان </span>
        </div>
      </div>
      {/* total cart items */}
      <div className='flex justify-between'>
        <span>جمع سبد خرید</span>
        <div className='flex-center'>
          <span className='text-sm farsi-digits'>
            {formatNumber(totalPriceByDis + 45000)}
          </span>
          <span className='text-gray-700 mr-1'> تومان </span>
        </div>
      </div>

      <span className='inline-block w-full pb-2 border-b border-gray-200 lg:max-w-xs'>
        هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه می‌شود
      </span>

      {/* total cart profit */}
      <div className='flex justify-between'>
        <span className='text-primary'>سود شما از خرید</span>
        <div className='flex-center gap-x-1'>
          <span className='text-primary text-sm farsi-digits'>
            (% {((totalDiscount / totalPrice) * 100).toFixed(1)})
          </span>
          <span className='text-primary farsi-digits'>
            {formatNumber(totalDiscount)}
          </span>
          <TomanRed className='mr-1 w-7 h-7' />
        </div>
      </div>

      {cart && (
        <Button onClick={handleRoute} className='hidden w-full lg:block'>
          ادامه
        </Button>
      )}
    </div>
  )
}

export default CartInfo
