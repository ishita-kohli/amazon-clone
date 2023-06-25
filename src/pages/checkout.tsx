import Header from "../components/Header";
import Image from "next/image";
import checkoutBanner from "../../public/images/checkout_banner.png";
import { FC, useContext } from "react";
import CartContext from "../contexts/cart";
import { IProduct } from "../domain/product";
import { GetServerSideProps } from "next";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

type Props = {
  items: IProduct[];
};

const Checkout: FC<Props> = ({ items }) => {
  const [session] = useSession();

  const cartContext = useContext(CartContext);

  items = items.filter(({ id }) => cartContext.cartState.items.has(id));
  return (
    <div className="bg-gray-100">
      <Header />

      <div className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src={checkoutBanner}
            alt="checkout banner"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {cartContext.cartState.items.size === 0
                ? "Shopping Cart is Empty"
                : "Your Shopping Cart"}
            </h1>

            {items.map((item, _) => (
              <CheckoutProduct key={item.id} product={item} />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items)
                <span className="font-bold">
                  <Currency
                    quantity={
                      70 *
                      items
                        .map(
                          (item) =>
                            item.price *
                            cartContext.cartState.items.get(item.id)!
                        )
                        .reduce((a, b) => a + b, 0)
                    }
                    currency="INR"
                  />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to Checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let products: IProduct[] = await fetch(
    "https://fakestoreapi.com/products"
  ).then((res) => res.json());

  return {
    props: {
      items: products,
    },
  };
};
