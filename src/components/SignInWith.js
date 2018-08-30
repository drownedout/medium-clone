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
			this.props.signInUser(postData);
	        this.props.toggleClose();
		}
		return (
			<div>
				<div className={this.props.modalMode === true ? 'overlay open' : 'overlay'}>
					<div className="close-btn-container">
						<button onClick={this.props.toggleClose} data-behavior="close-overlay" type="button" className="overlay-close">
							<i className="icon fas fa-times"></i>
						</button>
					</div>
					<div className="login-btn-container">
						<h2>Login</h2>
						<GoogleLogin 
							className="btn google"
							clientId={`${GOOGLECLIENT}.apps.googleusercontent.com`}
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
						>
							<i className="fab fa-google"></i><span> SignIn with Google</span>
						</GoogleLogin>
					</div>
				</div>
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
	   