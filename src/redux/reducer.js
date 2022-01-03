export const initialState = {
    products: [],
    currency: '$'
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
            } if (exist.length === 0) {
                newProd = [...state.products, action.payload.product];
            }

            return {
                ...state,
                products: newProd
            };
        case 'REMOVE_PRODUCT':
            let newProduct;
            if (action.payload.product.qtty - 1 === 0) {
                if (window.confirm('Are you sure to remove cart item?')) {
                    newProduct = state.products.filter(prod => prod.id !== action.payload.product.id);
                } else {
                    newProduct = state.products.map(prod => {
                        if (prod.id === action.payload.product.id) {
                            prod.qtty = 1;
                        }
                        return prod;
                    })
                }
            }
            if (action.payload.product.qtty > 1) {
                newProduct = state.products.map(prod => {
                    if (prod.id === action.payload.product.id) {
                        prod.qtty--;
                    }
                    return prod;
                })
            }
            return {
                ...state,
                products: newProduct
            }
        case 'CHANGE_CURRENCY':
            return {
                ...state,
                currency: action.payload.symbol
            }
        default:
            return state;
    }
}