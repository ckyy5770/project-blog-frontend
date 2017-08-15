import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchCommentsByPostId, deleteCommentById } from "../actions/comment"
import history from '../history';
import { Button, Row, Col, Icon } from 'antd';
import moment from 'moment';
import {styleCommentMeta} from "../style" ;


class CommentShowArea extends Component{
    constructor(){
        super();
        this.renderComment = this.renderComment.bind(this);
    }

    componentDidMount(){
        this.props.fetchCommentsByPostId(this.props.postId);
    }

    onEditClick(commentId){
        history.push(`/posts/${this.props.postId}/comments/${commentId}/edit`);
    }

    onDeleteClick(commentId){
        this.props.deleteCommentById(this.props.postId, commentId);
    }

    renderButton(commentId, commentAuthor){
        if(this.props.user && this.props.user.id && this.props.user.id === commentAuthor.id){
            return (
                <div>
                    <Button onClick={() => this.onEditClick(commentId)}>
                        Edit
                    </Button>
                    &nbsp;
                    <Button onClick={() => this.onDeleteClick(commentId)}>
                        Delete
                    </Button>
                </div>
            )
        }else if(this.props.user && this.props.user.id && this.props.user.id !== commentAuthor.id){
            return (
                <div>
                    <Button>
                        Like
                    </Button>
                </div>
            )
        }else{
            return (
                <div>

                </div>
            )
        }

    }

    renderCommentMeta(comment){
        const commentId = comment._id;
        const commentAuthor = comment.author;
        const createdAtParsed = moment(comment.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZZ');

        if(this.props.user && this.props.user.id && this.props.user.id === commentAuthor.id){
            return (
                <div>
                    <Icon type="user" /><span>&nbsp;{comment.author.nickName}&nbsp;</span>
                    &nbsp;
                    <span>{createdAtParsed.format('MM/DD/YYYY h:mm A')}</span>
                    &nbsp;
                    <Button onClick={() => this.onEditClick(commentId)}>
                        Edit
                    </Button>
                    &nbsp;
                    <Button onClick={() => this.onDeleteClick(commentId)}>
                        Delete
                    </Button>
                </div>
            )
        }else{
            return (
                <div>
                    <Icon type="user" /><span>&nbsp;{comment.author.nickName}&nbsp;</span>
                    &nbsp;
                    <span>{createdAtParsed.format('MM/DD/YYYY h:mm A')}</span>
                </div>
            )
        }

    }
    renderCommentButton(comment) {
        return (
            <div>
                <Icon type="like-o" /><span>&nbsp;{comment.likes}&nbsp;</span>
            </div>
        )

    }

    renderComment(comment){
        const author = comment.author;
        const id = comment._id;
        const content = comment.content;

        return (
            <div key={id}>
                <hr/>
                <div>
                    <Row>
                        {this.renderCommentMeta(comment)}

                    </Row>
                    <Row>
                        <Col>
                            <div>{content}</div>
                        </Col>
                    </Row>
                    <Row>
                        {this.renderCommentButton(comment, id, author)}
                    </Row>
                </div>
            </div>
        );

        return (
            <tr key={id}>
                <td>{author.nickName}</td>
                <td>{content}</td>
                <td>
                    {this.renderButton(id, author)}
                </td>
            </tr>
        );
    }

    render(){
        if(!this.props.comments){
            return (
                <div>
                    Loading...
                </div>
            );
        }else{
            return (
                <div>
                    <Row>
                        <Col>
                            {this.props.comments && this.props.comments.data ? this.props.comments.data.map(this.renderComment.bind(this)) : ""}
                            <hr/>
                        </Col>
                    </Row>
                </div>
            );
        }
    }

}

function mapStateToProps(state){
    return {
        comments: state.data.comments,
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchCommentsByPostId: fetchCommentsByPostId,
        deleteCommentById: deleteCommentById
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentShowArea);