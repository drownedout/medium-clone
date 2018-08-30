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

		function ItemList({ items }){
			return (
				<div>
					<h1>{items.profile.user.name}</h1>
					<p>{items.profile.user.email}</p>
					<img 
						alt={items.profile.user.name} 
						className="avatar-image" 
						src={items.profile.user.provider_pic} 
						height="100" 
						width="100"
					/>
				</div>
			)
		}

		return (
			<div>
				{Object.keys(this.props.profile).length > 0 ? <ItemList items={this.props} /> : ''}
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