import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

class UsersPaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
    this.changecolor = this.changecolor.bind(this);
  }

  changecolor(index) {
    if (this.props.changeColor) {
      this.setState({ selected: index });
    }
  }
  render() {
    return (
      <Fragment>
        {this.props.paymentMethods &&
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
        <Link to={`/${this.props.loggedUser}/payment-method/create`}>Add new Payment Method</Link>
      </Fragment>
    );
  }
}

export default UsersPaymentMethods;
