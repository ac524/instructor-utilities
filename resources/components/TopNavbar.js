import React from "react";
import Navbar from 'react-bulma-components/lib/components/navbar';
import Button from 'react-bulma-components/lib/components/button';

function TopNavbar() {

  return(
    <Navbar>
        <Navbar.Brand>
          <Navbar.Item href="#">
            Instructor Utilities
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu >
          <Navbar.Container position="end">
            <Navbar.Item renderAs="div">
              <Button className="is-outlined" color="success">Login</Button>
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    
  )

}

export default TopNavbar;