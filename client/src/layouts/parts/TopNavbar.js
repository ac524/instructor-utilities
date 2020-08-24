import React, { useState } from "react";
import Navbar from 'react-bulma-components/lib/components/navbar';
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
          { 
            isAuth
              ? ( <span><FontAwesomeIcon icon={['far','arrow-alt-circle-left']} /> Back to Class</span> )
              : "Classroom"
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