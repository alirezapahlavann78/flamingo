import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerSchema } from 'utils'

import { useRegisterMutation } from 'services'

import { TextField, LoginButton, HandleResponse } from 'components'
import { Logo } from 'icons'

import type { NextPage } from 'next'
import type { IRegisterForm } from 'types'

const RegisterPage: NextPage = () => {
  //? Assets
  const { query, replace } = useRouter()

  //? Create User
  const [registerUser, { data, isSuccess, isError, isLoading, error }] =
    useRegisterMutation()

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('name')
  }, [])

  //? Handlers
  const submitHander: SubmitHandler<IRegisterForm> = ({
    name,
    email,
    password,
  }) => {
    registerUser({
      body: { name, email, password },
    })
  }

  const onSuccess = () => {
    reset()
    replace(query?.redirectTo?.toString() || '/')
  }

  //? Render(s)
  return (
    <>
      {/* Handle Update Response */}
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
          <title>فلامینگو گالری | ثبت‌نام</title>
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
          <h2 className='text-gray-700'>ثبت‌نام</h2>
          <form
            className='space-y-4'
            onSubmit={handleSubmit(submitHander)}
            autoComplete='off'
          >
            <TextField
              control={control}
              errors={formErrors.name}
              placeholder='نام و نام خانوادگی'
              name='name'
            />

            <TextField
              control={control}
              errors={formErrors.email}
              placeholder='آدرس ایمیل'
              name='email'
              inputMode='email'
            />

            <TextField
              control={control}
              errors={formErrors.password}
              type='password'
              placeholder='رمز عبور'
              name='password'
            />

            <TextField
              control={control}
              errors={formErrors.confirmPassword}
              type='password'
              placeholder='تکرار رمز عبور'
              name='confirmPassword'
            />

            <LoginButton isLoading={isLoading}>عضویت</LoginButton>
          </form>

          <div>
            <p className='inline ml-2 text-gray-800'>حساب کاربری دارید؟</p>
            <Link
              href='/authentication/login'
              className='text-lg text-blue-400'
            >
              ورود
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(RegisterPage), { ssr: false })
