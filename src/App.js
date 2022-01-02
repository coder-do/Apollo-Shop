import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ClothesPage from './pages/ClothesPage';
import TechPage from './pages/TechPage';
import Modal from './components/Modal';
import Container from './components/Container';
import { currencyChange } from './redux/actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.close = this.close.bind(this);
        this.show = this.show.bind(this);
    }

    show() {
        this.setState({ show: true });
        // prevent scroll when modal is open 
        document.body.style.overflow = 'unset';
    }

    close() {
        this.setState({ show: false });
        // set scroll visible when modal is closed 
        document.body.style.overflow = 'visible'
    }

    render() {
        const { items, changeCurrency, products, currency } = this.props;
        return (
            <Container>
                <Header show={this.show} items={items} changeCurrency={changeCurrency} />
                <div className='wrapper'>
                    <Modal
                        products={products}
                        currency={currency}
                        onClose={this.close}
                        show={this.state.show}
                    />
                </div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="clothes" element={<ClothesPage />} />
                    <Route path="tech" element={<TechPage />} />
                    <Route path="product-details/:id" element={<ProductDetailsPage />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        items: state.products.length,
        products: state.products,
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeCurrency: (symbol) => dispatch(currencyChange(symbol))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);