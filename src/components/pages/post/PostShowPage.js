import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchPostById, deletePostById } from "../../../actions/post"
import { Link } from 'react-router-dom'
import CommentNewForm from '../../CommentNewForm';
import CommentShowArea from '../../CommentShowArea';


class PostShowPage extends Component{

    componentDidMount(){
        this.props.fetchPostById(this.props.match.params.postId);
    }

    onDeleteClick(){
        this.props.deletePostById(this.props.match.params.postId);
    }

    render(){
        if(!this.props.show){
            return (
                <div>
                    Loading...
                </div>
            );
        }else{
            return (
                <div>
                    <div>
                        {this.props.show.data.title},
                        {this.props.show.data.content},
                        <Link to={`/posts/${this.props.match.params.postId}/edit`} className="btn btn-primary">Edit</Link>
                        <span onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete</span>
                        <Link to={`/posts/`} className="btn btn-primary">Back</Link>
                    </div>
                    <div>
                        <CommentNewForm postId={this.props.match.params.postId} />
                    </div>
                    <div>
                        Here come comments
                        <CommentShowArea postId={this.props.match.params.postId} />
                    </div>
                </div>
            );
        }
    }

}

function mapStateToProps(state){
    return {
        show: state.data.show
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchPostById: fetchPostById,
        deletePostById: deletePostById
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostShowPage);