import React, {Component} from 'react';
import PostEditForm from '../../PostEditForm'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchPostById } from "../../../actions/post"

class PostEditPage extends Component{

    componentDidMount(){
        this.props.fetchPostById(this.props.match.params.postId);
    }

    render(){
        if(!this.props.show){
            return(
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div>
                <PostEditForm postId={this.props.match.params.postId}/>
            </div>
        );
    }

}


function mapStateToProps(state){
    return {
        show: state.data.show
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchPostById: fetchPostById
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditPage);