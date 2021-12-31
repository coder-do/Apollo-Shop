export const initialState = {
    products: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            let newProd;
            let exist = state.products.filter(el => el.id === action.payload.product.id);
            if (exist.length > 0) {
                newProd = state.products.map(prod => {
                    if (prod.id === exist[0].id) {
                        prod.qtty++;
                    }
                    return prod;
                })
            } else {
                newProd = [...state.products, action.payload.product];
            }
            return {
                ...state,
                products: newProd
            }
        default:
            return state;
    }
}