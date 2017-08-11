import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchPostById, deletePostById } from "../../../actions/post"

class PostShowPage extends Component{

    componentDidMount(){
        this.props.fetchPostById(this.props.match.params.postId);
    }

    onEditClick(){

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
                    {this.props.show.data.title},
                    {this.props.show.data.content},
                    <span onClick={this.onEditClick.bind(this)} className="btn btn-primary">Edit</span>,
                    <span onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete</span>
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