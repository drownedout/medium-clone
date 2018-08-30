import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FollowButton from './FollowButton';
import { getUserProfile, follow } from './../redux/actions/actions';

class Profile extends Component {

	componentDidMount(){
		document.body.className = 'users show';
	}

	componentWillUnmount(){
		document.body.className = '';
	}

	componentWillMount(){
		this.props.getUserProfile(this.props.match.params.id)
	}

	render(){

		function ProfileContent({ profile }){
			return (
				<div>
					<div className="profile-header">
						<div className="profile-details">
							<h1 className="profile-user-name">{profile.user.name}</h1>
							<p>{profile.user.email}</p>
							<div className="following-metadata">
								<span className="following-count"><b>{profile.user.following.length}</b> Following</span>
	                            <span className="follower-count"><b>{profile.user.followers.length}</b> Followers</span>
	                        </div>
						</div>
						<div className="avatar-image-container">
							<img 
								alt={profile.user.name} 
								className="avatar-image" 
								src={profile.user.provider_pic} 
								height="100" 
								width="100"
							/>
						</div>
					</div>
					<div className="profile-article-section">
						<h3>Latest</h3>
						{ profile.articles.reverse().map((article) =>
							<div className="article-panel">
								<div className="article-header">
									<div className="article-author">
										<div className="avatar-container">
											<img alt={profile.user.name} className="avatar-image" src={profile.user.provider_pic} />
										</div>
										<div className="meta-container">
											<h4 className="author-name"><a href={`/profile/${profile.user._id}`}>{profile.user.name}</a></h4>
											<p className="created-date">Created</p>
										</div>
									</div>
								</div>
								<div className="article-content">
									<h3 className="article-title"><a href={`/article/${article._id}`}>{article.title}</a></h3>
									<div className="article-body">
			                            <p className="article-text" dangerouslySetInnerHTML={{__html: article.description}}></p>
			                        </div>
			                        <a className="read-more" href={`/articleview/${article._id}`}>Read more</a>
								</div>
								<div className="article-footer">
									<div className="like-btn-container">
				                        <button onClick={() => this.props.clap(this.props.article._id)} className="like-button" data-behavior="trigger-overlay" type="submit">
					                        <i className="icon fas fa-heart"></i><span className="hidden">Like</span>
				                        </button>
				                        <span className="like-count">{article.claps}</span>
			                        </div>
								</div>
							</div>
						)}
					</div>
				</div>
			)
		}

		return (
			<div>
				<div className="profile-section">
					{Object.keys(this.props.profile).length > 0 ? <ProfileContent profile={this.props.profile} /> : ''}
				</div>
			</div>
		)
	}
}

Profile.propTypes = {
    params: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        _article: state.articles.article,
        user: state.authUser.user,
        profile: state.authUser.profile
    }
}

export default connect(mapStateToProps, { getUserProfile, follow})(Profile);