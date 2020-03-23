import React, { Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { createPaymentMethod } from './../../services/payment-method';
import './Payment.scss';
const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

class PaymentMethodCreateView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }

  componentDidMount() {
    this.setState({});
  }

  async handleFormSubmission(event, stripe, elements) {
    event.preventDefault();
    const loggedUser = this.props.user;
    const data = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    const { error, paymentMethod } = data;
    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
      const newPaymentMethod = await createPaymentMethod(paymentMethod.id);
      console.log('newPaymentMethod', newPaymentMethod);
      if (this.props.fromModal) {
        this.props.updatePaymentMethods(newPaymentMethod);
        this.props.backToPaymentsList();
      } else {
        this.props.history.push(`/${loggedUser._id}/payment-method/list`);
      }
    }
  }

  render() {
    const STRIPE_ELEMENT_OPTIONS = {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          fontFamily: 'sans-serif'
        },
        invalid: {
          color: '#c23d4b'
        }
      }
    };
    return (
      <div className="payment__create__page">
        <h3>Add new Payment Method</h3>
        <Elements stripe={this.stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form onSubmit={event => this.handleFormSubmission(event, stripe, elements)}>
                {/* <label htmlFor="name">Name</label> */}
                <CardElement options={STRIPE_ELEMENT_OPTIONS} />
                <button className="payment__method__button">Add Payment Method</button>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    );
  }
}

export default PaymentMethodCreateView;
