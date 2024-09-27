import Link from 'next/link'
import Image from 'next/image'

import {
  Signup,
  Cart,
  SearchModal,
  Sidebar,
  Navbar,
  AddressBar,
} from 'components'
import { Logo, Question, FlamingoLogo } from 'icons'

const Header = () => {
  //? Render(s)
  return (
    <>
      <header className='px-4 bg-white lg:shadow xl:fixed xl:z-20 xl:top-0 xl:left-0 xl:right-0'>
        <div className='container max-w-[1700px] lg:flex lg:py-2'>
          <div className='inline-flex items-center justify-between w-full border-b lg:border-b-0 lg:max-w-min lg:ml-8'>
            <Sidebar />
            {/* <Link passHref href='/'> */}
            {/* <FlamingoLogo className='w-80 h-14' />
             */}
            {/* <Image
              src='/imgs/logo-no-background.png'
              width={125}
              height={34}
              alt='flamingo'
            /> */}
            {/* </Link> */}
            <Question className='icon lg:hidden' />
          </div>
          <div className='inline-flex items-center justify-between w-full py-2 border-b gap-x-10 lg:border-b-0'>
            <Link passHref href='/'>
              <Image
                src='/imgs/logo-no-background.png'
                width={160}
                height={34}
                alt='flamingo'
              />
            </Link>

            <div className='flex flex-grow gap-x-7'>
              <SearchModal />
            </div>
            <div className='inline-flex items-center gap-x-4'>
              <Signup />
              <span className='hidden lg:block bg-gray-300 w-0.5 h-8' />
              <Cart />
            </div>
          </div>
        </div>
        <div className='py-2 flex justify-between mx-auto max-w-[1700px] relative'>
          <Navbar />
          <AddressBar />
        </div>
      </header>
    </>
  )
}

export default Header
