"use client";

import { createReviewAndRating, State4 } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function CreateReview({ productId }: { productId: string }) {
  const initialState: State4 = { message: null, errors: {} };
  const [state, formAction] = useFormState(createReviewAndRating, initialState);

  const currentState = state || initialState;
  const errors = currentState.errors || {};



  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mx-auto">
      <form
        action={formAction}
        className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">Leave a Review</h2>

        <div className="w-full">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <div className="flex justify-between text-sm text-gray-500 px-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <span key={num}>{num}</span>
            ))}
          </div>
          <input
            id="rating"
            name="rating"
            type="range"
            min={1}
            max={5}
            step={1}
            aria-describedby="rating-error"
            required
            className="mt-1 block w-full"
            style={{ accentColor: '#01B0D3', backgroundColor: '#ffffff' }}
          />
          <div id="rating-error" aria-live="polite" aria-atomic="true">
            {errors.rating &&
              errors.rating.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            Review
          </label>
          <textarea
            id="review"
            name="review"
            aria-describedby="review-error"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <div id="review-error" aria-live="polite" aria-atomic="true">
            {errors.review &&
              errors.review.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <input type="hidden" name="product_id" value={productId} />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#01B0D3] hover:bg-[#05788f]"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}