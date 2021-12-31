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
        const { selectedValue } = this.state;
        const { items } = this.props;
        console.log(selectedValue);
        return (
            <div className='currency'>
                <div className='currency__block'>
                    {/* <label htmlFor='cur'>
                        {selectedValue}
                        <select id='cur' name='cur' onChange={(e) => this.setState((prevState) => ({
                            ...prevState,
                            selectedValue: e.target.value
                        }))} value={selectedValue}>
                            <option value='$'>$ USD</option>
                            <option value='£'>£ EUR</option>
                            <option value='¥'>¥ JPY</option>
                        </select>
                    </label> */}
                    <select onChange={(e) => this.setState((prevState) => ({
                        ...prevState,
                        selectedValue: e.target.value
                    }))}>
                        <option value='$'>$ USD</option>
                        <option value='£'>£ EUR</option>
                        <option value='¥'>¥ JPY</option>
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