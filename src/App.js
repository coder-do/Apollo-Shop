import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";

import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ClothesPage from './pages/ClothesPage';
import TechPage from './pages/TechPage';
import Modal from './components/Modal';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.close = this.close.bind(this);
        this.show = this.show.bind(this);
    }

    show() {
        this.setState({ show: true })
    }

    close() {
        this.setState({ show: false })
    }

    render() {
        return (
            <>
                <div className='container'>
                    <Header show={this.show} />
                    <div className='wrapper'>
                        <Modal title="My Modal" onClose={this.close} show={this.state.show}>
                            <p>This is modal body</p>
                        </Modal>
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
                </div >
            </>
        )
    }
}