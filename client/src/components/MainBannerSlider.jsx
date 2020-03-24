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
            <h1>Dusk till Dawn</h1>
            <p>This is what Cappadocia promises you</p>
          </header>
        )}
        {banner === 2 && (
          <header onChange={this.changeBanner} className="home__header__2 home__header">
            <h1>Assassin's Creed in Paris</h1>
            <p>Explore this beautiful city like a real nerd</p>
          </header>
        )}
        {banner === 3 && (
          <header onChange={this.changeBanner} className="home__header__3 home__header">
            <h1>Walk through the Portuguese Tradition</h1>
            <p>Try its million flavours</p>
          </header>
        )}
      </Fragment>
    );
  }
}
