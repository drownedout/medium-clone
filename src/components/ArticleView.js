import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle, clap, follow } from './../redux/actions/actions';
import PropTypes from 'prop-types';
import FollowButton from './FollowButton';

class ArticleView extends Component {

	componentDidMount(){
		document.body.className = 'posts show';
	}

	componentWillMount(){
		this.props.getArticle(this.props.match.params.id);
	}

	componentWillUnmount(){
		document.body.className = '';
	}

	render(){
		const { text, claps, title, feature_img, author } = this.props._article;
		let author_name, author_img, author_id;

		return (
			<div>
				<h1> Article Show </h1>
			</div>
		)
	}
}

ArticleView.propTypes = {
    params: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        _article: state.articles.article,
        user: state.authUser.user    
    }
}

export default connect(mapStateToProps, { getArticle, clap, follow })(ArticleView);