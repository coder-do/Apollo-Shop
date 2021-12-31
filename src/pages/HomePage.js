import React, { Component } from 'react';
import Card from '../components/Card';
import { connect } from 'react-redux';
import { getData } from '../apollo/getData';
import { addProduct } from '../redux/actions';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        const data = (await getData()).products;
        this.setState(prev => ({
            ...prev,
            products: data
        }))
    }

    render() {
        const { products } = this.state;
        const { allProducts, addProd } = this.props;

        return (
            <div className='container'>
                <h1 style={{
                    fontSize: '42px', lineHeight: '160%', color: '#1D1F22', fontWeight: 400,
                    marginTop: "80px", marginBottom: "50px",
                }}>All</h1>

                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'
                }}>
                    {products.length > 0 && products.map((product, i) => (
                        <Card
                            key={i}
                            id={product.id}
                            product={product}
                            onAdd={addProd}
                            title={product.name}
                            mainImage={product.gallery[0]}
                            price={product.prices[0].amount}
                            currency={product.prices[0].currency.symbol}
                            isOutOfStock={!product.inStock}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allProducts: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProd: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);