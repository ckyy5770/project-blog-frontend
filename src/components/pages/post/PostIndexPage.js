import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {fetchPosts} from "../../../actions/post"
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Button, Layout} from 'antd';
import moment from 'moment';
import history from '../../../history';

class PostIndexPage extends Component{

    componentDidMount(){
        this.props.fetchPosts();
    }

    onNewPostClick(){
        history.push("/posts/new");
    }

    renderPostMeta(post){
        return (
            <div>
                <Icon type="tag-o" /><span>&nbsp;{post.tags}&nbsp;</span>
                <Icon type="eye-o" /><span>&nbsp;{post.views}&nbsp;</span>
                <Icon type="message" /><span>&nbsp;{post.comments}&nbsp;</span>
                <Icon type="like-o" /><span>&nbsp;{post.likes}&nbsp;</span>
            </div>
        )
    }

    renderPost(post){

        const id = post._id;
        const title = post.title;
        const content = post.content;
        const createdAtParsed = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZZ');

        return (
            <div key={id}>
                <hr/>
                <div className="post-block">
                    <Row>
                        <Icon type="user" /> <span>{post.author.nickName}</span> <span>{createdAtParsed.format(' h:mm A, MMM Do')}</span>
                    </Row>
                    <Row>
                        <Col xs={24} sm={18} md={18} lg={18} className="post-block-title">
                            <div>
                                <Link to={`/posts/${id}`}>{title}</Link>
                            </div>

                            <div>{content.substring(0, 200)}...</div>
                        </Col>
                        <Col xs={0} sm={6} md={6} lg={6}>
                            <div>
                                <img src={post.pics[0]} width="100%"></img>
                            </div>
                        </Col>
                    </Row>
                        {this.renderPostMeta(post)}
                    <Row>

                    </Row>
                </div>
            </div>
        );
    }

    renderButton(){
        if(this.props.authenticated){
            return (
                <div>
                    <Button onClick={this.onNewPostClick.bind(this)}>
                        New Post
                    </Button>
                </div>
            )
        }
    }

    renderSider(){
        return(
            <div style={{padding: "0px 0 0 20px"}}>
                <hr />

                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        )
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
                    <Row>
                        <Col xs={24} sm={24} md={16} lg={16}>
                            {this.props.posts && this.props.posts.data ? this.props.posts.data.map(this.renderPost.bind(this)) : ""}
                            <hr/>
                            <div style={{textAlign: "center"}}>
                                {this.renderButton()}
                            </div>
                        </Col>

                        <Col xs={0} sm={0} md={8} lg={8}>
                            {this.renderSider()}
                        </Col>
                    </Row>
                </div>
            );
        }
    }

}

function mapStateToProps(state){
    return {
        posts: state.data.posts,
        authenticated: state.auth.authenticated,
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchPosts: fetchPosts
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexPage);