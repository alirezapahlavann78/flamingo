import { Model, Schema, model, models } from 'mongoose'

import type { IReviewDocument } from 'types'

const reviewSchema = new Schema<IReviewDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    title: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    comment: { type: String, required: true },
    status: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    positivePoints: [
      {
        id: String,
        title: String,
      },
    ],
    negativePoints: [
      {
        id: String,
        title: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Review: Model<IReviewDocument> =
  models.review || model<IReviewDocument>('review', reviewSchema)

export default Review
