const express = require('express');
const agreementRoutes = express.Router();

let Agreement = require('../Agreements/Attachment.model')

agreementRoutes.route('/add').post(function (req, res) {
    let agreement = new Agreement(req.body.agreement);
    agreement_submission.save()
        .then(() => {
            console.log("<SUCCESS> Saving user agreement:", agreement_submission)
            res.status(200).json(agreement_submission);
        })
        .catch(() => {
            console.log("<ERROR> Saving user agreement:", agreement_submission)
            res.status(400).send("unable to save agreement to database");
        });
});

agreementRoutes.get('/', (req, res) => {
    Agreement.find(function (err, agreements) {
        if(err || agreements == null) {
            console.log("<ERROR> Getting all agreements")
            res.json(err);
        } else {
            console.log("<SUCCESS> Getting all agreements")
            res.json(agreements);
        }
    })
})

agreementRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Agreement.findById(id, function (err, user) {
      if (err || agreement == null) {
        console.log("<ERROR> Getting agreement by User ID:", id)
        res.json(err);
      } else {
        console.log("<SUCCESS> Getting agreement by User ID:", id)
        res.json(user);
      }
    });
});


//maybe include a get all users that do not have matching doc_ids


agreementRoutes.route('/update/:id').post(function (req, res) { 
    let id = req.params.id; 
    let updated_agreement = req.body.updated_agreement; 
    Agreement.findByUserIdAndUpdate(id, { 
      doc_id: updated_agreement.doc_id,
      date: updated_agreement.date },
      function(err, agreement) { if (err || agreement == null) { 
        console.log("<ERROR> Updating agreement by User ID:",id,"with:",updated_agreement) 
        res.status(404).send("user not found"); 
      } else { 
        console.log("<SUCCESS> Updating agreement by User ID:",id,"with:",updated_agreement) 
        res.json(agreement); 
      } 
    }); 
});

agreementRoutes.route('/delete/:id').delete(function (req, res) {
    Agreement.findByUserIdAndRemove({ _id: req.params.id }, function (err) {
      if (err) {
        console.log("<ERROR> Deleting agreement by User ID:", req.params.id)
        res.json(err);
      } else {
        console.log("<SUCCESS> Deleting agreement by User ID:", req.params.id)
        res.json('Successfully removed');
      }
    });
});

module.exports = agreementRoutes;