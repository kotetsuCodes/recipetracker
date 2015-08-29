
//EXAMPLE
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RecipeSchema   = new Schema({
	User_Id: Schema.Types.ObjectId,	
	name: String,
	ingredients: Schema.Types.Mixed,
	instructions: Schema.Types.Mixed,	
});

module.exports = mongoose.model('Recipe', RecipeSchema);

