const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { where } = require('sequelize/types');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models)

module.exports = {

  jobUnpaidPaymentList = async (req, res) => {
    const { Job } = req.app.get('models');
    const job = await Job.findAll({ where: { paid: { [Op.ne]: false } } });
    if (!job) return res.status(404).end();
    res.json(job);
  },

  jobPaidPayment =  async (req, res) => {
    const { Job } = req.app.get('models');
    const { id } = req.params;
    const reqParam = req.body;
    const job = await Job.findOne({ where: { id } });
    if (!job) {
      return res.status(404).end();
    } else {
      job.price = reqParam.price;
      job.paid = true;
      res.json(job);
    }
  },

  paidJob = async (req, res) => {
    const { Job } = req.app.get('models');
    const requParam = req.query
    const start = requParam.startDate
    const startDate = Date.parse(start)
    const end = requParam.endDate
    const endDate = Date.parse(end)

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var today = dd + '/' + mm + '/' + yyyy;

    const job = await Job.findAll({ where: { paid: { [Op.ne]: false } } });
    if (!job) {
      return res.status(404).end();
    } else {
      if ((today <= endDate && today >= startDate)) {
        var sum = 0;
        job.map(data => {
          sum += data.price
        })
      }
      return sum
    }
  }

}