import Link from 'next/link'

import {
  DiscountProduct,
  ProductPrice,
  ResponsiveImage,
  Skeleton,
} from 'components'
import { Heart, Star } from 'icons'

import { useGetProductsQuery } from 'services'

interface Props {
  categorySlug: string
}

const MostFavouraiteProducts: React.FC<Props> = (props) => {
  //? Props
  const { categorySlug } = props

  const { products, isFetching } = useGetProductsQuery(
    {
      sort: 5,
      category: categorySlug,
    },
    {
      selectFromResult: ({ data, isFetching }) => ({
        products: data?.products,
        isFetching,
      }),
    }
  )

  //? Render(s)

  return (
    <section className='px-3'>
      <div className='flex items-center mb-3 gap-x-2'>
        <Heart className='icon text-amber-400' />
        <h4 className='text-xl'>محبوب ترین کالاها</h4>
      </div>
      <div className='grid grid-cols-2 gap-1 md:gap-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
        {isFetching
          ? Array(6)
              .fill('_')
              .map((_, index) => (
                <Skeleton.Items key={index} className='p-1'>
                  <Skeleton.Item
                    height='h-32 md:h-36'
                    width='w-28 md:w-32'
                    animated='background'
                    className='rounded-md mx-auto'
                  />
                  <Skeleton.Item
                    height='h-5'
                    width='w-32'
                    animated='background'
                    className='mt-4 mx-auto'
                  />
                  <Skeleton.Item
                    height='h-5'
                    width='w-20'
                    animated='background'
                    className='mt-4 mx-auto'
                  />
                </Skeleton.Items>
              ))
          : products?.map((product, i) => {
              if (i <= 5) {
                return (
                  <Link key={product._id} href={`/products/${product.slug}`}>
                    <article className='p-1 transition border border-gray-50 hover:border-gray-200 min-h-[248px]'>
                      <div className='flex gap-x-1 '>
                        <span className='text-base farsi-digits'>
                          {product.rating.toFixed(1)}
                        </span>
                        <Star className='w-5 h-5 md:w-7 md:h-7 text-amber-400 ' />
                      </div>

                      <ResponsiveImage
                        dimensions='h-32 w-28 md:w-32 md:h-36'
                        className='mx-auto'
                        src={product.images[0].url}
                        alt={product.title}
                      />
                      <div
                        className={`flex items-start mt-2 gap-x-2 ${
                          product.discount
                            ? 'justify-evenly'
                            : 'justify-end pl-8'
                        }`}
                      >
                        {product.discount ? (
                          <DiscountProduct discount={product.discount} />
                        ) : null}
                        <ProductPrice
                          inStock={product.inStock}
                          discount={product.discount}
                          price={product.price}
                        />
                      </div>
                    </article>
                  </Link>
                )
              } else {
                return
              }
            })}
      </div>
    </section>
  )
}

export default MostFavouraiteProducts
