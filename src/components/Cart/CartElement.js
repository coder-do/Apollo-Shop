import React, { Component } from 'react';
import right from '../../assets/right.svg';
import left from '../../assets/left.svg';
import './style.sass';

export default class CartElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            currentImage: '',
            currentImageIndex: 0,
            attributes: [],
            currentSize: 'S',
            currentColor: '#',
            currentCapacity: '',
            qtty: 1
        };

        this.setSize = this.setSize.bind(this);
        this.counter = this.counter.bind(this);
        this.setCurrentImage = this.setCurrentImage.bind(this);
    }

    componentDidMount() {
        this.forceUpdate();
    }

    componentDidUpdate() {
        if (this.state.currentImage === '') {
            this.setState(prev => ({
                ...prev,
                qtty: this.props.product && this.props.product.qtty,
                images: this.props.product && this.props.product.gallery,
                currentImage: this.props.product && this.props.product.gallery[0],
                attributes: this.props.product && this.props.product.attributes
            }))
        }
        if (this.props.product) {
            if (this.props.product.qtty !== this.state.qtty) {
                this.setState(prev => ({
                    ...prev,
                    qtty: this.props.product.qtty
                }))
            }
        }
    }

    counter(n) {
        if (n < 0) {
            return;
        }
        this.setState(prev => ({
            ...prev,
            qtty: n
        }))
    }

    setSize(size) {
        console.log(size);
        this.setState(prev => ({
            ...prev,
            currentSize: size
        }))
    }

    setCurrentImage(index) {
        const { images } = this.state;
        if (images.length > 0) {
            if (index < 0) {
                index = images.length - 1;
            }
            if (index > images.length - 1) {
                index = 0;
            }
            this.setState(prev => ({
                ...prev,
                currentImage: images[index],
                currentImageIndex: index
            }))
        }
    }

    render() {
        const {
            currentSize, currentImageIndex,
            currentImage, images, qtty
        } = this.state;
        const { small, product, currency, onAdd } = this.props;
        const price = product && product.prices.filter(el => el.currency.symbol === currency);
        const attributes = product && product.attributes;
        return (
            <>
                {!small && <hr className='line' />}
                {product && (<div className={`cart ${small && 'small'}`}>
                    <div className='cart__block1'>
                        <h3 className='cart__header'>{product.name}</h3>
                        <p className='cart__subheader'>{product.brand}</p>
                        <p className='cart__price'><b>{price[0].amount} {price[0].currency.symbol}</b></p>
                        <div >
                            {attributes.length === 0 && <p style={{ fontSize: '15px', color: 'red' }}>Without attributes</p>}
                            {
                                attributes.length > 0 &&
                                attributes.map(attribute => {
                                    return (
                                        <div key={Math.random() * 12}>
                                            <h3 className='attribute'>{attribute.name !== 'Size' && attribute.name}</h3>
                                            <div className='sizes__wrapper'>
                                                {attribute.items.map(item => (
                                                    <div
                                                        key={item.value}
                                                        style={
                                                            {
                                                                backgroundColor: attribute.name === 'Color' && item.value,
                                                                width: attribute.name === 'Capacity' && !small && '60px',
                                                                width: attribute.name === 'Capacity' && small && '50px'
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
                    <div className='cart__block2'>
                        <div className='counter'>
                            <div
                                className='product__size counter__item'
                                onClick={() => onAdd(product)}
                            >
                                &#43;
                            </div>
                            <p className='counter__number'>{qtty}</p>
                            <div
                                className={`product__size counter__item ${qtty == 0 && 'disabled'}`}
                                onClick={() => onAdd(product, 1)}
                            >
                                &#45;
                            </div>
                        </div>
                        <div className='images'>
                            {
                                images.length > 1 && (
                                    <>
                                        <img
                                            className='left arrow'
                                            src={left.toString()}
                                            onClick={() => this.setCurrentImage(currentImageIndex - 1)}
                                            alt='left'
                                        />
                                        <img
                                            className='right arrow'
                                            src={right.toString()}
                                            onClick={() => this.setCurrentImage(currentImageIndex + 1)}
                                            alt='right'
                                        />
                                    </>
                                )
                            }
                            <img
                                className='item__image'
                                src={currentImage.toString()}
                                alt='cart item image'
                            />
                        </div>
                    </div>
                </div>
                )}
            </>
        )
    }
}