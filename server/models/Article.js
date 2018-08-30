const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArticleSchema = new Schema({
	text: String,
	title: String,
	description: String,
	feature_img: String,
	claps: Number,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [
		{
			author: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			},
			text: String
		}
	]
},{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

ArticleSchema.methods.clap = function(){
	this.claps++;
	return this.save();
}

ArticleSchema.methods.comment = function(comment){
	this.comments.push(comment);
	return this.save();
}

ArticleSchema.methods.addAuthor = function(author_id){
	this.author = author_id;
	return this.save();
}

ArticleSchema.methods.getUserArticle = function(_id){
	Article.fine({'author': _id}).then((article) => {
		return article;
	})
}

module.exports = mongoose.model('Article', ArticleSchema);
