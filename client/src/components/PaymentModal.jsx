import React, { Fragment, Component } from 'react';
import UsersPaymentMethods from './../components/UsersPaymentMethods';
import { listPaymentMethods } from './../services/payment-method';

class PaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      paymentMethods: []
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    // this.changeColor = this.changeColor.bind(this);
  }

  async nextPage() {
    await this.props.buyEvent();
    this.setState(previousState => {
      return {
        page: previousState.page + 1
      };
    });
  }

  previousPage() {
    this.setState(previousState => {
      return {
        page: previousState.page - 1
      };
    });
  }

  loadingSetTimeout() {
    setTimeout(() => {
      this.setState({ page: 3 });
    }, 5000);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const paymentMethods = await listPaymentMethods();
    this.setState({ paymentMethods });
  }

  // changeColor() {
  //   console.log('changeee');
  //   return 'changeeee';
  // }

  render() {
    const paymentModalOpen = this.props.paymentModalOpen;
    const page = this.state.page;
    const loggedUser = this.props.user;
    return (
      <Fragment>
        {paymentModalOpen && (
          <div className="paymentModalOpen">
            <button onClick={this.props.handlepaymentModal}>x</button>
            {page === 1 && (
              <div>
                <p>Select a payment methods from your wallet</p>
                <div>
                  <UsersPaymentMethods
                    changeColor={true}
                    paymentMethods={this.state.paymentMethods}
                    loggedUser={loggedUser._id}
                  />
                </div>
                <button onClick={this.nextPage}>Continue</button>
              </div>
            )}
            {page === 2 && (
              <div>
                {this.loadingSetTimeout()}
                <p>Loading</p>
                <div className="loadingio-spinner-spinner-7m4bdiq50c4">
                  <div className="ldio-hatmn2q2jgf">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <style type="text/css"></style>
                <button onClick={this.props.handlepaymentModal}>Cancel</button>
              </div>
            )}
            {page === 3 && (
              <div>
                <p>Purchase was a success!</p>
                <button onClick={this.props.handlepaymentModal}>Continue</button>
              </div>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

export default PaymentModal;
