import { useState } from 'react'

import { useLogoutQuery, userApiSlice } from 'services'

import { Button, HandleResponse } from 'components'
import { Logout as LogoutIcon } from 'icons'

import { useAppDispatch } from 'hooks'

export default function Logout() {
  const [skip, setSkip] = useState(true)

  const dispatch = useAppDispatch()

  //? Logout Query
  const { data, isError, isLoading, error, isSuccess } = useLogoutQuery(
    undefined,
    {
      skip,
    }
  )

  //? Handlers
  const handleLogout = () => {
    setSkip(false)
  }
  const onSuccess = () => {
    dispatch(userApiSlice.util.invalidateTags(['User']))
  }

  //? Render(s)
  return (
    <>
      {/* Handle Delete Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={onSuccess}
        />
      )}

      <Button
        className='flex justify-between px-7 transition-colors hover:bg-primary/80 py-4 text-xs text-gray-700 bg-gray-50 w-full cursor-pointer gap-x-2 md:text-sm'
        onClick={handleLogout}
        isLoading={isLoading}
      >
        <LogoutIcon className='text-white icon' />
        <span className='ml-auto mr-3 text-white'>خروج از حساب کاربری</span>
      </Button>
    </>
  )
}
