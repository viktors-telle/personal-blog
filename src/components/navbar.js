import React, { useState } from "react"
import styled from "styled-components"
import Logo from "./logo"
import NavbarLinks from "./navbarLinks"

const Navigation = styled.nav`
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    margin: 0 auto;
    max-width: 64rem;
    z-index: 2;
    position: relative;
    background-color: #fff;

    @media (max-width: 768px) {
        height: 9vh;
        position: sticky;
        top: 0;
        padding: 0 2vw;
    }
`

const Toggle = styled.div`
    display: none;
    cursor: pointer;
    align-self: center;

    @media (max-width: 768px) {
        display: flex;
    }
`

const Navbox = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        position: fixed;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        background-color: white;
        height: 100vh;
        top: 9vh;
        left: ${({ open }) => (open ? "0" : "-100%")};
        transition: left 0.3s ease-in-out;
    }
`

const Hamburger = styled.div`
    background-color: #111;
    width: 30px;
    height: 3px;
    transition: all 0.3s linear;
    align-self: center;
    position: relative;
    transform: ${(props) => (props.open ? "rotate(-45deg)" : "inherit")};

    &:before,
    &:after {
        width: 30px;
        height: 3px;
        background-color: #111;
        content: "";
        position: absolute;
        transition: all 0.3s linear;
    }

    &:before {
        transform: ${(props) =>
                props.open ? "rotate(-90deg) translate(-12px, 0px)" : "rotate(0deg)"};
        top: -12px;
    }

    &:after {
        opacity: ${(props) => (props.open ? "0" : "1")};
        transform: ${(props) => (props.open ? "rotate(90deg) " : "rotate(0deg)")};
        top: 12px;
    }
`

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <Navigation>
      <Logo />
      <Toggle
        onClick={() => setNavbarOpen(!navbarOpen)}
        aria-label="Toggle navigation menu"
      >
        <Hamburger open={navbarOpen} />
      </Toggle>
      <Navbox open={navbarOpen}>
        <NavbarLinks />
      </Navbox>
    </Navigation>
  )
}

export default Navbar
