import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from "../styles/images/logo.png";

class Header extends Component {
	render(){
		return (
			<header className="header">
				<div className="nav-wrapper">
					<div className="nav-right">
						<div className="logo-container">
							<img className="logo" src={logo} alt="logo"/>
						</div>
					</div>
					<div className="nav-left">
						<nav className="navbar">
							<ul className="navbar-nav">
								<li>
									{this.props.isAuth ? <a href="/editor" className="btn secondary">New Article</a> : ''}
								</li>
								<li onClick={this.props.openSignInWith}>
									{this.props.isAuth ? '' : <a href="#" className="btn secondary">Sign In / Sign Up</a>}
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</header>
		)
	}
}

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        isAuth: state.authUser.isAuth
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        openSignInWith: () => { 
        	dispatch({ type: 'TOGGLE_MODAL', modalMode: true }) 
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);