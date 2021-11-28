const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { where } = require('sequelize/types');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models)


module.exports = {
    contractsById =    async (req, res) => {
        const { Contract } = req.app.get('models');
        const { id } = req.params;
        const contract = await Contract.findOne({ where: { id } });
        if (!contract) return res.status(404).end();
        res.json(contract);
      },

      contractsList =   async (req, res) => {
        const { Contract } = req.app.get('models');
        const constract = await Contract.findAll({
          where: { status: { [Op.ne]: 'terminated' } },
        });
        if (!contract) return res.status(404).end();
        res.json(contract);
      }
}