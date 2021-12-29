import React, { Component } from 'react';
import './style.sass';

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
            ],
            currentImage: 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
            sizes: ['XS', 'S', 'M', 'L'],
            currentSize: 'XS'
        }
    }

    setSize(size) {
        console.log(size);
        this.setState(prev => ({
            ...prev,
            currentSize: size
        }))
    }

    render() {
        const { images, currentImage, currentSize, sizes } = this.state;
        return (
            <div className='product product__wrapper'>
                <div className='product__images-small'>
                    {images.map((image, i) => (
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