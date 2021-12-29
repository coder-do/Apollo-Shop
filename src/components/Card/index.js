import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/add.png';
import './style.sass';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { isOutOfStock } = this.props;
        return (
            <Link to={isOutOfStock ? '#' : '/product-details/1'}>
                <div className='card' style={{ opacity: isOutOfStock ? 0.5 : 1 }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            className='card__image'
                            src='https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg'
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
                                console.log("click")
                            }
                        }}
                    />
                    <p className='card__header'>Apollo Running Short</p>
                    <b className='card__price'>$50.00</b>
                </div>
            </Link>
        )
    }
}