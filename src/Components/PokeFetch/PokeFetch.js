import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.countDown = this.countDown.bind(this)
    this.timeout = 0
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      seconds: 10,
      filter: "brightness(0) saturate(100%)"
    }
  }

  countDown() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 })
    }
  }

  fetchPokemon() {
    this.setState({ seconds: 10 })
    clearInterval(this.timeout)
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))

    this.timeout = setInterval(this.countDown, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }


  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.seconds}</h1>
        <div className={'pokeWrap'}>
          {this.state.seconds > 0 ?
            <img className={'pokeImg'} style={{ filter: "brightness(0) saturate(100%)" }} src={this.state.pokeSprite} />
            : <img className={'pokeImg'} style={{ filter: "" }} src={this.state.pokeSprite} />}
          {this.state.seconds > 0 ?
            <h1 className={'pokeName'} style={{ opacity: "0%" }}>{this.state.pokeName}</h1>
            : <h1 className={'pokeName'} style={{ opacity: "100%" }}>{this.state.pokeName}</h1>}
        </div>
      </div>
    )
  }
}

export default PokeFetch;