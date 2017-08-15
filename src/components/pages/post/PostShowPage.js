import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchPostById, deletePostById } from "../../../actions/post"
import { Link } from 'react-router-dom'
import CommentNewForm from '../../CommentNewForm';
import CommentShowArea from '../../CommentShowArea';
import { Button, Icon, Row, Col} from 'antd';
import history from '../../../history';
import moment from 'moment';
import {styleShowTitle, styleShowMeta, styleShowButton, styleShowContent} from '../../../style'


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
            <div style={styleShowTitle}>
                {this.props.show.data.title}
            </div>
        )
    }

    renderPostMeta(){
        const createdAtParsed = moment(this.props.show.data.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZZ');
        return (
            <div style={styleShowMeta}>
                <Icon type="user" /><span>&nbsp;{this.props.show.data.author.nickName}&nbsp;</span>
                &nbsp;
                <span>{createdAtParsed.format('MM/DD/YYYY h:mm A')}</span>
                <br/>
                <Icon type="tag-o" /><span>&nbsp;{this.props.show.data.tags}&nbsp;</span>
                <Icon type="eye-o" /><span>&nbsp;{this.props.show.data.views}&nbsp;</span>
                <Icon type="message" /><span>&nbsp;{this.props.show.data.comments}&nbsp;</span>
                <Icon type="like-o" /><span>&nbsp;{this.props.show.data.likes}&nbsp;</span>
            </div>
        )
    }

    renderContent(){
        return(
            <div style={styleShowContent}>
                {this.props.show.data.content}
            </div>
        )
    }

    renderPostButton(){
        if(this.props.user && this.props.user.id && this.props.user.id === this.props.show.data.author.id){
            return (
                <div style={styleShowButton}>
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
        }else if(this.props.user && this.props.user.id && this.props.user.id !== this.props.show.data.author.id){
            return (
                <div style={styleShowButton}>
                    <Button>
                        Like
                    </Button>
                    &nbsp;
                    <Button onClick={this.onBackClick.bind(this)}>
                        Back
                    </Button>
                </div>
            )
        }else{
            return (
                <div style={styleShowButton}>
                    <Button onClick={this.onBackClick.bind(this)}>
                        Back
                    </Button>
                </div>
            )
        }

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
                        <div>
                            {this.renderTitle()}
                            {this.renderPostMeta()}
                            {this.renderContent()}
                            {this.renderPostButton()}
                        </div>
                        <Row>
                            <Col xs={{offset:1, span: 22}} sm={{offset:2, span: 20}} md={{offset:3,span:18}} lg={{offset:4,span:16}}>
                                <div>
                                    <CommentNewForm postId={this.props.match.params.postId} />
                                </div>
                                <div>
                                    <div>
                                        {this.props.show.data.comments} Comments:
                                    </div>
                                    <CommentShowArea postId={this.props.match.params.postId} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }

}

function mapStateToProps(state){
    return {
        show: state.data.show,
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchPostById: fetchPostById,
        deletePostById: deletePostById
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostShowPage);