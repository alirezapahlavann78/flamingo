import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

import { DashboardAside, RequireUser } from 'components'

import type { NextPage } from 'next'
import { roles } from 'utils'

const AdminPage: NextPage = () => {
  return (
    <RequireUser allowedRoles={[roles.ADMIN, roles.ROOT]}>
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-8xl '>
        <Head>
          <title>فلامینگو گالری | مدیریت</title>
        </Head>

        <div>
          <DashboardAside />
        </div>
        <div className='hidden py-6 lg:inline-block lg:flex-1 lg:border lg:border-gray-300 lg:rounded-md lg:mt-6 h-fit'>
          <section className='py-20'>
            <Image
              src='/icons/chart.png'
              alt='نمودار'
              width={208}
              height={208}
              className='mx-auto mb-8'
            />

            <p className='text-center'>آنالیز وضعیت</p>
            <span className='block my-3 text-base text-center text-amber-500'>
              (بزودی)
            </span>
          </section>
        </div>
      </div>
    </RequireUser>
  )
}

export default dynamic(() => Promise.resolve(AdminPage), { ssr: false })
