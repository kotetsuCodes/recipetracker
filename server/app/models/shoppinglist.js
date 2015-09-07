
//EXAMPLE
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ShoppingListSchema   = new Schema({
	User_Id: Schema.Types.ObjectId,
	name: String,
	recipes: Schema.Types.Mixed,
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
