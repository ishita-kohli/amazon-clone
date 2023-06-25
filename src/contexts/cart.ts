import { createContext, Dispatch } from "react";

export enum CartActionType {
    AddItem,
    DecrementItem,
    RemoveItem,
}

export interface ICartActions {
    type: CartActionType;
    payload: number;
}

export interface ICartState {
    items: Map<number, number>;
}

export const initialCartState: ICartState = {
    items: new Map<number, number>()
}

export const cartReducer = (state: ICartState, action: ICartActions) => {
    let itemId = action.payload
    let items = new Map<number, number>(state.items)
    const size = items.get(itemId);


    switch (action.type) {
        case CartActionType.AddItem:
            items.set(itemId, size ? size + 1 : 1)
            return {
                ...state,
                items: items,
            };
        case CartActionType.DecrementItem:
            if (size === 1) {
                items.delete(itemId)
            } else if (size) {
                items.set(itemId, size - 1)
            }
            return {
                ...state,
                items
            };
        case CartActionType.RemoveItem:
            items.delete(itemId)
            return {
                ...state,
                items
            };
        default:
            return state;
    }
}

export interface ICartContextProps {
    cartState: ICartState;
    cartDispatch: Dispatch<ICartActions>
}

const CartContext = createContext<ICartContextProps>({
    cartState: initialCartState,
    cartDispatch: () => { }
});

export const CartContextProvider = CartContext.Provider;
export const CartContextConsumer = CartContext.Consumer;
export default CartContext;