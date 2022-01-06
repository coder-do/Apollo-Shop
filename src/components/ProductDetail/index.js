import React, { Component } from 'react';
import './style.sass';

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizes: [],
            currentImage: ''
        };
    }

    componentDidUpdate() {
        if (this.state.currentImage === '') {
            this.setState(prev => ({
                ...prev,
                currentImage: this.props.images[0],
                sizes: this.props.product.attributes
            }))
            return true;
        }
    }

    setSize(name, size, product) {
        // let exists = JSON.parse(JSON.stringify(product));
        product.sizes.map(el => {
            el.items.map(item => {
                if (item.value === size && name === el.name) {
                    item.selected = true;
                }
                if (name === el.name && item.value !== size) {
                    item.selected = false;
                }
                return item;
            })
            return el;
        });
        this.setState(prev => ({
            ...prev,
            sizes: product.sizes,
        }))
    }

    render() {
        const { currentImage, sizes } = this.state;
        const { product, images, currency, onAdd } = this.props;

        const { prices, name, brand, description, inStock } = product;

        const price = prices && prices.filter(el => el.currency.symbol === currency);

        const finalProduct = JSON.parse(JSON.stringify(product));

        if (!product.hasOwnProperty('qtty')) {
            finalProduct.qtty = 1;
        }

        if (!product.hasOwnProperty('sizes')) {
            finalProduct.sizes = sizes.length > 0 && sizes;
        };

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
                                    {sizes && sizes.length === 0 && <p style={{ fontSize: '15px', color: 'red' }}>Without attributes</p>}
                                    {
                                        sizes.length > 0 &&
                                        sizes.map(size => {
                                            return (
                                                <div key={Math.random() * 12}>
                                                    <h3 style={{ fontSize: '20px', margin: '10px 0' }}>{size.name}:</h3>
                                                    <div className='sizes__wrapper'>
                                                        {size.items.map(item => (
                                                            <div
                                                                key={item.value}
                                                                style={
                                                                    {
                                                                        backgroundColor: size.name === 'Color' && item.value,
                                                                        transform: size.name === 'Color' && item.selected && "scale(0.8)",
                                                                        width: size.name === 'Capacity' && '60px',
                                                                    }
                                                                }
                                                                className={`product__size ${item.selected ? 'size' : ''}`}
                                                                onClick={() => this.setSize(size.name, item.value, product)}
                                                            >
                                                                {size.name !== 'Color' && item.value}
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
                                disabled={!inStock}
                                className='product__btn'
                                onClick={() => onAdd(finalProduct)}
                            >
                                {!inStock ? 'OUT OF STOCK' : 'Add to cart'}
                            </button>
                            <p className='product__descr' dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                    </div>
                )}
            </>)
    }
}