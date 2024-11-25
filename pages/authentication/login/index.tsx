import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import { SubmitHandler } from 'react-hook-form'

import { useLoginMutation } from 'services'

import { HandleResponse, LoginForm } from 'components'
import { Logo } from 'icons'

import type { ILoginForm } from 'types'

function LoginPage() {
  //? Assets
  const { replace, query } = useRouter()

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] =
    useLoginMutation()

  //? Handlers
  const submitHander: SubmitHandler<ILoginForm> = ({ email, password }) => {
    login({
      body: { email, password },
    })
  }

  const onSuccess = () => replace(query?.redirectTo?.toString() || '/')

  //? Render(s)
  return (
    <>
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={onSuccess}
        />
      )}
      <main className='grid items-center min-h-screen '>
        <Head>
          <title>فلامینگو گالری | ورود</title>
        </Head>
        <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
          <Link passHref href='/' className='w-full  justify-center flex'>
          <Image
              src='/imgs/logo-no-background.png'
              width={224}
              height={324}
              alt='flamingo'
            />
          </Link>
          <h2 className='text-gray-700'>ورود</h2>

          <LoginForm isLoading={isLoading} onSubmit={submitHander} />

          <div>
            <p className='inline ml-2 text-gray-800'>هنوز ثبت‌نام نکردی؟</p>
            <Link
              href='/authentication/register'
              className='text-lg text-blue-400'
            >
              ثبت‌نام
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })
