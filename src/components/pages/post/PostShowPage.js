import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchPostById, deletePostById } from "../../../actions/post"
import { Link } from 'react-router-dom'
import CommentNewForm from '../../CommentNewForm';
import CommentShowArea from '../../CommentShowArea';
import { Button } from 'antd';
import history from '../../../history';


class PostShowPage extends Component{

    componentDidMount(){
        this.props.fetchPostById(this.props.match.params.postId);
    }

    onEditClick(){
        history.push(`/posts/${this.props.match.params.postId}/edit`);
    }

    onDeleteClick(){
        this.props.deletePostById(this.props.match.params.postId);
    }

    onBackClick(){
        history.push(`/posts/`);
    }

    renderTitle(){
        return(
            <div>
                {this.props.show.data.title}
            </div>
        )
    }

    renderContent(){
        return(
            <div>
                {this.props.show.data.content}
            </div>
        )
    }

    renderPostButton(){
        return (
            <div>
                <Button onClick={this.onEditClick.bind(this)}>
                    Edit
                </Button>
                &nbsp;
                <Button onClick={this.onBackClick.bind(this)}>
                    Back
                </Button>
                &nbsp;
                <Button onClick={this.onDeleteClick.bind(this)}>
                    Delete
                </Button>
            </div>
        )
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
                        {this.renderTitle()}
                        {this.renderContent()}
                        {this.renderPostButton()}
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