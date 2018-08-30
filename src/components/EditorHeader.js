import React, { Component } from 'react';

class EditorHeader extends Component {
	render(){
		return (
			<div>
				<header className="header">
					<div className="nav-wrapper">
						<div className="nav-right">
							<div className="logo-container">
								<img className="logo" alt="logo"/>
							</div>
						</div>
						<div className="nav-left">
							<nav className="navbar">
								<ul className="navbar-nav">
									<button onClick={()=>this.props.publish()} className={this.props.loading === true ? "btn green" : "btn secondary"} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						              {this.props.loading === true ? 'Publishing' : 'Publish'} <i className="fas fa-globe"></i>
						            </button>
								</ul>
							</nav>
						</div>
					</div>
				</header>
			</div>
		)
	}
}

export default EditorHeader;