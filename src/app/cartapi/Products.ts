import {Product} from "@/app/cartapi/Product";
import {createContext, Dispatch} from "react";
import {rand_num} from "./random";

export interface Products {
    vec: Product[]
}

type ProductsActions =
    | { type: "add"; item: Product }
    | { type: "rm_by_id"; id: number }
    | { type: "rm_all" };


export const ProductContext = createContext<
    | {
        state: Products;
        dispatch: Dispatch<ProductsActions>;
    }
    | undefined
>(undefined);


export const StateSelector = (state: Products, action: ProductsActions): Products => {
    switch (action.type) {
        case "add": {
            const newItem: Product = {
                ...action.item,
                id: rand_num(),
            };
            return {vec: [...state.vec, newItem]}
        }
        case "rm_by_id":
            return {vec: state.vec.filter((item) => item.id !== action.id)};
        case "rm_all":
            return {vec: []}
        default:
            return state;
    }
};