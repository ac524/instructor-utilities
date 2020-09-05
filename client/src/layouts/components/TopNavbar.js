import React, { useState } from "react";

import { Navbar } from "react-bulma-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoginButton, LogoutButton } from "../../components/Login";
import { useIsAuthenticated } from "../../utils/auth";
import { Link } from "react-router-dom";

const { Brand, Item, Burger, Menu, Container } = Navbar;

function TopNavbar() {

  const [ isNavActive, setIsNavActive ] = useState( false );

  const isAuth = useIsAuthenticated();

  return(
    <Navbar active={isNavActive}>
      <Brand>
        <Item renderAs={Link} to="/">
          <img src="/images/logo-color.png" alt="Classroom Logo" />
          { 
            isAuth
              ? ( <span><FontAwesomeIcon icon={['far','arrow-alt-circle-left']} /> Back to Class</span> )
              : <span className="has-text-weight-bold">Classroom</span>
          }
        </Item>
        <Burger onClick={() => setIsNavActive( !isNavActive )} />
      </Brand>
      <Menu>
        <Container position="end">
          <Item renderAs="div">
              { isAuth ? <LogoutButton color="primary" outlined /> : <LoginButton color="primary" /> }
          </Item>
        </Container>
      </Menu>
    </Navbar>
  )

}

export default TopNavbar;