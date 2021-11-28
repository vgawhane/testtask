const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);
const { contractsById,contractsList } =require ('./controller/constractsController')
const {jobUnpaidPaymentList, jobPaidPayment} =require  ('./controller/jobController')
const {userBalanceDeposite} =require  ('./controller/profileController')


app.get('/contracts/:id', contractsById);


app.get('/contracts', contractsList);

app.get('/jobs/unpaid', jobUnpaidPaymentList);

app.post('/jobs/:job_id/pay',jobPaidPayment);

app.post('/balances/deposit/:userId',userBalanceDeposite);

module.exports = app;
