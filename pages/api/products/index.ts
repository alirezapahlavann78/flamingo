import { Category, Product } from 'models'

import { sendError, db, roles, makeSlug } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { ICategoryDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

interface ProductsFilter {
  category?: string
  search?: string
  inStock?: string
  discount?: string
  price?: string
}

type ProductsOrder =
  | { createdAt: -1 | 1 }
  | { sold: -1 }
  | { price: -1 | 1 }
  | { rating: -1 }
  | { discount: -1 }
  | { _id: -1 }

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getProducts(req, res)
      break

    case 'POST':
      await createProduct(req, res)
      break

    default:
      break
  }
}

const getProducts = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  const page = req.query.page ? +req.query.page : 1
  const page_size = req.query.page_size ? +req.query.page_size : 10
  const sort = req.query.sort ? +req.query.sort : 1

  const { category, search, inStock, discount, price }: ProductsFilter =
    req.query

  try {
    await db.connect()

    //? Filters
    const currentCategory: ICategoryDocument | null = await Category.findOne({
      slug: category,
    })

    const categoryFilter = currentCategory
      ? {
          category: { $in: currentCategory._id.toString() },
        }
      : {}

    const searchFilter = search
      ? {
          title: {
            $regex: search,
            $options: 'i',
          },
        }
      : {}

    const inStockFilter = inStock === 'true' ? { inStock: { $gte: 1 } } : {}

    const discountFilter =
      discount === 'true' ? { discount: { $gte: 1 }, inStock: { $gte: 1 } } : {}

    const priceFilter = price
      ? {
          price: {
            $gte: +price.split('-')[0],
            $lte: +price.split('-')[1],
          },
        }
      : {}

    //? Sort
    const order: ProductsOrder =
      sort === 3
        ? { price: 1 }
        : sort === 4
        ? { price: -1 }
        : sort === 2
        ? { sold: -1 }
        : sort === 1
        ? { createdAt: -1 }
        : sort === 5
        ? { rating: -1 }
        : sort === 6
        ? { discount: -1 }
        : { _id: -1 }

    const products = await Product.find({
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
      ...priceFilter,
      ...searchFilter,
    })
      .select(
        '-description -info -specification -category -category_levels -sizes  -reviews -numReviews'
      )
      .sort(order)
      .skip((page - 1) * page_size)
      .limit(page_size)

    const productsLength = await Product.countDocuments({
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
      ...priceFilter,
      ...searchFilter,
    })

    const mainMaxPrice = Math.max(
      ...(await Product.find({
        ...categoryFilter,
        inStock: { $gte: 1 },
      }).distinct('price'))
    )
    const mainMinPrice = Math.min(
      ...(await Product.find({
        ...categoryFilter,
        inStock: { $gte: 1 },
      }).distinct('price'))
    )

    res.status(200).json({
      productsLength,
      products,
      mainMaxPrice,
      mainMinPrice,
      pagination: {
        currentPage: page,
        nextPage: page + 1,
        previousPage: page - 1,
        hasNextPage: page_size * page < productsLength,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(productsLength / page_size),
      },
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const createProduct = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const {
      title,
      price,
      discount,
      description,
      images,
      sizes,
      colors,
      category,
      inStock,
      info,
      specification,
      category_levels,
    } = req.body

    if (
      !title ||
      !price ||
      !category ||
      images.length === 0 ||
      info.length === 0 ||
      specification.length === 0
    )
      return sendError(res, 400, 'لطفا تمام فیلد ها را پر کنید')

    const slug = makeSlug(title)

    await db.connect()
    const newProduct = new Product({
      title,
      slug,
      price,
      discount,
      description,
      images,
      sizes,
      colors,
      category,
      inStock,
      info,
      specification,
      category_levels,
    })

    const mainCategory = await Category.findOne({
      parent: undefined,
    })

    if (mainCategory) newProduct.category.unshift(mainCategory?._id)

    await newProduct.save()

    res.status(201).json({ msg: 'محصول جدید با موفقیت اضافه شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)
