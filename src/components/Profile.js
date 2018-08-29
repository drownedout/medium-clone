import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FollowButton from './FollowButton';
import { getUserProfile, follow } from './../redux/actions';

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
		return (
			<div>
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