import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticles } from './../redux/actions/actions';
import AsideFeed from './AsideFeed';

class Feed extends Component {

	componentWillMount(){
		this.props.loadArticles();
	}

	render(){
		const articles = this.props.articles.reverse().map((article) => {

		});

		return (
			<div>
				<h1>Feed</h1>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
        articles: state.articles.articles
    }
}

export default connect(mapStateToProps, { loadArticles })(Feed);