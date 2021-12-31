import { client } from "./client";
import { ALL_PRODUCTS } from './queries';

export const getData = async () => {
    let products, clothes, tech;
    await client
        .query({
            query: ALL_PRODUCTS
        })
        .then(({ data }) => {
            products = data.category.products
            clothes = data.category.products.filter(el => {
                return el.category === 'clothes'
            });
            tech = data.category.products.filter(el => {
                return el.category === 'tech'
            })
        })
    return {
        products,
        clothes,
        tech
    }
}