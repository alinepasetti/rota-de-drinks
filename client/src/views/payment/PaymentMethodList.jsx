import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { listPaymentMethods } from './../../services/payment-method';
import './Payment.scss';

class PaymentMethodListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethods: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const paymentMethods = await listPaymentMethods();
    this.setState({ paymentMethods });
  }

  render() {
    const loggedUser = this.props.user;
    return (
      <div>
        <h3>Payment Methods</h3>
        {this.state.paymentMethods.map(method => (
          <div className="payment__method--card" key={method._id}>
            <img src={`/card-brands/${method.brand}.png`} alt={method.brand} />
            <span>**** **** **** {method.lastFourDigits}</span>
            <span>
              {method.expirationDate.month}/{method.expirationDate.year}
            </span>
          </div>
        ))}
        <Link to={`/${loggedUser._id}/payment-method/create`}>Add new Payment Method</Link>
      </div>
    );
  }
}

export default PaymentMethodListView;
