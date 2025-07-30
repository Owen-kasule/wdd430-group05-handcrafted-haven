// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm`}
    >
      <div className="flex flex-col h-full">
        {/* Image placeholder */}
        <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>

        {/* Content placeholder */}
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="flex items-center mb-3">
            <div className="h-4 bg-gray-200 rounded w-16 mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>

        {/* Button placeholder */}
        <div className="h-10 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </>
  );
}
