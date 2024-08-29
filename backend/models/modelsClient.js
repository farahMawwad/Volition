const mongoose = require('mongoose'); 

const SuggestionsSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Suggestion: String,
});

SuggestionsSchema.statics.add = async function (
  Name,
  Email,
  Suggestion
) {
  const newSuggestion = await this.create({
    Name,
    Email,
    Suggestion,
  });
  return newSuggestion;
};
SuggestionsSchema.statics.veiw =async function (){
  return ( await this.find({}) )
 
  }
const Suggestions = mongoose.model('Suggestions', SuggestionsSchema); 

module.exports = { Suggestions };
