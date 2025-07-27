import Image from "next/image";
import { getReviewsAndRatingsByProduct } from "@/app/lib/data";

export default async function ReviewsAndRatings({ productId }: { productId: string; }) {

  const reviewsAndRatings = await getReviewsAndRatingsByProduct(productId);
  console.log(reviewsAndRatings);

  const averageRating =
    reviewsAndRatings?.reduce((sum, review) => sum + review.rating, 0) / reviewsAndRatings?.length || 0;


  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center">
      <ul className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-center text-3xl font-bold mb-4 text-gray-900">
          Reviews and Ratings
        </h1>
        <div className="text-center mb-2 text-xl font-semibold text-gray-700">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex justify-center mb-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.1 3.386a1 1 0 00.95.69h3.566c.969 0 1.371 1.24.588 1.81l-2.89 2.1a1 1 0 00-.364 1.118l1.1 3.386c.3.921-.755 1.688-1.54 1.118l-2.89-2.1a1 1 0 00-1.175 0l-2.89 2.1c-.785.57-1.84-.197-1.54-1.118l1.1-3.386a1 1 0 00-.364-1.118l-2.89-2.1c-.784-.57-.38-1.81.588-1.81h3.566a1 1 0 00.95-.69l1.1-3.386z" />
            </svg>
          ))}
        </div>
        {reviewsAndRatings?.map((reviewAndRating) => (
          <li
            key={reviewAndRating.id}
            className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg p-6 mb-6 shadow-sm"
          >
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <Image
                src={reviewAndRating.user_profile_image}
                width={200}
                height={300}
                alt={`${reviewAndRating.user_name}'s profile picture`}
                className="rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <p className="text-lg font-semibold text-gray-700">
                  {reviewAndRating.user_name}
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {reviewAndRating.review}
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  Rating: {reviewAndRating.rating}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}