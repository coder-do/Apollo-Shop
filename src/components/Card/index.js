import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/add.png';
import './style.sass';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            isOutOfStock, title, price, currency,
            mainImage, id, margin, product, onAdd
        } = this.props;

        return (
            <Link to={isOutOfStock ? '#' : `/product-details/${id}`}>
                <div className='card'
                    style={{ opacity: isOutOfStock ? 0.5 : 1, marginRight: margin ? "120px" : "0" }}
                >
                    <div style={{ position: 'relative' }}>
                        <img
                            className='card__image'
                            src={mainImage}
                            alt='Card Image'
                        />
                        {isOutOfStock && <p className='out'>OUT OF STOCK</p>}
                    </div>
                    <img
                        src={image}
                        alt='cart'
                        className={`${!isOutOfStock ? "show" : "hide"} add`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isOutOfStock) {
                                onAdd({
                                    ...product,
                                    qtty: 1
                                })
                            }
                        }}
                    />
                    <p className='card__header'>{title}</p>
                    <b className='card__price'>{currency}{price}</b>
                </div>
            </Link>
        )
    }
}