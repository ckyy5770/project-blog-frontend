import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchCommentsByPostId, deleteCommentById } from "../actions/comment"
import { Link } from 'react-router-dom'



class CommentShowArea extends Component{
    constructor(){
        super();
        this.renderComment = this.renderComment.bind(this);
    }

    componentDidMount(){
        this.props.fetchCommentsByPostId(this.props.postId);
    }

    onDeleteClick(commentId){
        this.props.deleteCommentById(this.props.postId, commentId);
    }

    renderComment(comment){
        const id = comment._id;
        const author = comment.author.id;
        const content = comment.content;

        return (
            <tr key={id}>
                <td>{author}</td>
                <td>{content}</td>
                <td>
                    <Link className="btn btn-primary" to={`/posts/${this.props.postId}/comments/${id}/edit`}>Edit</Link>
                    <span className="btn btn-danger" onClick={() => this.onDeleteClick(id)}>Delete</span>
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
        comments: state.data.comments
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchCommentsByPostId: fetchCommentsByPostId,
        deleteCommentById: deleteCommentById
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentShowArea);