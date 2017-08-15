import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { styleNavBar } from '../style';


class NavigationBar extends Component{
    renderUserDropDown(){
        if(this.props.authenticated){
            return (
                <Menu.SubMenu title={`Welcome ${this.props.user.nickName}!`}>
                    <Menu.Item>
                        <Link to="/profile"> My Profile </Link>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item>
                        <Link to="/logout"> Log out </Link>
                    </Menu.Item>
                </Menu.SubMenu>
            )
        }else{
            return (
                <Menu.SubMenu title="Welcome Visitor!">
                    <Menu.Item>
                        <Link to="/signup"> Sign up</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/login"> Log in</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            )
        }
    }

    render(){
        return (
            <div>
                <Menu mode="horizontal" theme="dark">
                        <Menu.Item>
                            <Link to="/posts"> Home </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/about"> About </Link>
                        </Menu.Item>

                        {this.renderUserDropDown()}
                </Menu>
            </div>
        )
    }


}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(NavigationBar);