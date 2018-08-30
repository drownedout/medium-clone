import React, { Component } from 'react';
import { connect } from 'react-redux';
import { follow, toggleOpen } from './../redux/actions/actions';

class FollowButton extends Component {
	constructor(props){
		super(props);
		this.followUser = this.followUser.bind(this);
	}

	followUser(){
		// Check to see if user is signed in
		if (Object.keys(this.props._user) > 0) {
			// Check to see if user is not the same as current user
			if (this.props._user._id !== this.props.to_follow){
				// Check if not already following
				if (this.props.user.indexOf(this.props.to_follow) === -1){
					this.props.follow(this.props._user._id, this.props.to_follow)
				}
			}
		} else {
			this.props.toggleOpen;
		}
	}

	render(){
		let following = this.props.user;
		const isFollowing = following.indexOf(this.props.to_follow);

		return (
			<div>
				<div onClick={this.followUser}>
					<a className={isFollowing === -1 ? "btn primary" : "btn secondary"} href="javascript:void(0);">{isFollowing === -1 ? 'Follow':'Following'}</a>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		_user: state.authUser.user,
	}
}

export default connect(mapStateToProps, { follow, toggleOpen })(FollowButton);