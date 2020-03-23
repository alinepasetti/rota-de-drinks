import React, { Fragment, Component } from 'react';
import UsersPaymentMethods from './../components/UsersPaymentMethods';
import { listPaymentMethods } from './../services/payment-method';

class PaymentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      paymentMethods: [],
      selectedPaymentMethodIndex: 0
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.updatePaymentMethods = this.updatePaymentMethods.bind(this);
    this.selectedPaymentMethodIndex = this.selectedPaymentMethodIndex.bind(this);
  }

  async nextPage() {
    const selectedPaymentMethodIndex = this.state.selectedPaymentMethodIndex;
    await this.props.buyEvent(selectedPaymentMethodIndex);
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
    }, 3000);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.paymentMethods.length !== this.state.paymentMethods.length) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const paymentMethods = await listPaymentMethods();
    this.setState({ paymentMethods });
  }

  updatePaymentMethods(paymentMethods) {
    this.setState({ paymentMethods });
  }

  selectedPaymentMethodIndex(index) {
    this.setState({ selectedPaymentMethodIndex: index });
  }

  render() {
    const paymentModalOpen = this.props.paymentModalOpen;
    const page = this.state.page;
    const loggedUser = this.props.user;
    const paymentButtonEnabled = this.state.paymentMethods.length;

    return (
      <Fragment>
        {paymentModalOpen && (
          <div className="paymentModalOpen">
            <button onClick={this.props.handlepaymentModal}>x</button>
            {page === 1 && (
              <div>
                <h3>Select a payment method from your wallet</h3>
                <div>
                  <UsersPaymentMethods
                    fromModal={true}
                    paymentMethods={this.state.paymentMethods}
                    loggedUser={loggedUser._id}
                    updatePaymentMethods={this.updatePaymentMethods}
                    selectedPaymentMethodIndex={this.selectedPaymentMethodIndex}
                  />
                </div>
                {(paymentButtonEnabled && (
                  <button className="payment__method__button" onClick={this.nextPage}>
                    Pay Now
                  </button>
                )) || (
                  <button disabled onClick={this.nextPage}>
                    Pay Now
                  </button>
                )}
              </div>
            )}
            {page === 2 && (
              <div>
                {this.loadingSetTimeout()}
                <h3>Loading</h3>
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
                <button className="payment__method__button" onClick={this.props.handlepaymentModal}>
                  Cancel
                </button>
              </div>
            )}
            {page === 3 && (
              <div>
                <h3>Purchase was a success!</h3>
                <button className="payment__method__button" onClick={this.props.handlepaymentModal}>
                  Continue
                </button>
              </div>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

export default PaymentModal;
