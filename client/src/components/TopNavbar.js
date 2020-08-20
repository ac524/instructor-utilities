import React, { useState } from "react";
import Navbar from 'react-bulma-components/lib/components/navbar';
import Button from 'react-bulma-components/lib/components/button';
import Modal from 'react-bulma-components/lib/components/modal';
import Section from 'react-bulma-components/lib/components/section';

const { Brand, Item, Burger, Menu, Container } = Navbar;

function TopNavbar() {

  const [ isNavActive, setIsNavActive ] = useState( false );
  const [ isModalActive, setIsModalActive ] = useState( false );

  return(
    <div>
      <Navbar active={isNavActive}>
        <Brand>
          <Item href="#">Instructor Utilities</Item>
          <Burger onClick={() => setIsNavActive( !isNavActive )} />
        </Brand>
        <Menu>
          <Container position="end">
            <Item renderAs="div">
              <Button color="primary" onClick={() => setIsModalActive( true )}>Login</Button>
            </Item>
          </Container>
        </Menu>
      </Navbar>

      <Modal show={isModalActive} onClose={() => setIsModalActive( false )}>
        <Modal.Content>
          <Section style={{ backgroundColor: 'white' }}>
            Click on the {'"X"'} button on the top-right button to close the Modal (pass closeOnEsc=false to the modal to avoid closing it with the keyboard)
          </Section>
        </Modal.Content>
      </Modal>
    </div>
  )

}

export default TopNavbar;