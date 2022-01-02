import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../apollo/getData';
import { addProduct } from '../redux/actions';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import CardsWrapper from '../components/Card/CardsWrapper';
import Container from '../components/Container';

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
        const { addProd, currency } = this.props;

        return (
            <Container>
                <PageHeader>
                    All
                </PageHeader>

                <CardsWrapper around>
                    {products.length > 0 && products.map((product, i) => {
                        const price = product.prices.filter(el => el.currency.symbol === currency);
                        return (
                            <Card
                                key={i}
                                id={product.id}
                                onAdd={addProd}
                                product={product}
                                title={product.name}
                                mainImage={product.gallery[0]}
                                price={price[0].amount}
                                currency={price[0].currency.symbol}
                                isOutOfStock={!product.inStock}
                            />
                        )
                    })}
                </CardsWrapper>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProd: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);