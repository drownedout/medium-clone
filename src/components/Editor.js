import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediumEditor from 'medium-editor';
import axios from 'axios';
import EditorHeader from './EditorHeader';
import './../../node_modules/medium-editor/dist/css/medium-editor.min.css';

class Editor extends Component {
	constructor () {
		super();
		this.state = {
			title: '',
			text: '',
			description: '',
			imgSrc: null,
			loading: false
		}
		this.handleClick = this.handleClick.bind(this);
		this.previewImg = this.previewImg.bind(this);
		this.publishStory = this.publishStory.bind(this);
	}

	publishStory(){
		this.setState({
			loading: true
		});

		const URL = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:4000/api";
		const formData = new FormData();
		formData.append('text', this.state.text);
		formData.append('image', this.state.imgSrc);
		formData.append('title', document.getElementById('editor-title').value);
		formData.append('author_id', this.props.user._id);
		formData.append('description', this.state.description);
		formData.append('claps', 0);
		axios.post(`${URL}/article`, formData)
			 .then((res) => {
			 	this.setState({
			 		loading: false
			 	})
			 }).catch((err) => {
			 	console.log(err);
			 	this.setState({
			 		loading: false
			 	})
			 })
		this.props.history.push('/');
	}

	handleClick(){
		this.refs.fileUploader.click();
	}

	previewImg(){
		const file = this.refs.fileUploader.files[0];
		let reader = new FileReader();
		reader.onload = function(e){
			document.getElementById('image-preview').src = e.target.result;
			this.setState({
				imgSrc: file
			})
		}.bind(this);
		reader.readAsDataURL(file)
	}

	componentDidMount(){
		const editor = new MediumEditor(".medium-editable",{
			autoLink: true,
	        delay: 1000,
	        targetBlank: true,
	        toolbar: {
	        	buttons: [
					'bold', 
					'italic', 
					'quote', 
					'underline', 
					'anchor', 
					'h1',
					'h2', 
					'h3',
					'h4',
					'h5',
					'h6',
					'strikethrough',
					'subscript',
					'superscript',
					'pre',
					'image',
					'html',
	                'justifyCenter'
	        	],
	        	diffLeft: 25,
	            diffTop: 10,
	        },
	        anchor: {
	        	placeholderText: 'Insert link',
	        	customClassOption: 'btn',
	        	customClassOptionText: 'Create Button',
	        },
	        paste: {
	            cleanPastedHTML: true,
	            cleanAttrs: ['style', 'dir'],
	            cleanTags: ['label', 'meta'],
	            unwrapTags: ['sub', 'sup']
	        },
	        anchorPreview: {
	            hideDelay: 300
	        },
	        placeholder: {
	            text: 'Tell your story...'
	        }
		});
		editor.subscribe('editableInput', (ev, editable) => {
			if(typeof document !== 'undefined'){
				this.setState({
					title: document.getElementById('editor-title').value,
					text: editor.getContent(0),
					description: `${editor.getContent(0).substring(0,30).toString()}...`
				});
			}
		})
	}

	render(){
		return (
			<div>
				<EditorHeader publish={this.publishStory} loading={this.state.loading} />
				<div id="main-post" className="editor-section">
					<div className="post-metadata">
						<img alt={this.props.user.name} className="avatar-image" src={this.props.user.provider_pic} />
						<div className="post-info">
							<div data-react-className="PopoverLink" data-react-props="{&quot;user_id&quot;:608,&quot;url&quot;:&quot;/users/netk&quot;,&quot;children&quot;:&quot;netk&quot;}">
								<span className="popover-link author-name" data-reactroot=""><a href="">{this.props.user.name}</a>
								</span>
							</div>
							<small>{this.props.user.email}</small>
						</div>
					</div>
					<form className="editor-form main-editor" autoComplete="off">
						<div className={this.state.imgSrc != null ? 'file-upload-previewer' : 'file-upload-previewer hidden'}>
		                	<img src="" alt="" id="image-preview"/>
		                </div>
						<div className="existing-img-previewer" id="existing-img-previewer">
		                </div>
		                <div className="input-field">
		                	<span className="picture_upload">
		                   		<i className="fa fa-camera" onClick={this.handleClick}></i>
		                	</span>
		                </div>
						<div className="input-field">
			               <textarea col="1" className="editor-title" id="editor-title" placeholder="Title"></textarea>
		                </div>
		                <div className="input-field">
	                		<textarea id="medium-editable" className="medium-editable"></textarea>
		                </div>
		                <div class="hidden">
			                <input type="file" onChange={ ()=>this.previewImg()} id="file" ref="fileUploader"/>
			            </div>
	                </form>
                </div>
			</div>
		);
	}
}

const mapStateToProps = state => {
  return {
      user: state.authUser.user
  }
}

export default connect(mapStateToProps)(Editor);