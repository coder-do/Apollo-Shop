import React, { Component } from 'react';
import ProductDetail from '../components/ProductDetail';
import { getData } from '../apollo/getData';
import { withRouter } from '../utils/withRouter';

class ProductDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    async componentDidMount() {
        const { id } = this.props.params;
        let prod = (await getData()).products.filter(el => {
            return el.id === id
        });
        this.setState(prev => ({
            ...prev,
            product: prod[0]
        }))
    }


    render() {
        const { product } = this.state;
        return (
            product && (
                <ProductDetail
                    images={product.gallery}
                />
            )
        )
    }
}


export default withRouter(ProductDetailsPage)