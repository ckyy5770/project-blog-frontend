import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {fetchPosts} from "../../../actions/post"
import { Link } from 'react-router-dom'
import { Row, Col, Icon } from 'antd';
import moment from 'moment';

class PostIndexPage extends Component{

    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPost(post){

        const id = post._id;
        const title = post.title;
        const content = post.content;
        const createdAtParsed = moment(post.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZZ');
        console.log(post);

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
                        {this.props.posts.data.map(this.renderPost.bind(this))}
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