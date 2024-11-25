// import Head from 'next/head'

// import { db } from 'utils'

// import { Category, Banner, Slider } from 'models'

// import {
//   BannerOne,
//   BannerTwo,
//   BestSellsSlider,
//   Categories,
//   ClientLayout,
//   DiscountSlider,
//   MostFavouraiteProducts,
//   Slider as MainSlider,
// } from 'components'

// import config from 'config'

// import type {
//   GetStaticPaths,
//   GetStaticProps,
//   InferGetStaticPropsType,
//   NextPage,
// } from 'next'
// import type { IBanner, ICategory, ISlider } from 'types'

// interface Props {
//   currentCategory: ICategory
//   childCategories: {
//     title: string
//     categories: ICategory[]
//   }
//   sliders: ISlider[]
//   bannerOneType: IBanner[]
//   bannerTwoType: IBanner[]
// }

// const MainCategory: NextPage<Props> = (
//   props
// ) => {
//   //? Props
//   const {
//     currentCategory,
//     childCategories,
//     sliders,
//     bannerOneType,
//     bannerTwoType,
//   } = props

//   //? Render(s)
//   return (
//     <ClientLayout>
//       <main className='min-h-screen space-y-6 xl:mt-28'>
//         <Head>
//           <title>{`فلامینگو گالری | ${currentCategory.name}`}</title>
//         </Head>

//         <div className='py-4 mx-auto space-y-12 xl:mt-28 lg:max-w-[1450px]'>
//           <MainSlider data={sliders} />

//           <DiscountSlider currentCategory={currentCategory} />

//           <Categories
//             childCategories={childCategories}
//             color={currentCategory.colors?.start}
//             name={currentCategory.name}
//           />

//           <BannerOne data={bannerOneType} />

//           <BestSellsSlider categorySlug={currentCategory.slug} />

//           <BannerTwo data={bannerTwoType} />

//           <MostFavouraiteProducts categorySlug={currentCategory.slug} />
//         </div>
//       </main>
//     </ClientLayout>
//   )
// }

// export const getStaticProps: GetStaticProps<
//   Props,
//   { category: string }
// > = async ({ params }) => {
//   await db.connect()

//   const currentCategory = await Category.findOne({
//     slug: params?.category,
//   }).lean()

//   if (!currentCategory) return { notFound: true }

//   const sliders = await Slider.find({ category_id: currentCategory?._id })

//   const bannerOneType = await Banner.find({
//     category_id: currentCategory?._id,
//     type: 'one',
//   })
//   const bannerTwoType = await Banner.find({
//     category_id: currentCategory?._id,
//     type: 'two',
//   })

//   const childCategories = await Category.find({
//     parent: currentCategory?._id,
//   }).lean()

//   return {
//     revalidate: config.revalidate,
//     props: {
//       currentCategory: JSON.parse(JSON.stringify(currentCategory)),
//       childCategories: {
//         title: 'خرید بر اساس دسته‌بندهای',
//         categories: JSON.parse(JSON.stringify(childCategories)),
//       },
//       sliders: JSON.parse(JSON.stringify(sliders)),
//       bannerOneType: JSON.parse(JSON.stringify(bannerOneType)),
//       bannerTwoType: JSON.parse(JSON.stringify(bannerTwoType)),
//     },
//   }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   await db.connect()

//   const categories = await Category.find({
//     level: 1,
//   }).lean()

//   const paths = categories.map((cat) => ({ params: { category: cat.slug } }))
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export default MainCategory
import Head from 'next/head';  
import { db } from 'utils';  
import { Category, Banner, Slider } from 'models';  
import {  
  BannerOne,  
  BannerTwo,  
  BestSellsSlider,  
  Categories,  
  ClientLayout,  
  DiscountSlider,  
  MostFavouraiteProducts,  
  Slider as MainSlider,  
} from 'components';  
import config from 'config';  
import type { GetServerSideProps, NextPage } from 'next';  
import type { IBanner, ICategory, ISlider } from 'types';  

interface Props {  
  currentCategory: ICategory;  
  childCategories: {  
    title: string;  
    categories: ICategory[];  
  };  
  sliders: ISlider[];  
  bannerOneType: IBanner[];  
  bannerTwoType: IBanner[];  
}  

const MainCategory: NextPage<Props> = (props) => {  
  //? Props  
  const {  
    currentCategory,  
    childCategories,  
    sliders,  
    bannerOneType,  
    bannerTwoType,  
  } = props;  

  //? Render(s)  
  return (  
    <ClientLayout>  
      <main className='min-h-screen space-y-6 xl:mt-28'>  
        <Head>  
          <title>{`فلامینگو گالری | ${currentCategory.name}`}</title>  
        </Head>  

        <div className='py-4 mx-auto space-y-12 xl:mt-28 lg:max-w-[1450px]'>  
          <MainSlider data={sliders} />  
          <DiscountSlider currentCategory={currentCategory} />  
          <Categories  
            childCategories={childCategories}  
            color={currentCategory.colors?.start}  
            name={currentCategory.name}  
          />  
          <BannerOne data={bannerOneType} />  
          <BestSellsSlider categorySlug={currentCategory.slug} />  
          <BannerTwo data={bannerTwoType} />  
          <MostFavouraiteProducts categorySlug={currentCategory.slug} />  
        </div>  
      </main>  
    </ClientLayout>  
  );  
};  

export const getServerSideProps: GetServerSideProps<  
  Props,  
  { category: string }  
> = async ({ params }) => {  
  // بررسی وجود پارامتر  
  if (!params?.category) {  
    return { notFound: true };  
  }  

  try {  
    await db.connect(); // اتصال به دیتابیس  

    const currentCategory = await Category.findOne({  
      slug: params.category,  
    }).lean();  

    if (!currentCategory) return { notFound: true };  

    const sliders = await Slider.find({ category_id: currentCategory._id }).lean();  
    const bannerOneType = await Banner.find({  
      category_id: currentCategory._id,  
      type: 'one',  
    }).lean();  
    const bannerTwoType = await Banner.find({  
      category_id: currentCategory._id,  
      type: 'two',  
    }).lean();  
    const childCategories = await Category.find({  
      parent: currentCategory._id,  
    }).lean();  

    return {  
      props: {  
        currentCategory: JSON.parse(JSON.stringify(currentCategory)),  
        childCategories: {  
          title: 'خرید بر اساس دسته‌بندهای',  
          categories: JSON.parse(JSON.stringify(childCategories)),  
        },  
        sliders: JSON.parse(JSON.stringify(sliders)),  
        bannerOneType: JSON.parse(JSON.stringify(bannerOneType)),  
        bannerTwoType: JSON.parse(JSON.stringify(bannerTwoType)),  
      },  
    };  
  } catch (error) {  
    console.error('Error fetching data:', error);  
    return { notFound: true };  
  }
  //  finally {  
  //   await db.disconnect(); // قطع اتصال به دیتابیس  
  // }  
};  

export default MainCategory;