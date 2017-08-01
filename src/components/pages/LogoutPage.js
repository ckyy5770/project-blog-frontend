import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../actions/index';

class LogoutPage extends Component {
    componentWillMount(){
        this.props.logoutUser();
    }

    render(){
        return (
            <div>
                This is LogoutPage.
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        logoutUser: logoutUser
    },dispatch);
}

export default connect(null, mapDispatchToProps)(LogoutPage)