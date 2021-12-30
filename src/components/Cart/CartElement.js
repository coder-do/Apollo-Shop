import React, { Component } from 'react';
import right from '../../assets/right.svg';
import left from '../../assets/left.svg';
import './style.sass';

export default class CartElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
            ],
            currentImage: 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
            currentImageIndex: 0,
            sizes: ['XS', 'S', 'M', 'L'],
            currentSize: 'S',
            qtty: 1
        };

        this.setSize = this.setSize.bind(this);
        this.counter = this.counter.bind(this);
        this.setCurrentImage = this.setCurrentImage.bind(this);
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

    render() {
        const {
            sizes, currentSize, currentImageIndex,
            currentImage, images, qtty
        } = this.state;
        const { small } = this.props;

        return (
            <>
                {!small && <hr className='line' />}
                <div className={`cart ${small && 'small'}`}>
                    <div className='cart__block1'>
                        <h3 className='cart__header'>Apollo</h3>
                        <p className='cart__subheader'>Running Short</p>
                        <p className='cart__price'><b>{`$ 50.00`}</b></p>
                        <div className='sizes__wrapper'>
                            {sizes.map(size => (
                                <div key={size} className={`product__size ${currentSize === size ? 'size' : ''}`}
                                    onClick={() => this.setSize(size)}>
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='cart__block2'>
                        <div className='counter'>
                            <div
                                className='product__size counter__item'
                                onClick={() => this.counter(qtty + 1)}
                            >
                                &#43;
                            </div>
                            <p className='counter__number'>{qtty}</p>
                            <div
                                className={`product__size counter__item ${qtty == 0 && 'disabled'}`}
                                onClick={() => this.counter(qtty - 1)}
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
            </>
        )
    }
}