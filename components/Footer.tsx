import Image from 'next/image'

import { ResponsiveImage, Services } from 'components'
import {
  AppCoffeBazzar,
  AppGooglePlay,
  AppMyket,
  AppSib,
  ArrowUp,
  Instagram,
  Linkedin,
  LogoPersian,
  Twitter,
  Youtube,
} from 'icons'

import Enamad from '../public/icons/m-enamad.png'
import Kasbokar from '../public/icons/m-kasbokar.png'
import Samandehi from '../public/icons/m-rezi.png'

export default function Footer() {
  return (
    <footer className='pt-4 mt-8 border-t border-gray-200 bg-gray-50'>
      <div className='px-3 lg:max-w-[1700px] space-y-8 mx-auto '>
        {/* Logo & scroll to top */}
        <div className='flex justify-between'>
          <div>
          <Image
              src='/imgs/logo-no-background.png'
              width={224}
              height={324}
              alt='flamingo'
            />
            {/* <LogoPersian className='w-32 h-10 mb-6' /> */}
            <div className='flex flex-col gap-y-2 lg:flex-row pt-8 lg:gap-x-5'>
              <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
              <span className='hidden lg:block bg-gray-300 w-[2px]' />
              <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
            </div>
          </div>
          <div className='min-w-max'>
            <button
              type='button'
              onClick={() => window.scrollTo(0, 0)}
              className='flex items-center px-3 py-1 border border-gray-300 rounded-md'
            >
              <span className='text-sm '>بازگشت به بالا</span>
              <ArrowUp className='text-gray-400 h-7 w-7' />
            </button>
          </div>
        </div>

        <div className='hidden lg:block'>
          <Services />
        </div>


        {/* info */}
        <div className='space-y-6 lg:flex lg:justify-between'>
          <div className='space-y-3 lg:max-w-2xl'>
            <h5 className='font-semibold text-black'>
              فروشگاه اینترنتی دیجی‌کالا، بررسی، انتخاب و خرید آنلاین
            </h5>
            <p className='text-justify text-gray-700'>
              یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی
              متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست
              مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی
              که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و
              توانسته از این طریق مشتریان ثابت خود را داشته باشد.
            </p>
          </div>

          <div className='flex justify-center gap-x-2'>
            <ResponsiveImage
              className='p-2 border border-gray-300 rounded-md'
              dimensions='h-20 w-20'
              src={Enamad}
              alt='ای نماد'
            />
            <ResponsiveImage
              className='p-2 border border-gray-300 rounded-md'
              dimensions='h-20 w-20'
              src={Kasbokar}
              alt='کسب و کار'
            />
            <ResponsiveImage
              className='p-2 border border-gray-300 rounded-md'
              dimensions='h-20 w-20'
              src={Samandehi}
              alt='ساماندهی'
            />

          </div>
        </div>
      </div>

      <div className=' py-3 '>
  
      </div>
    </footer>
  )
}
