import React, { useState } from "react";
import Navbar from 'react-bulma-components/lib/components/navbar';
import Button from 'react-bulma-components/lib/components/button';

const { Brand, Item, Burger, Menu, Container } = Navbar;

function TopNavbar() {

  const [ isNavActive, setIsNavActive ] = useState( false );

  return(
    <Navbar active={isNavActive}>
      <Brand>
        <Item href="#">Instructor Utilities</Item>
        <Burger onClick={() => setIsNavActive( !isNavActive )} />
      </Brand>
      <Menu>
        <Container position="end">
          <Item renderAs="div">
            <Button color="primary">Login</Button>
          </Item>
        </Container>
      </Menu>
    </Navbar>
  )

}

export default TopNavbar;