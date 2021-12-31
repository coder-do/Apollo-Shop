import React, { Component } from 'react';
import './style.sass';

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentImage: '',
            sizes: ['XS', 'S', 'M', 'L'],
            currentSize: 'XS'
        };
    }

    componentDidUpdate() {
        if (this.state.currentImage === '') {
            this.setState(prev => ({
                ...prev,
                currentImage: this.props.images[0]
            }))
            return false;
        }
        return false;
    }

    setSize(size) {
        console.log(size);
        this.setState(prev => ({
            ...prev,
            currentSize: size,
        }))
    }

    render() {
        const { currentImage, currentSize, sizes } = this.state;
        const { images } = this.props;
        return (
            <div className='product product__wrapper'>
                <div className='product__images-small'>
                    {images && images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            style={{ border: currentImage === image ? "1px solid black" : "none" }}
                            onClick={() => this.setState((prev) => ({
                                ...prev,
                                currentImage: image
                            }))}
                            alt='Product image'
                        />
                    ))}
                </div>
                <div className='product__images-big'>
                    <img
                        src={currentImage}
                        alt='Product image'
                    />
                </div>
                <div className='product__block'>
                    <h2 className='product__header'>{'Apollo'}</h2>
                    <p className='product__subheader'>{'Running Short'}</p>
                    <div className='product__sizes'>
                        <p><b>SIZE:</b></p>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            maxWidth: '300px'
                        }}>
                            {sizes.map(size => (
                                <div key={size} className={`product__size ${currentSize === size ? 'size' : ''}`}
                                    onClick={() => this.setSize(size)}>
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='product__price'>
                        <p><b>PRICE:</b></p>
                        <span>{'$50.00'}</span>
                    </div>
                    <button className='product__btn'>Add to cart</button>
                    <p className='product__descr'>
                        {'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.'}
                    </p>
                </div>
            </div>
        )
    }
}