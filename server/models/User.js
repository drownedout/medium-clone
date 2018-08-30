const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
	name: String,
	email: String,
	provider: String,
	provider_id: String,
	token: String,
	provider_pic: String,
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
},{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.methods.follow = function(user_id){
	if (this.following.indexOf(user_id) === -1){
		this.following.push(user_id);
	}
	return this.save();
}

UserSchema.methods.addfollower = function(user){
	this.followers.push(user)
}

module.exports = mongoose.model('User', UserSchema);