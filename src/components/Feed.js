import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticles } from './../redux/actions/actions';
import AsideFeed from './AsideFeed';
import { formatDate } from './../utils/helpers';

class Feed extends Component {

	componentWillMount(){
		this.props.loadArticles();
	}

	render(){
		const articles = this.props.articles.reverse().map((article) => 
			<div className="article-panel">
				<div className="article-metadata">
					<div className="avatar-container">
						<img alt="avatar" className="avatar-image" src={article.author.provider_pic} />
					</div>
					<div className="article-info">
                        <a className="author-name" href={`/profile/${article.author._id}`}>{article.author.name}</a>
                        <small className="posted-at">Posted • {formatDate(article.created_at)}</small>
					</div>
				</div>
				<div className="article-banner">
					{!article.feature_img || !article.feature_img.length > 0 ? '' : <div className="article-image-container">
                        <img src={article.feature_img} alt="feature img 540" className="article-image" />
                    </div> }
				</div>
				<div className="article-content">
					<h3 className="article-title"><a href={`/article/${article._id}`}>{article.title}</a></h3>
					<div className="article-body">
                        <p className="" dangerouslySetInnerHTML={{__html: article.description}}></p>
                    </div>
                    <a className="read-more" href={`/article/${article._id}`}>Read more</a>
				</div>
				<div className="article-footer">
					<div className="like-button-wrapper">
                        <form className="button_to" method="get" action="">
                            <button className="like-button" type="submit">
                            	<i className="icon fas fa-heart"></i><span className="hidden">Like</span>
                            </button>
                        </form>
                        <span className="like-count">{article.claps}</span>
                    </div>
				</div>
			</div>
		);

		return (
			<div>
				<div className="feed-section">
					<div className="main-feed-section">
						<h3 className="feed-title">Latest</h3>
						<div className="article-wrapper">
							{articles}
						</div>
					</div>
					<div className="aside-section">
					</div>
				</div>
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