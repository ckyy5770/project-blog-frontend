import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {fetchPosts} from "../../../actions/post"
import { Link } from 'react-router-dom'
import { Row, Col, Icon, Button} from 'antd';
import moment from 'moment';
import history from '../../../history';

class PostIndexPage extends Component{

    componentDidMount(){
        this.props.fetchPosts();
    }

    onNewPostClick(){
        history.push("/posts/new");
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
                        <Col span={18} className="post-block-title">
                            <div>
                                <Link to={`/posts/${id}`}>{title}</Link>
                            </div>

                            <div>{content.substring(0, 200)}...</div>
                        </Col>
                        <Col span={6}>
                            <div className="crop">
                                <img src={post.pics[0]} className="img-rounded" width="200" height="150"></img>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Icon type="tag-o" /><span>&nbsp;{post.tags}&nbsp;</span>
                        <Icon type="eye-o" /><span>&nbsp;{post.views}&nbsp;</span>
                        <Icon type="message" /><span>&nbsp;{post.comments}&nbsp;</span>
                        <Icon type="like-o" /><span>&nbsp;{post.likes}&nbsp;</span>
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
                <div className="row">
                    <div className="col-md-8">
                        {this.props.posts.data.map(this.renderPost.bind(this))}
                        <hr/>
                        <div style={{textAlign: "center"}}>
                            {this.renderButton()}
                        </div>
                    </div>

                    <div className="col-md-4" >
                        {this.renderSider()}
                    </div>
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