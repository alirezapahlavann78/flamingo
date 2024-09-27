import { Loading } from 'components'
import { FlamingoIcon } from 'icons'
import Image from 'next/image'

export default function BigLoading() {
  return (
    <div className='p-8 mx-auto space-y-10 text-center rounded-lg bg-red-100/90 max-w-max '>
      <Image
        src='/imgs/flamingo-favicon-color.png'
        width={170}
        height={44}
        alt='flamingo'
      />
      {/* <FlamingoIcon className='w-22 h-12 mx-auto ' /> */}
      <Loading />
    </div>
  )
}
