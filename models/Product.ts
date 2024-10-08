import { Model, Schema, model, models } from 'mongoose'

import type { IProductDocument } from 'types'

const productSchema = new Schema<IProductDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    discount: { type: Number, default: 0 },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sizes: [
      {
        id: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
    colors: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        hashCode: { type: String, required: true },
      },
    ],
    category: [{ type: String, required: true }],
    category_levels: {
      level_one: {
        type: Schema.Types.ObjectId,
        ref: 'category',
      },
      level_two: {
        type: Schema.Types.ObjectId,
        ref: 'category',
      },
      Level_three: {
        type: Schema.Types.ObjectId,
        ref: 'category',
      },
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    info: [
      {
        title: { type: String, required: true },
        value: { type: String, required: false },
      },
    ],
    specification: [
      {
        title: { type: String, required: true },
        value: { type: String, required: false },
      },
    ],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    optionsType: {
      type: String,
      default: 'none',
      enum: ['colors', 'sizes', 'none'],
    },
  },
  {
    timestamps: true,
  }
)

const Product: Model<IProductDocument> =
  models.product || model<IProductDocument>('product', productSchema)
export default Product
