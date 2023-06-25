import { FC, useState } from "react";
import { IProduct } from "../domain/product";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import CartButton from "./CartButton";

const MAX_RATING = 5;
const MIN_RATING = 1;

type Props = {
  product: IProduct;
};

const ProductTile: FC<Props> = ({
  product: { id, description, category, image, title, price },
}) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="m-5 flex flex-col bg-white z-30 p-10">
      <div className="relative flex flex-col">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">
          {category}
        </p>
        <Image
          className="transition duration-500 ease-in-out hover:scale-125"
          src={image}
          height={200}
          width={200}
          alt="Product image"
          objectFit="contain"
        />
        <h4 className="my-3">{title}</h4>
        <div className="flex">
          {Array.from(new Array(rating), (_, index) => (
            <StarIcon className="h-5 text-yellow-500" key={index} />
          ))}
        </div>
        <p className="text-xs my-2 line-clamp-2">{description}</p>
        <div className="mb-5">
          <Currency quantity={price * 70} currency="INR" />
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <Image
              className="w-12"
              src="/images/prime_tag.png"
              alt=""
              width={48}
              height={48}
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <CartButton id={id} />
      </div>
    </div>
  );
};

export default ProductTile;
