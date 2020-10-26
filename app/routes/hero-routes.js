module.exports = (app) => {
    const heroes = require('../controllers/hero.controller.js');
    
    // create a new heroes
    app.post('/heroes',heroes.create);
    
    // Retrieve all heroes
    app.get('/heroes',heroes.findAll); 

    // Retrieve a single hero with heroId
    app.get('/heroes/:heroId',heroes.findOne);
    
    // Update a hero with noteId
    app.put('/heroes',heroes.update);
    
    //Delete a hero with noteId
    app.delete('/heroes/:heroId',heroes.delete); 

     // Find a heroes with search term
     app.get('/heroes/search/:heroName',heroes.findSearch); 
    };