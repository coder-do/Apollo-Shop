import React, { Component } from 'react';
import image from '../../assets/cart.svg';

export default class CurrencyBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '$'
        }
    }

    shouldComponentUpdate(props, nextState) {
        return nextState.selectedValue !== this.state.selectedValue
            || props.items !== this.props.items;
    }


    render() {
        const { items, changeCurrency } = this.props;
        return (
            <div className='currency'>
                <div className='currency__block'>
                    <select defaultValue={' '} onChange={(e) => changeCurrency(e.target.value)}>
                        <option value='$'>$ USD</option>
                        <option value='£'>£ EUR</option>
                        <option value='¥'>¥ JPY</option>
                        <option value='₽'>₽ RUB</option>
                        <option value='A$'>A$ AUD</option>
                    </select>
                </div>
                <div onClick={this.props.show} style={{
                    cursor: 'pointer'
                }}>
                    <span className='number'>{items}</span>
                    <img

                        src={image}
                        alt='cart'
                    />
                </div>
            </div>
        )
    }
}