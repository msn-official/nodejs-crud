const Hero = require('../models/hero.model.js');
 
// create and Save a new hero
exports.create= (req,res) => {
    //Validate request 
    if(!req.body.id){
        return res.status(400).send({
            message : "Hero Content can not be empty"
        }); 
    }

    // Create a Hero
    const hero = new Hero({
        id : req.body.id || 'Untitled Hero',
        name : req.body.name
    });
    console.log('name: ' + req.body.name);
    //Save Hero in the database
    hero.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err.message || "Some error occured while creating the Hero."
        });
    });
};
 
// Retrieve and return all heroes from the database
exports.findAll = (req,res) => {
    Hero.find()
    .then(heroes => {
        res.send(heroes);
    }).catch(err => {
        res.status(500).send({
            message : err.message || 'Some error occurred while retrieving heroes'
        });
    });
};

 
// Find a single hero with a heroId
exports.findOne = (req,res) => {
   Hero.findOne( {"id" : req.params.heroId })    
    .then(hero => {
        if(!hero)
        {
            return res.status(404).send({
                message : "Hero not found with id " + req.params.heroId
            });
        }
        res.send(hero);
    }).catch(err => {
        if(err.kind == 'ObjectId')
        {
            return res.status(404).send(
                {
                    message : "Hero not found with id " + req.params.heroId
                });
        }
        return res.status(500).send({
            message : "Error retrieving hero with id " + req.params.heroId
        });
    });
};

// Update a hero identified by the heroId in the request
exports.update = (req,res) => {
  //  console.log("id:" + req.body.id);
        // Validate Request 
        if(!req.body.id){
            return res.status(400).send({
                message : "Hero content can not be empty"
            });
        }
        // Find hero and update it with the request body
        Hero.findOneAndUpdate({"id" : req.body.id },{ 
            name : req.body.name
        },{new : true})
        .then(hero => {
            if(!hero)
            {
                return res.status(404).send({
                        message : "Hero not found with id : " + req.body.id
                });
            }
            res.send(hero);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Hero not found with id " + req.body.id
                });                
            }
            return res.status(500).send({
                message: "Error updating hero with id " + req.body.id
            });    
    });
};

// Delete a hero with the specified heroId in the request
exports.delete = (req,res) => {
    Hero.findOneAndDelete({ "id" : req.params.heroId} )
    .then(hero => {
        if (!hero){
            return res.status(404).send({
                message : "Hero not found with id " + req.params.heroId
            });
        }
        res.send({ message : "Hero deleted successfully!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound')
        {
            return res.status(404).send({
                message : "Hero not found with id " + req.params.heroId
            });
        }
        return res.status(500).send(
            {
                message : "Could not delete hero with id " + req.params.heroId
            });
    })
};



// Find a heroes with search term // substring search with case insensitive 
exports.findSearch = (req,res) => {
   
    Hero.find( {"name" : new RegExp(req.params.heroName, 'i') })    
     .then(hero => {
         if(!hero)
         {
             return res.status(404).send({
                 message : "Hero not found with id " + req.params.heroName
             });
         }
         res.send(hero);
     }).catch(err => {
         if(err.kind == 'ObjectId')
         {
             return res.status(404).send(
                 {
                     message : "Hero not found with id " + req.params.heroName
                 });
         }
         return res.status(500).send({
             message : "Error retrieving hero with id " + req.params.heroName
         });
     });
 };