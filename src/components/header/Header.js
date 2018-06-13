import React from 'react'
import Link from 'gatsby-link'
import BG from './Hero_BG.jpg'
import styled from 'react-emotion'
import logoLarge from '../../assets/logoLarge.png'
import logoSmall from '../../assets/logoSmall.png'
import ethereum from '../../assets/ethereum.png'
import nameService from '../../assets/nameService.png'

function modulate(value, rangeA, rangeB, limit) {
  let fromHigh, fromLow, result, toHigh, toLow
  if (limit == null) {
    limit = false
  }
  fromLow = rangeA[0]
  fromHigh = rangeA[1]
  toLow = rangeB[0]
  toHigh = rangeB[1]
  result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow)
  if (limit === true) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow
      }
      if (result > toHigh) {
        return toHigh
      }
    } else {
      if (result > toLow) {
        return toLow
      }
      if (result < toHigh) {
        return toHigh
      }
    }
  }
  return result
}

const StickyHeader = styled('header')`
  position: fixed;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: scale(0.7);

  padding: 10px 0;
  z-index: 1000;

  img {
    margin-bottom: 0;
  }
`

const HeroBG = styled('div')`
  background: url(${BG});
  background-size: cover;
  background-position: center center;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
  }
  .ens-logo {
    width: 60%;
    margin-bottom: 15px;
  }

  .ethereum-logo {
    width: 100%;
  }

  .name-service {
    width: 75%;
  }
`

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.header = React.createRef()
    this.logo = React.createRef()
    this.stickyHeader = React.createRef()
    console.log(this.header)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    let bodyHeight = document.body.clientHeight
    let scrollRange1 = [0, bodyHeight]
    let scrollRange2 = [0, 200]
    const headerHeight = modulate(
      window.pageYOffset,
      scrollRange1,
      [bodyHeight, 100],
      true
    )

    const logoWidth = modulate(window.pageYOffset, scrollRange1, [20, 10], true)
    const logoMargin = modulate(
      window.pageYOffset,
      scrollRange1,
      [0, bodyHeight],
      true
    )

    const stickyOpacity = modulate(
      window.pageYOffset,
      [bodyHeight - 100, bodyHeight],
      [0, 1],
      true
    )

    const stickyScale = modulate(
      window.pageYOffset,
      [bodyHeight - 100, bodyHeight],
      [0.7, 1],
      true
    )

    //this.header.current.style.height = headerHeight + 'px'
    this.logo.current.style.width = logoWidth + '%'
    this.logo.current.style.marginBottom = `-${logoMargin}px`
    this.stickyHeader.current.style.opacity = stickyOpacity
    this.stickyHeader.current.style.transform = `scale(${stickyScale}`
  }
  render() {
    return (
      <React.Fragment>
        <StickyHeader innerRef={this.stickyHeader}>
          <img src={logoSmall} />
        </StickyHeader>
        <HeroBG innerRef={this.header}>
          <a href="#" className="logo" ref={this.logo}>
            <img src={logoLarge} className="ens-logo" />
            <img src={ethereum} className="ethereum-logo" />
            <img src={nameService} className="name-service" />
            {/* <div className="name-service">Name Service</div> */}
          </a>
        </HeroBG>
      </React.Fragment>
    )
  }
}

export default Header
