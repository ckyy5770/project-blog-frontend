import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {fetchPosts} from "../../../actions/post"
import { Link } from 'react-router-dom'


class PostIndexPage extends Component{

    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPost(post){
        const id = post._id;
        const title = post.title;
        const content = post.content;

        return (
            <tr key={id}>
                <td>{title}</td>
                <td>{content}</td>
                <td>
                    <Link to={`/posts/${id}`}>Read More</Link>
                </td>
            </tr>
        );
    }

    renderButton(){
        if(this.props.authenticated){
            return (
                <div>
                    <Link to="/posts/new">New Post</Link>
                </div>
            )
        }
    }

    render(){
        if(!this.props.posts){
            return (
                <div>
                    LOADING...
                </div>
            );
        }else{
            return (
                <div>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>title</th>
                            <th>content</th>
                            <th>detail</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.props.posts.data.map(this.renderPost)}
                        </tbody>
                    </table>
                    {this.renderButton()}
                </div>
            );
        }
    }

}

function mapStateToProps(state){
    return {
        posts: state.data.posts,
        authenticated: state.auth.authenticated
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchPosts: fetchPosts
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexPage);