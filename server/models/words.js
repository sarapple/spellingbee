//SUMMARY: Define the schema for this model, and add validations for the model.

var mongoose = require('mongoose');
var WordSchema = new mongoose.Schema({
	word: String
});
WordSchema.path('word').required(true, 'Word cannot be blank');
// UserSchema.path('definition').required(true, 'Password cannot be blank');

mongoose.model('Word', WordSchema);
// Set name as Storage, and routes.js calls on this name and creates the model.
// Make StorageSchema a model and call upon it by the name Storage.
