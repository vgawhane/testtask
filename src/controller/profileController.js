const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { where } = require('sequelize/types');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models)

module.exports= {






    
   userBalanceDeposite =  async (req, res) => {
        const { Profile } = req.app.get('models');
        const { id } = req.params;
        const reqParam = req.body;
        const profile = await Profile.findOne({ where: { id } });
        if (!profile) {
          return res.status(404).end();
        } else {
          if (
            profile.balance == reqParam.balance ||
            profile.balance <= reqParam.balance
          ) {
            return res.send({
              message: `please enter this much Amount : - ${
                (100 * 25) / reqParam.balance
              }`,
            });
          } else {
            profile.balance = reqParam.balance;
            return res.json(profile);
          }
        }
      }
}