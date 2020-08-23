import React, { useState } from "react";
import Navbar from 'react-bulma-components/lib/components/navbar';
import { LoginButton, LogoutButton } from "../../components/Login";
import { useIsAuthenticated } from "../../utils/auth";

const { Brand, Item, Burger, Menu, Container } = Navbar;

function TopNavbar() {

  const [ isNavActive, setIsNavActive ] = useState( false );

  const isAuth = useIsAuthenticated();

  return(
    <Navbar active={isNavActive}>
      <Brand>
        <Item href="/">Instructor Utilities</Item>
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