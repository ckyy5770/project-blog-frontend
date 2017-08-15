import React, {Component} from 'react';
import history from '../../history'

export default class IndexPage extends Component{
    componentWillMount(){
        history.push('/posts');
    }
    render(){
        return (
            <div>
                Loading...
            </div>
        );
    }

}