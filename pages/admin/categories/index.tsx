import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import {
  BigLoading,
  DashboardLayout,
  EmptyCustomList,
  PageContainer,
  DataStateDisplay,
  TableContainer,
  TableSkeleton,
} from 'components'

import { useGetCategoriesQuery } from 'services'

import type { NextPage } from 'next'

const Categories: NextPage = () => {
  //? Assets
  const { query } = useRouter()
  const parentId = query.parent_id
  const parentLvl = query.parent_lvl

  //? Get Categories Data
  const { childCategories, ...categoriesQueryProps } = useGetCategoriesQuery(
    undefined,
    {
      selectFromResult: ({ data, ...rest }) => ({
        childCategories: data?.categories.filter(
          (category) => category.parent === parentId
        ),
        ...rest,
      }),
    }
  )

  //? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | دسته بندی ها</title>
      </Head>

      <DashboardLayout>
        <PageContainer title='دسته بندی ها'>
          <DataStateDisplay
            {...categoriesQueryProps}
            dataLength={childCategories ? childCategories.length : 0}
            loadingComponent={<TableSkeleton />}
            emptyComponent={<EmptyCustomList />}
          >
            <section className='p-3'>
              <div className='space-y-8 text-white'>
                <div className='flex justify-between'>
                  {childCategories && childCategories[0]?.level !== 0 ? (
                    <Link
                      href={`categories/create${
                        parentId ? `?parent_id=${parentId}` : ''
                      }&${parentLvl ? `parent_lvl=${parentLvl}` : ''}`}
                      className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3'
                    >
                      افزودن دسته‌بندی جدید
                    </Link>
                  ) : (
                    <div />
                  )}
                  <Link
                    href='/admin/categories/tree'
                    className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3'
                  >
                    نمودار دسته‌بندی ها
                  </Link>
                </div>

                <TableContainer tHeads={['نام', 'بیشتر']}>
                  {childCategories &&
                    childCategories.length > 0 &&
                    childCategories?.map((category) => (
                      <tr
                        className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50 '
                        key={category._id}
                      >
                        <td className='w-3/4 px-2 py-4 text-right'>
                          {category.name}
                        </td>
                        <td className='flex flex-wrap items-center gap-3 px-2 py-4'>
                          {category.level !== 3 && (
                            <Link
                              href={`/admin/categories?parent_id=${category._id}&parent_lvl=${category.level}`}
                              className='bg-green-50 text-green-500 rounded-sm py-1 px-1.5 max-w-min'
                            >
                              زیردسته ها
                            </Link>
                          )}
                          <Link
                            href={`/admin/categories/edit/${category._id}?${
                              parentId ? `parent_id=${parentId}` : ''
                            }&${parentLvl ? `parent_lvl=${parentLvl}` : ''}`}
                            className='bg-amber-50 text-amber-500 rounded-sm py-1 px-1.5 max-w-min'
                          >
                            ویرایش
                          </Link>
                          {category.level === 2 && (
                            <Link
                              href={`/admin/details/${category._id}`}
                              className='bg-blue-50 text-blue-500 rounded-sm py-1 px-1.5 max-w-min'
                            >
                              مشخصات و ویژگی ها
                            </Link>
                          )}
                          {category.level < 2 && (
                            <>
                              <Link
                                href={`/admin/sliders/${category._id}`}
                                className='bg-fuchsia-50 text-fuchsia-500 rounded-sm py-1 px-1.5 max-w-min'
                              >
                                اسلایدرها
                              </Link>
                              <Link
                                href={`/admin/banners?category_id=${category._id}&category_name=${category.name}`}
                                className='bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 max-w-min'
                              >
                                بنرها
                              </Link>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </TableContainer>
              </div>
            </section>
          </DataStateDisplay>
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Categories), { ssr: false })
