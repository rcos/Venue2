const express = require('express');
const agreementRoutes = express.Router();

let Agreement = require('../Agreements/Agreement.model')

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

agreementRoutes.get('/recent', (req, res) => {
  Agreement.getRecent(function (err, agreement) {
      if(err || agreements == null) {
          console.log("<ERROR> Getting most recent agreement")
          res.json(err);
      } else {
          console.log("<SUCCESS> Getting most recent agreement")
          res.json(agreement);
      }
  })
})

agreementRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Agreement.findByDocId(id, function (err, user) {
      if (err || agreement == null) {
        console.log("<ERROR> Getting agreement by Doc ID:", id)
        res.json(err);
      } else {
        console.log("<SUCCESS> Getting agreement by Doc ID:", id)
        res.json(user);
      }
    });
});

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


// maybe include a get all users that do not have matching doc_ids
// or just check each time user logins


//unsure if needed, since each update is hypothetically a new version -- correlates with API
agreementRoutes.route('/update/:id').post(function (req, res) { 
    let id = req.params.id; 
    let updated_agreement = req.body.updated_agreement; 
    Agreement.findByDocIdAndUpdate(id, { 
      doc_id: updated_agreement.doc_id,
      date: updated_agreement.date,
      time: updated_agreement.time },
      function(err, agreement) { if (err || agreement == null) { 
        console.log("<ERROR> Updating agreement by Doc ID:",id,"with:",updated_agreement) 
        res.status(404).send("document not found"); 
      } else { 
        console.log("<SUCCESS> Updating agreement by Doc ID:",id,"with:",updated_agreement) 
        res.json(agreement); 
      } 
    }); 
});

agreementRoutes.route('/delete/:id').delete(function (req, res) {
    Agreement.findByDocIdAndRemove({ _id: req.params.id }, function (err) {
      if (err) {
        console.log("<ERROR> Deleting agreement by Doc ID:", req.params.id)
        res.json(err);
      } else {
        console.log("<SUCCESS> Deleting agreement by Doc ID:", req.params.id)
        res.json('Successfully removed');
      }
    });
});

module.exports = agreementRoutes;