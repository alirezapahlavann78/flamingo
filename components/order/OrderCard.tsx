import moment from 'moment-jalaali'

import { HandleResponse, ResponsiveImage } from 'components'

import { formatNumber } from 'utils'

import { useUpdateOrderMutation } from 'services'
import { IOrder } from 'types'
import { Check, Clock2, More, Toman } from 'icons'

interface Props {
  order: IOrder
  singleOrder?: boolean
}

const OrderCard: React.FC<Props> = (props) => {
  //? Props
  const { order, singleOrder } = props

  //? Edit Order Query
  const [editOrder, { data, isSuccess, isError, error }] =
    useUpdateOrderMutation()

  //? Handlers
  const handleChangeToDelivered = () => {
    editOrder({
      id: order._id,
      body: { paid: true, delivered: true },
    })
  }
  const handleChangeToInProccess = () => {
    editOrder({
      id: order._id,
      body: { paid: false, delivered: false },
    })
  }

  //? Render(s)
  return (
    <>
      {/* Handle Edit Order Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
        />
      )}
      <div className='py-4 space-y-3 border-b border-gray-200 lg:border lg:rounded-lg '>
        <div className='flex items-center justify-between lg:px-3'>
          <div className='flex items-center gap-x-2 '>
            {order.delivered ? (
              <Check className='p-0.5 w-6 h-6 bg-lime-500 text-white rounded-full' />
            ) : (
              <Clock2 className='p-0.5 w-6 h-6 bg-amber-500 text-white rounded-full' />
            )}
            <span className='text-sm text-black'>
              {order.delivered ? 'ارسال شده' : 'در حال پردازش'}
            </span>
          </div>
          {order.delivered && (
            <span className='farsi-digits'>
              {moment(order.updatedAt).format('jYYYY/jM/jD')}
            </span>
          )}
          {singleOrder && (
            <div className='relative h-fit px-1.5 group self-end'>
              <More className='cursor-pointer icon' />
              <div className='absolute left-0 z-10 hidden px-4 py-3 bg-white rounded shadow-3xl top-5 group-hover:flex'>
                <div className='space-y-4'>
                  <button
                    type='button'
                    className='flex items-center w-48 gap-x-3 lg:w-56'
                    onClick={handleChangeToDelivered}
                    disabled={order.delivered}
                  >
                    <Check className='text-white rounded-full p-0.5 icon bg-green-500 ' />
                    <span className='block'>تغییر وضعیت به ارسال شده</span>
                  </button>
                  <button
                    type='button'
                    className='flex items-center w-48 gap-x-3 lg:w-56'
                    onClick={handleChangeToInProccess}
                    disabled={!order.delivered}
                  >
                    <Clock2 className='text-white rounded-full p-0.5 icon bg-amber-500 ' />
                    <span className='block'>تغییر وضعیت به در حال پردازش</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-wrap justify-between lg:px-3'>
          <div>
            <span>کد سفارش</span>
            <span className='mr-2 text-sm text-black'>{order._id}</span>
          </div>
          <div className='flex items-center gap-x-1'>
            <span className='text-black farsi-digits'>
              {formatNumber(order.totalPrice - order.totalDiscount)}
            </span>
            <span className='text-gray-700'> تومان </span>

          </div>
        </div>
        <div className='flex flex-wrap py-5 gap-x-5 gap-y-3 lg:border-t lg:border-gray-200 lg:px-3'>
          {order.cart.map((cartItem, index) => (
            <ResponsiveImage
              dimensions='w-16 h-16'
              src={cartItem.img.url}
              alt={cartItem.name}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderCard
