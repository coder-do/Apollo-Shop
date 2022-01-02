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
            return true;
        }
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
        const { product, images, currency, onAdd } = this.props;

        const { prices, name, brand, description } = product;
        const price = prices && prices.filter(el => el.currency.symbol === currency);
        const attributes = product && product.attributes;

        const finalProduct = JSON.parse(JSON.stringify(product));

        if (!product.hasOwnProperty('qtty')) {
            finalProduct.qtty = 1;
        }

        return (
            <>
                {product && (
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
                            <h2 className='product__header'>{name}</h2>
                            <p className='product__subheader'>{brand}</p>
                            <div className='product__sizes'>
                                <div style={{
                                    display: 'flex', flexDirection: 'column',
                                    maxWidth: '300px'
                                }}>
                                    {attributes && attributes.length === 0 && <p style={{ fontSize: '15px', color: 'red' }}>Without attributes</p>}
                                    {
                                        attributes &&
                                        attributes.length > 0 &&
                                        attributes.map(attribute => {
                                            return (
                                                <div key={Math.random() * 12}>
                                                    <h3 style={{ fontSize: '20px', margin: '10px 0' }}>{attribute.name}:</h3>
                                                    <div className='sizes__wrapper'>
                                                        {attribute.items.map(item => (
                                                            <div
                                                                key={item.value}
                                                                style={
                                                                    {
                                                                        backgroundColor: attribute.name === 'Color' && item.value,
                                                                        width: attribute.name === 'Capacity' && '60px',
                                                                    }
                                                                }
                                                                className={`product__size ${currentSize === item.value ? 'size' : ''}`}
                                                                onClick={(e) => this.setSize(e.target.value)}
                                                            >
                                                                {attribute.name !== 'Color' && item.value}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='product__price'>
                                <p><b>PRICE:</b></p>
                                <span>{price && price[0].currency.symbol}{price && price[0].amount}</span>
                            </div>
                            <button
                                className='product__btn'
                                onClick={() => onAdd(finalProduct)}
                            >
                                Add to cart
                            </button>
                            <p className='product__descr' dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                    </div>
                )}
            </>)
    }
}