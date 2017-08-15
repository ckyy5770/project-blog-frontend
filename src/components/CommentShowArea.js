import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchCommentsByPostId, deleteCommentById } from "../actions/comment"
import { Link } from 'react-router-dom'
import history from '../history';
import { Button } from 'antd';


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

    renderComment(comment){
        const id = comment._id;
        const author = comment.author;
        const content = comment.content;

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
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>author</th>
                            <th>content</th>
                            <th>link</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.comments.data.map(this.renderComment)}
                        </tbody>
                    </table>
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