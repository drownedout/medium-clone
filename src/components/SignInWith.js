import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { signInUser, toggleClose, toggleOpen } from './../redux/actions/actions';
import { GOOGLECLIENT } from '../utils/keys';

class SignInWith extends Component {
	render(){
		const responseGoogle = (res) => {
			let postData = {
				name: res.w3.ig,
				provider: 'google',
				email: res.w3.U3,
				provider_id: res.El,
				token: res.Zi.access_token,
				provider_pic: res.w3.Paa
			}
			console.log(postData)
			this.props.signInUser(postData)
	        this.props.toggleClose()
		}
		return (
			<div>
				<GoogleLogin 
					className="btn"
					clientId={`${GOOGLECLIENT}.apps.googleusercontent.com`}
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
				>
					<i className="fa fa-google"></i><span> SignIn with Google</span>
				</GoogleLogin>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
        modalMode: state.common.modalMode
    }
}

export default connect(mapStateToProps, 
	   { toggleClose, toggleOpen, signInUser })(SignInWith);