export const initialState = {
    products: [],
    currency: '$'
}

function checkParams(prevSizes, currentSizes) {
    let add = false;
    prevSizes.map((size, index) => size.items && size.items.map((item, itemInd) => {
        console.log(item);
        if (item && item.selected !== currentSizes[index].items[itemInd].selected) {
            add = true;
        }
    }))
    return add;
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            let newProd, currentSizes = [];
            const { product } = action.payload;
            let exist = state.products.filter(el => !checkParams(el.sizes, product.sizes));

            console.log('EXIST ---> ', exist);

            let add = false;
            if (exist.length > 0) {
                currentSizes = product.sizes;
                state.products.map(prod => {
                    if (!checkParams(product.sizes, prod.sizes)) {
                        console.log("TRUE AND QTTY++");
                        prod.qtty += 1;
                        console.log("1...PRODUCT QTTY++", product);
                        add = false;
                    }
                })
                add ? newProd = [...state.products, product] : newProd = [...state.products];
                console.log('NEED TO ADD -> ', add);
            }

            if (exist.length === 0) {
                newProd = [...state.products, product];
            }

            console.log('NEWPROD -> ', newProd);
            console.log('--------------------------------------------------------------------------------------');
            return {
                ...state,
                products: newProd
            };
        case 'REMOVE_PRODUCT':
            let newProduct;
            if (action.payload.product.qtty - 1 === 0) {
                if (window.confirm('Are you sure to remove cart item?')) {
                    newProduct = state.products.filter(prod => checkParams(prod.sizes, action.payload.product.sizes));
                } else {
                    newProduct = state.products.map(prod => {
                        if (!checkParams(prod.sizes, action.payload.product.sizes)) {
                            prod.qtty = 1;
                        }
                        return prod;
                    })
                }
            }
            if (action.payload.product.qtty > 1) {
                newProduct = state.products.map(prod => {
                    if (!checkParams(prod.sizes, action.payload.product.sizes)) {
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
};

// export const initialState = {
//     products: [],
//     currency: '$'
// }

// function checkParams(prevSizes, currentSizes) {
//     let add = false;
//     prevSizes.map((size, index) => size.items.map((item, itemInd) => {
//         if (item.selected !== currentSizes[index].items[itemInd].selected) {
//             console.log('DOES NOT MATCH');
//             add = true;
//         }
//         if (!add) {
//             console.log('MATCH');
//             add = false;
//         }
//     }))
//     return add;
// }

// export const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'ADD_PRODUCT':
//             let newProd;
//             let exist = state.products.filter(el => el.id === action.payload.product.id);
//             console.log('EXIST ---> ', exist);
//             if (exist.length > 0) {
//                 newProd = state.products.map(prod => {
//                     if (prod.id === exist[0].id) {
//                         prod.qtty++;
//                     }
//                     return prod;
//                 })
//             } if (exist.length === 0) {
//                 newProd = [...state.products, action.payload.product];
//             }

//             console.log('--------------------------------------------------------------------------------------');
//             return {
//                 ...state,
//                 products: newProd
//             };
//         case 'REMOVE_PRODUCT':
//             let newProduct;
//             if (action.payload.product.qtty - 1 === 0) {
//                 if (window.confirm('Are you sure to remove cart item?')) {
//                     newProduct = state.products.filter(prod => prod.id !== action.payload.product.id);
//                 } else {
//                     newProduct = state.products.map(prod => {
//                         if (prod.id === action.payload.product.id) {
//                             prod.qtty = 1;
//                         }
//                         return prod;
//                     })
//                 }
//             }
//             if (action.payload.product.qtty > 1) {
//                 newProduct = state.products.map(prod => {
//                     if (prod.id === action.payload.product.id) {
//                         prod.qtty--;
//                     }
//                     return prod;
//                 })
//             }
//             return {
//                 ...state,
//                 products: newProduct
//             }
//         case 'CHANGE_CURRENCY':
//             return {
//                 ...state,
//                 currency: action.payload.symbol
//             }
//         default:
//             return state;
//     }
// }