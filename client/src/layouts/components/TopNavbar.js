import React, { useState } from "react";

import { Navbar } from "react-bulma-components";

import { LoginButton, LogoutButton } from "components/Login";
import { useIsAuthenticated } from "utils/auth";
import { Link } from "react-router-dom";
import Icon from "components/Icon";

const { Brand, Item, Burger, Menu, Container } = Navbar;

const TopNavbar = () => {

  const [ isNavActive, setIsNavActive ] = useState( false );

  const isAuth = useIsAuthenticated();

  return(
    <Navbar active={isNavActive}>
      <Brand>
        <Item renderAs={Link} to="/">
          <img src="/images/logo-color.png" alt="Classroom Logo" />
          { 
            isAuth
              ? ( <span className="is-flex"><Icon className="ml-1" icon={['far','arrow-alt-circle-left']} /> <span>Back to Class</span></span> )
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