// import Head from 'next/head'

// import { db, siteDescription } from 'utils'

// import { Category, Slider, Banner } from 'models'

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

// import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
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

// const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
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
//       <main className='min-h-screen space-y-4 xl:mt-28'>
//         <Head>
//           <title>فروشگاه اینترنتی فلامینگو گالری</title>
//           <meta name='description' content={siteDescription} />
//         </Head>
//         <div className='py-4 mx-auto space-y-24 xl:mt-28 lg:max-w-[1450px]'>
//           <MainSlider data={sliders} />
//           <DiscountSlider currentCategory={currentCategory} />

//           <Categories
//             childCategories={childCategories}
//             color={currentCategory?.colors?.start}
//             name={currentCategory?.name}
//             homePage
//           />

//           <BannerOne data={bannerOneType} />

//           <BestSellsSlider categorySlug={currentCategory?.slug} />

//           <BannerTwo data={bannerTwoType} />

//           <MostFavouraiteProducts categorySlug={currentCategory?.slug} />
//         </div>
//       </main>
//     </ClientLayout>
//   )
// }

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   await db.connect()

//   const currentCategory = await Category.findOne({
//     parent: undefined,
//   }).lean()

//   const childCategories = await Category.find({
//     parent: currentCategory?._id,
//   }).lean()

//   const sliders = await Slider.find({ category_id: currentCategory?._id })

//   const bannerOneType = await Banner.find({
//     category_id: currentCategory?._id,
//     type: 'one',
//   })
//   const bannerTwoType = await Banner.find({
//     category_id: currentCategory?._id,
//     type: 'two',
//   })

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

// export default Home
import Head from 'next/head';  
import { db, siteDescription } from 'utils';  
import { Category, Slider, Banner } from 'models';  
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

const Home: NextPage<Props> = (props) => {  
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
      <main className='min-h-screen space-y-4 xl:mt-28'>  
        <Head>  
          <title>فروشگاه اینترنتی فلامینگو گالری</title>  
          <meta name='description' content={siteDescription} />  
        </Head>  
        <div className='py-4 mx-auto space-y-24 xl:mt-28 lg:max-w-[1450px]'>  
          <MainSlider data={sliders} />  
          <DiscountSlider currentCategory={currentCategory} />  
          <Categories  
            childCategories={childCategories}  
            color={currentCategory?.colors?.start}  
            name={currentCategory?.name}  
            homePage  
          />  
          <BannerOne data={bannerOneType} />  
          <BestSellsSlider categorySlug={currentCategory?.slug} />  
          <BannerTwo data={bannerTwoType} />  
          <MostFavouraiteProducts categorySlug={currentCategory?.slug} />  
        </div>  
      </main>  
    </ClientLayout>  
  );  
};  

export const getServerSideProps: GetServerSideProps<Props> = async () => {  
  try {  
    await db.connect(); // اتصال به دیتابیس  

    const currentCategory = await Category.findOne({  
      parent: undefined,  
    }).lean();  

    if (!currentCategory) {  
      return { notFound: true }; // اگر دسته‌بندی پیدا نشد، صفحه 404 برگردانید  
    }  

    const childCategories = await Category.find({  
      parent: currentCategory._id,  
    }).lean();  

    const sliders = await Slider.find({ category_id: currentCategory._id }).lean();  

    const bannerOneType = await Banner.find({  
      category_id: currentCategory._id,  
      type: 'one',  
    }).lean();  
    
    const bannerTwoType = await Banner.find({  
      category_id: currentCategory._id,  
      type: 'two',  
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
    return { notFound: true }; // در صورت بروز خطا، صفحه 404 برگردانید  
  } 
  // finally {  
  //   await db.disconnect(); // قطع اتصال به دیتابیس  
  // }  
};  

export default Home;