const {Suggestions} =require ('../models/modelsClient')
const {Prosthetics,Offer,Edu,Organizations} =require ('../models/modelsAdmin')
const {User} =require ('../models/models')
const models = {
    Edu: Edu, 
    Offer: Offer,
    Prosthetics: Prosthetics,
    Organizations:Organizations,
  };

  exports.veiw =async (req,res)=>{
    try {
      console.log(req.params.database)
      const database = req.params.database;
      const selectmodel =models[database]
      res.status(200).json( await selectmodel.veiw());
    } catch (error) {
      console.error("An error occurred:", error); 
      res.status(500).json({ error: error.message }); 
    }
  }
  exports.veiwUser=async(req,res)=>{
    try {
        const id= req.params.id;
        res.status(200).json( await User.veiwUser(id));
      } catch (error) {
        console.error("An error occurred:", error); 
        res.status(500).json({ error: error.message }); 
      }
  }
  exports.editUser=async(req,res)=>{
    try {
        const id= req.params.id;
        const {username,birthDay,typeDisability}=req.body
        const img = req.file ? `/uploads/${req.file.filename}` : undefined;
        res.status(200).json( await User.editUser(id,username,birthDay,typeDisability,img));
      } catch (error) {
        console.error("An error occurred:", error); 
        res.status(500).json({ error: error.message }); 
      }
  }
  exports.add=async(req,res)=>{
    try {
        const {Name,Email,Suggestion} = req.body
        res.status(200).json( await Suggestions.add(Name,Email,Suggestion));
      } catch (error) {
        console.error("An error occurred:", error); 
        res.status(500).json({ error: error.message }); 
      }
  }