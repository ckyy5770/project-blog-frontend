import React, {Component} from 'react';
import CommentEditForm from '../../CommentEditForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchCommentById } from "../../../actions/comment"

class CommentEditPage extends Component{

    componentDidMount(){
        this.props.fetchCommentById(this.props.match.params.postId, this.props.match.params.commentId);
    }

    render(){
        if(!this.props.showComment){
            return(
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div>
                <CommentEditForm postId={this.props.match.params.postId} commentId={this.props.match.params.commentId}/>
            </div>
        );
    }

}


function mapStateToProps(state){
    return {
        showComment: state.data.showComment
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchCommentById: fetchCommentById
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditPage);