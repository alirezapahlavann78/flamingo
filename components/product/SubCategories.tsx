import Link from 'next/link'

import { ResponsiveImage, SubCategoriesSkeleton } from 'components'

import { useGetSubCategoriesQuery } from 'services'
import { generateQueryParams } from 'utils'

interface Props {
  category: string
}

const SubCategories: React.FC<Props> = (props) => {
  const { category } = props

  const { childCategories, isLoading } = useGetSubCategoriesQuery(
    { slug: category },
    {
      skip: !category,
      selectFromResult: ({ isLoading, data }) => ({
        childCategories: data?.children,
        isLoading,
      }),
    }
  )

  //? Render(s)
  return (
    <section className='ps-4 md:px-4 my-7'>
      {isLoading ? (
        <SubCategoriesSkeleton />
      ) : childCategories && childCategories.length > 0 ? (
        <>
          <h4 className='mb-4 text-base text-black lg:pt-4'>دسته‌بندی‌ها</h4>
          <div className='flex gap-3 pb-3 overflow-x-auto'>
            {childCategories.map((item) => (
              <Link
                key={item._id}
                href={`/products?${generateQueryParams({
                  category: item.slug,
                  sort: '',
                })}`}
                className='px-3 pt-4 pb-2 text-center border-4 border-gray-100 rounded-md'
              >
                <ResponsiveImage
                  dimensions='w-24 h-24 md:h-32 md:w-32 xl:w-40 xl:h-40'
                  src={item.image}
                  alt={item.name}
                />

                <span className='inline-block mt-2'>{item.name}</span>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}

export default SubCategories