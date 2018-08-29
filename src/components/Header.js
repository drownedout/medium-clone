import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
	render(){
		return (
			<header className="header">
				<div className="nav-wrapper">
					<div className="nav-right">
						<div className="logo">
							<h1>Logo</h1>
						</div>
					</div>
					<div className="nav-left">
						<nav className="navbar">
							<ul className="navbar-nav">
								<a href="#" className="btn secondary">Sign In / Sign Up</a>
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

export default connect(mapStateToProps)(Header);