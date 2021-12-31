import React, { Component } from 'react';
import Card from '../components/Card';
import { getData } from '../apollo/getData';

export default class TechPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        const data = (await getData()).tech;
        this.setState(prev => ({
            ...prev,
            products: data
        }))
    }

    render() {
        const { products } = this.state;
        return (
            <div className='container'>
                <h1 style={{
                    fontSize: '42px', lineHeight: '160%', color: '#1D1F22', fontWeight: 400,
                    marginTop: "80px", marginBottom: "50px",


                }}>Tech</h1>

                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                }}>
                    {products.length > 0 && products.map((product, i) => (
                        <Card
                            key={i}
                            id={product.id}
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