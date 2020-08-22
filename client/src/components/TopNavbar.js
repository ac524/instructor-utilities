import React, { useState } from "react";
import Navbar from 'react-bulma-components/lib/components/navbar';
import { LoginButton, LogoutButton } from "./Login";
import { useStoreContext } from "../store";
import { useIsAuthenticated } from "../utils/auth";

const { Brand, Item, Burger, Menu, Container } = Navbar;

function TopNavbar() {

  const [ isNavActive, setIsNavActive ] = useState( false );
  const { store: { user } } = useStoreContext();

  const isAuth = useIsAuthenticated();

  return(
    <Navbar active={isNavActive}>
      <Brand>
        <Item href="/">Instructor Utilities</Item>
        <Burger onClick={() => setIsNavActive( !isNavActive )} />
      </Brand>
      <Menu>
          {
            isAuth
              ? (
              <Container position="end">
                <Item renderAs="div">
                  User: { user.id }
                </Item>
                <Item renderAs="div">
                  <LogoutButton color="primary" outlined />
                </Item>
              </Container>
              )

              : (
              <Container position="end">
                <Item renderAs="div">
                  <LoginButton color="primary" />
                </Item>
              </Container>
              )
          }
      </Menu>
    </Navbar>
  )

}

export default TopNavbar;