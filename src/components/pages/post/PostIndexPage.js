import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {fetchPosts} from "../../../actions/post"
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd';

class PostIndexPage extends Component{

    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPost(post){
        const id = post._id;
        const title = post.title;
        const content = post.content;

        return (
            <div key={id}>
                <hr/>
                <div className="post-block">
                    <Row>
                        avatar icon, author name, create time
                    </Row>
                    <Row>
                        <Col span={18} className="post-block-title">
                            <div>
                                <Link to={`/posts/${id}`}>{title}</Link>
                            </div>

                            <div>{content}</div>
                        </Col>
                        <Col span={6}>
                            <div>
                                picture
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        tags, views, comments, likes
                    </Row>
                </div>
            </div>
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
                <div className="row">
                    <div className="col-md-8">
                        {this.props.posts.data.map(this.renderPost)}
                        <hr/>
                        {this.renderButton()}
                    </div>

                    <div className="col-md-4" >
                        side
                    </div>

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