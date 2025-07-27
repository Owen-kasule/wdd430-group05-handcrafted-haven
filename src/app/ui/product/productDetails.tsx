import Image from "next/image";
import { getProductById, getSellerData } from "@/app/lib/data";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function ProductDetails({ id }: { id: string }) {
  
  revalidatePath(`/product/${id}`);

  const product = await getProductById(id);
  const seller = await getSellerData(id);

  return (
    <div className="flex flex-col justify-center items-center p-6 my-20">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 max-w-4xl">
				{/* Product Details */}
        <div className="w-full md:w-auto md:flex-shrink-0">
          <Image
            src={product.image_url}
            alt={product.product_name}
            width={400}
            height={400}
            className="object-contain rounded-lg mb-4 md:mb-0"
          />
        </div>
        <div className="w-full text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
          <p className="text-xl font-bold text-customGreen mb-4">
            ${product.price.toLocaleString()}
          </p>
          <p className="mb-4">{product.description}</p>
          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
          <p className="text-sm text-gray-600">Category: {product.category}</p>
        </div>
      </div>
			{/* Seller Information */}
			<div className="items-center md:items-start md:space-x-6 max-w-4xl mt-9">
          <h2 className="text-lg font-bold mb-4 text-center">Seller:</h2>
					<Link key={seller.id} href={`/profile/${seller.id}`} legacyBehavior >
						<a className="p-2 border rounded-lg shadow hover:bg-gray-100 flex md:flex-row">
							<Image
								src={seller.profile_image}
								className="rounded-full border-4 border-gray-300 shadow-sm"
								width={100}
								height={100}
								alt={`${seller.name}'s profile picture`}
							/>
							<div className="mx-7 my-4">
								<p className="text-lg font-bold text-gray-600">{seller.name}</p>
								<p className="text-sm text-gray-600">Products: {seller.product_count}</p>
							</div>
						</a>
					</Link>
      </div>
    </div>
  );
}