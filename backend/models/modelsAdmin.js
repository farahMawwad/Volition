const mongoose = require('mongoose'); 
  const EduSchema = new mongoose.Schema({
    target_group:String,
    title: String,
    description: String,
    url:String,
  });
  const OrganizationsSchema = new mongoose.Schema({
   Name:String,
    title: String,
    description: String,
    url:String,
  });
  
  const OfferSchema = new mongoose.Schema({
    target_group:String,
    title: String,
    description: String,
      url:String,
      percentage:String,
  });
  const ProstheticsSchema = new mongoose.Schema({
    prosthetics:String,
    title: String,
    description: String,
    url:String,
    cost:String,
  });

  EduSchema.statics.add = async function (target,title,description,url) {
    const edu = await this.create({target_group:target,title,description,url});
    return edu
  }
  OrganizationsSchema.statics.add = async function (Name,title,description,url) {
    console.log(Name)
    const Organizations = await this.create({Name,title,description,url});
    return Organizations
  }
  OfferSchema.statics.add = async function (target,title,description,url,percentage) {
    console.log(percentage)
    const Offer = await this.create({target_group:target,title,url,description,percentage});
    return Offer
  }
ProstheticsSchema.statics.add = async function (prosthetics,title,description,url,cost) {
  console.log(prosthetics)
    const Prosthetics = await this.create({prosthetics,title,description,url,cost});
    return Prosthetics
  }
  EduSchema.statics.veiw =async function (){
  return ( await this.find({}) )
 
  }
  OrganizationsSchema.statics.veiw =async function (){
  return ( await this.find({}) )
 
  }
  OfferSchema.statics.veiw =async function (){
  return ( await this.find({}) )
 
  }
  ProstheticsSchema.statics.veiw =async function (){
  return ( await this.find({}) )
 
  }
  EduSchema.statics.veiwItem =async function (id){
  const findCourseById = await this.findById(id)
  return findCourseById  
    
  }
  OrganizationsSchema.statics.veiwItem =async function (id){
  const findCourseById = await this.findById(id)
  return findCourseById  
    
  }
  OfferSchema.statics.veiwItem =async function (id){
  const findCourseById = await this.findById(id)
  return findCourseById  
    
  }
  ProstheticsSchema.statics.veiwItem =async function (id){
  const findCourseById = await this.findById(id)
  return findCourseById  
    
  }

EduSchema.statics.edit = async function (id, targetEdit, titleEdit, descriptionEdit, urlEdit) {
  try {
    console.log(targetEdit)
    const updatedCourse = await this.findByIdAndUpdate(
      id,
      {
        target_group: targetEdit,
        title: titleEdit,
        description: descriptionEdit,
        url: urlEdit,
      },
      { new: true }  
    );
  } catch (error) {
    console.error('Error editing course:', error);
    throw error;
  }
  return true;
};
OrganizationsSchema.statics.edit = async function (id, NameEdit, titleEdit, descriptionEdit, urlEdit) {
  try {
    const updatedCourse = await this.findByIdAndUpdate(
      id,
      {
        Name: NameEdit,
        title: titleEdit,
        description: descriptionEdit,
        url: urlEdit,
      },
      { new: true }  
    );
  } catch (error) {
    console.error('Error editing course:', error);
    throw error;
  }
  return true;
};
OfferSchema.statics.edit = async function (id, targetEdit, titleEdit, descriptionEdit, urlEdit,percentageEdit) {
  try {
    console.log(percentageEdit)
    const updatedCourse = await this.findByIdAndUpdate(
      id,
      {
        target_group: targetEdit,
        title: titleEdit,
        description: descriptionEdit,
        url: urlEdit,
        percentage:percentageEdit
      },
      { new: true }  
    );
  } catch (error) {
    console.error('Error editing course:', error);
    throw error;
  }
  return true;
};
ProstheticsSchema.statics.edit = async function (id, prostheticsEdit, titleEdit, descriptionEdit, urlEdit ,costEdit) {
  try {
    const updatedCourse = await this.findByIdAndUpdate(
      id,
      {
        prosthetics: prostheticsEdit,
        title: titleEdit,
        description: descriptionEdit,
        url: urlEdit,
        cost:costEdit
      },
      { new: true }  
    );
  } catch (error) {
    console.error('Error editing course:', error);
    throw error;
  }
  return true;
};
EduSchema.statics.deleteItem = async function (id) {
  try {
    await this.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error Delete course:', error);
    throw error;
  }
  return true;
};
OrganizationsSchema.statics.deleteItem = async function (id) {
  try {
    await this.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error Delete course:', error);
    throw error;
  }
  return true;
};
OfferSchema.statics.deleteItem = async function (id) {
  try {
    console.log(id)
    await this.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error Delete course:', error);
    throw error;
  }
  return true;
};
ProstheticsSchema.statics.deleteItem = async function (id) {
  try {
    await this.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error Delete course:', error);
    throw error;
  }
  return true;
};

    
  const  Edu  = mongoose.model('Edu', EduSchema); 
  const  Offer  = mongoose.model('Offer', OfferSchema); 
  const  Prosthetics  = mongoose.model('Prosthetics', ProstheticsSchema); 
  const  Organizations  = mongoose.model('Organizations', OrganizationsSchema); 

  module.exports = { Offer,Prosthetics,Edu,Organizations };  