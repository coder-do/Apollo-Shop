export const initialState = {
    products: [],
    currency: '$'
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            let newProd;
            let exist = state.products.filter(el => el.id === action.payload.product.id);
            if (action.payload.qtty === 1) {
                exist = [];
                newProd = state.products.map(prod => {
                    if (prod.id === action.payload.product.id && action.payload.product.qtty !== 0) {
                        console.log(prod);
                        prod.qtty--;
                    }
                    return prod;
                })
            }
            if (exist.length > 0) {
                console.log('execute exist');
                newProd = state.products.map(prod => {
                    if (prod.id === exist[0].id) {
                        prod.qtty++;
                    }
                    return prod;
                })
            } if (exist.length === 0 && action.payload.qtty !== 1) {
                console.log('execute lenght === 0');
                newProd = [...state.products, action.payload.product];
            }
            return {
                ...state,
                products: newProd
            };
        case 'CHANGE_CURRENCY':
            return {
                ...state,
                currency: action.payload.symbol
            }
        default:
            return state;
    }
}