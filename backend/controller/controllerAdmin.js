const {Prosthetics,Offer,Edu,Organizations} =require ('../models/modelsAdmin')
const {Suggestions} =require ('../models/modelsClient')
const models = {
  Edu: Edu, 
  Offer: Offer,
  Prosthetics: Prosthetics,
  Organizations:Organizations,
  Suggestions:Suggestions
};
exports.add = async (req, res) => {
    try {
   const {target,prosthetics,title,description,url,cost,percentage,Name} = req.body.info
   const database = req.params.database;
   const selectmodel =models[database]
   if (database === 'Offer') {
     addResult = await selectmodel.add(target, title, description, url, percentage);
  } else if (database === 'Edu') {
    addResult = await selectmodel.add(target, title, description, url);
  } else if (database === 'Prosthetics') {
    addResult = await selectmodel.add(prosthetics, title, description, url, cost);
  
  } else if (database === 'Organizations') {
    addResult = await selectmodel.add(Name, title, description, url);
  } else {
    return res.status(400).json({ error: 'Invalid database type' });
  }
  res.status(200).json(addResult);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  };
  exports.veiw =async (req,res)=>{
    try {

      const database = req.params.database;
      console.log(database)
      const selectmodel =models[database]
      res.status(200).json( await selectmodel.veiw());
    } catch (error) {
      console.error("An error occurred:", error); 
      res.status(500).json({ error: error.message }); 
    }
    
    
  }
  exports.veiwItem =async (req,res)=>{
    try {
      console.log(req.params.id)
      const id = req.params.id;
      const database = req.params.database;
      const selectmodel =models[database]
      res.status(200).json( await selectmodel.veiwItem(id));
    }
    catch (error){
      console.error("An error occurred:", error); 
      res.status(500).json({ error: error.message }); 
    }
  }
  exports.edit =async (req,res)=>{
    try {
      const id = req.params.id;
      const newInfo=req.body;
      const database = req.params.database;
      const selectmodel =models[database]
      const { targetEdit, titleEdit, descriptionEdit, urlEdit,percentageEdit,prostheticsEdit,costEdit } = newInfo;
      if (database === 'Offer') {
        addResult = await selectmodel.edit(id,targetEdit, titleEdit, descriptionEdit, urlEdit, percentageEdit);
      } else if (database === 'Edu') {
        addResult = await selectmodel.edit(id,targetEdit, titleEdit, descriptionEdit, urlEdit);
      } else if (database === 'Prosthetics') {
        addResult = await selectmodel.edit(id,prostheticsEdit, titleEdit, descriptionEdit, urlEdit,costEdit);
      } else if (database === 'Organizations') {
        addResult = await selectmodel.edit(id,NameEdit, titleEdit, descriptionEdit, urlEdit);
      } else {
        return res.status(400).json({ error: 'Invalid database type' });
      }
      res.status(200).json(addResult);
    }
    catch (error){
 console.error("An error occurred:", error); 
      res.status(500).json({ error: error.message }); 
    }
  }
  exports.delete =async (req,res)=>{
    try {
      const id = req.params.id;
      const database = req.params.database;
      const selectmodel =models[database]
      res.status(200).json( await selectmodel.deleteItem(id));
    }
    catch (error){
 console.error("An error occurred:", error); 
      res.status(500).json({ error: error.message }); 
    }
  }