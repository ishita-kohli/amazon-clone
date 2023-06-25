import { FC, useContext } from "react";
import CartContext, { CartActionType } from "../contexts/cart";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";

type Props = {
  id: number;
};

const CartButton: FC<Props> = ({ id }) => {
  const cartContext = useContext(CartContext);

  return (
    <div className="flex items-center space-x-4">
      {cartContext.cartState.items.has(id) ? (
        <>
          <button
            onClick={() =>
              cartContext.cartDispatch({
                type: CartActionType.RemoveItem,
                payload: id,
              })
            }
            className="button flex-grow"
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
            className="button px-2"
          >
            <MinusIcon className="h-4" />
          </button>
          <p className="px-6">{cartContext.cartState.items.get(id)}</p>
          <button
            onClick={() =>
              cartContext.cartDispatch({
                type: CartActionType.AddItem,
                payload: id,
              })
            }
            className="button px-2"
          >
            <PlusIcon className="h-4" />
          </button>
        </>
      ) : (
        <button
          onClick={() =>
            cartContext.cartDispatch({
              type: CartActionType.AddItem,
              payload: id,
            })
          }
          className="button flex-grow"
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default CartButton;

/* 
<button
        onClick={() =>
          cartContext.cartDispatch({
            type: CartActionType.AddItem,
            payload: id,
          })
        }
        className="button"
      >
        Add to cart
      </button>
*/
