import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import './header.css';
class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render(){
        return(
            
            <Navbar className="header-color" dark expand="md">
            <NavbarBrand href="/">Weather App</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="#">Components</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/sanket9" target="_blank">GitHub</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        )
    }
}

export default Header;
