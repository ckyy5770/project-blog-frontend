import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom'


class NavigationBar extends Component{
    renderDropdown(){
        if(this.props.authenticated){
            return (
                <NavDropdown eventKey={3} title="Welcome Back!" id="basic-nav-dropdown">
                    <LinkContainer to="/" exact={true}>
                        <MenuItem eventKey={3.1}>My profile</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/logout" exact={true}>
                        <MenuItem eventKey={3.2}>Log out</MenuItem>
                    </LinkContainer>
                    <MenuItem divider/>
                    <LinkContainer to="/about" exact={true}>
                        <MenuItem eventKey={3.3}>About us</MenuItem>
                    </LinkContainer>
                </NavDropdown>
            )
        }else{
            return (
                <NavDropdown eventKey={4} title="Welcome, Guest" id="basic-nav-dropdown">
                    <LinkContainer to="/login" exact={true}>
                        <MenuItem eventKey={4.1}>Log in</MenuItem>
                    </LinkContainer >
                    <LinkContainer to="/signup" exact={true}>
                        <MenuItem eventKey={4.2}>Sign up</MenuItem>
                    </LinkContainer>
                    <MenuItem divider/>
                    <LinkContainer to="/about" exact={true}>
                        <MenuItem eventKey={4.3}>About us</MenuItem>
                    </LinkContainer>
                </NavDropdown>
            )
        }
    }

    render(){
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/"> Brand </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/about" exact={true}>
                            <NavItem eventKey={1}>About</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/here" exact={true}>
                            <NavItem eventKey={2}>Here</NavItem>
                        </LinkContainer>
                    </Nav>

                    <Nav pullRight>
                        {this.renderDropdown()}
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        );
    }

}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(NavigationBar);