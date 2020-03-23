import React, { Component, Fragment } from 'react';

export default class MainBannerSlider extends Component {
  constructor() {
    super();
    this.state = {
      banner: 1
    };
    this.changeBanner = this.changeBanner.bind(this);
  }

  componentDidUpdate(previousState, previousProps) {
    if (previousState.banner !== this.state.banner) {
      this.changeBanner();
    }
  }

  componentDidMount() {
    this.changeBanner();
  }

  changeBanner() {
    const changeNumber = this.state.banner === 1 ? 2 : this.state.banner === 2 ? 3 : 1;
    setTimeout(() => {
      this.setState({ banner: changeNumber });
    }, 3500);
  }
  render() {
    const banner = this.state.banner;
    return (
      <Fragment>
        {banner === 1 && (
          <header onChange={this.changeBanner} className="home__header__1 home__header">
            <h1>Hey Friday</h1>
            <p>Gather friends and badges</p>
          </header>
        )}
        {banner === 2 && (
          <header onChange={this.changeBanner} className="home__header__2 home__header">
            <h1>Second</h1>
            <p>Gather friends and badges</p>
          </header>
        )}
        {banner === 3 && (
          <header onChange={this.changeBanner} className="home__header__3 home__header">
            <h1>third</h1>
            <p>Gather friends and badges</p>
          </header>
        )}
      </Fragment>
    );
  }
}
