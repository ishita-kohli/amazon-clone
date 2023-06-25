import { FC, useState, useContext } from "react";
import Image from "next/image";
import { IProduct } from "../domain/product";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import CartContext, { CartActionType } from "../contexts/cart";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";

type Props = {
  product: IProduct;
};

const MAX_RATING = 5;
const MIN_RATING = 1;

const CheckoutProduct: FC<Props> = ({
  product: { id, description, category, image, title, price },
}) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  const cartContext = useContext(CartContext);

  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        alt={title}
      />

      <div className="col-span-2 md:col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex">
          {Array.from(new Array(rating), (_, index) => (
            <StarIcon className="h-5 text-yellow-500" key={index} />
          ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>

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

      <div className="grid grid-cols-5 space-y-4 my-auto col-span-2 md:col-span-1">
        <button
          onClick={() =>
            cartContext.cartDispatch({
              type: CartActionType.RemoveItem,
              payload: id,
            })
          }
          className="button col-span-full"
        >
          Remove
        </button>
        <button
          onClick={() =>
            cartContext.cartDispatch({
              type: CartActionType.DecrementItem,
              payload: id,
            })
          }
          className="button col-span-1"
        >
          <MinusIcon className="h-4 mx-auto" />
        </button>
        <p className="mx-auto col-span-3">
          {cartContext.cartState.items.get(id)}
        </p>
        <button
          onClick={() =>
            cartContext.cartDispatch({
              type: CartActionType.AddItem,
              payload: id,
            })
          }
          className="button  col-span-1"
        >
          <PlusIcon className="h-4 mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
