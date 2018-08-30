import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle, clap, follow } from './../redux/actions/actions';
import PropTypes from 'prop-types';
import FollowButton from './FollowButton';
import { formatDate } from './../utils/helpers';

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
		const { text, claps, title, feature_img, author, created_at } = this.props._article;
		let author_name, author_img, author_id;

		if (author){
			const { name, provider_pic, _id } = author;
			author_name = name;
			author_id = _id;
			author_img = provider_pic;
		}

		return (
			<div>
				<div className="article-view-section">
					<div className="article-view-header">
						<div className="article-view-author">
							<div className="avatar-container">
								<img alt={author_name} className="avatar-image" src={author_img} height="40" width="40" />
							</div>
							<div className="meta-container">
								<h4 className="author-name"><a href={`/profile/${author_id}`}>{author_name}</a></h4>
								<p className="created-date">Created {formatDate(created_at)}</p>
							</div>
						</div>
						<div className="follow-btn-container">
							{this.props.user && this.props.user._id !== author_id ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''}
						</div>
					</div>
					<div className="article-banner">
						{!feature_img || !feature_img.length > 0 ? '' : <div className="article-image-container">
                            <img src={feature_img} alt="feature img 540" className="article-image" />
                        </div> }
					</div>
					<div className="article-content">
						<h3 className="title">{title}</h3>
						<div className="article-body">
							<p></p>
                            <p className="article-text" dangerouslySetInnerHTML={{__html: text}}>
                            </p>
                            <p></p>
						</div>
					</div>
					<div className="article-footer">
                        <div className="like-btn-container">
	                        <button onClick={() => this.props.clap(this.props._article._id)} className="like-button" data-behavior="trigger-overlay" type="submit">
		                        <i className="icon fas fa-heart"></i><span className="hidden">Like</span>
	                        </button>
	                        <span className="like-count">{claps}</span>
                        </div>
					</div>
				</div>
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