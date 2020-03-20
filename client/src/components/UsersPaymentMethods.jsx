import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PaymentMethodCreate from './../views/payment/PaymentMethodCreate';

class UsersPaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      page: 1
    };
    this.changecolor = this.changecolor.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.backToPaymentsList = this.backToPaymentsList.bind(this);
  }
  nextPage() {
    this.setState(previousState => {
      return {
        page: previousState.page + 1
      };
    });
  }

  backToPaymentsList() {
    this.setState({ page: 1 });
  }

  changecolor(index) {
    if (this.props.fromModal) {
      this.setState({ selected: index });
    }
  }
  render() {
    const page = this.state.page;
    return (
      <Fragment>
        {page === 1 &&
          this.props.paymentMethods.length > 0 &&
          this.props.paymentMethods.map((method, index) => {
            if (this.state.selected === index) {
              return (
                <div
                  className="payment__method--card"
                  key={method._id}
                  style={{ backgroundColor: 'gray' }}
                  onClick={() => this.changecolor(index)}
                >
                  <img src={`/card-brands/${method.brand}.png`} alt={method.brand} />
                  <span>**** **** **** {method.lastFourDigits}</span>
                  <span>
                    {method.expirationDate.month}/{method.expirationDate.year}
                  </span>
                </div>
              );
            } else {
              return (
                <div
                  className="payment__method--card"
                  key={method._id}
                  style={{ backgroundColor: 'transparent' }}
                  onClick={() => this.changecolor(index)}
                >
                  <img src={`/card-brands/${method.brand}.png`} alt={method.brand} />
                  <span>**** **** **** {method.lastFourDigits}</span>
                  <span>
                    {method.expirationDate.month}/{method.expirationDate.year}
                  </span>
                </div>
              );
            }
          })}
        {(this.props.fromModal && (
          <button onClick={this.nextPage}>Add new Payment Method</button>
        )) || (
          <Link to={`/${this.props.loggedUser}/payment-method/create`}>Add new Payment Method</Link>
        )}

        {page === 2 && (
          <PaymentMethodCreate fromModal={true} backToPaymentsList={this.backToPaymentsList} />
        )}
      </Fragment>
    );
  }
}

export default UsersPaymentMethods;
