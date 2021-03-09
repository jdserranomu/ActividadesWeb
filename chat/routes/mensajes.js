const express = require('express');
const router = express.Router();
const Joi = require("joi");
const Mensaje = require("../models/mensaje");
const ws = require("../wslib");

const schemaMensajeUpdate = Joi.object({
  message: Joi.string().min(5).required(),
  author: Joi.string().min(3).custom(customAutor).max(30).required(),
});

const schemaMensajePost = Joi.object({
  timestamp: Joi.number().integer().positive().required(),
  message: Joi.string().min(5).required(),
  author: Joi.string().min(3).custom(customAutor).max(30).required(),
});

function customAutor(value, helpers){
  const resp = value.trim().split(" ").length >= 2;
  if(!resp){
    throw new Error("author must contain first and last name");
  }
  return value;
}

router.get('/', function(req, res, next) {
  Mensaje.findAll().then(result=>{
    res.send(result);
  });
});

router.get('/:timestamp', function(req, res, next) {
  Mensaje.findByPk(req.params.timestamp).then(result => {
    if (!result) {
      return res.status(404).send("No hay ningún album con ese id")
    }
    res.send(result);
  });
});
module.exports = router;

router.post("/", function (req, res, next){
  const validation = schemaMensajePost.validate(req.body);
  if (validation.error) {
    return res.status(404).send(validation.error.details[0].message);
  }
  Mensaje.findOne({where: {timestamp: req.body.timestamp}})
      .then(result=>{
        if(result) return res.status(409).send("The message with this timestamp already exists");
        Mensaje.create({
          timestamp: req.body.timestamp,
          message: req.body.message,
          author: req.body.author
        }).then(result=>{
          res.send(result);
          console.log(ws.sendMessages)
          ws.sendMessages();
        });
      });
});

router.put( "/:timestamp", function (req, res, next){
  const validation = schemaMensajeUpdate.validate(req.body);
  if (validation.error) {
    return res.status(404).send(validation.error.details[0].message);
  }
  Mensaje.update(req.body, {where:{timestamp:req.params.timestamp}}).then(result=>{
    if(result[0]===0)return res.status(404).send("The message was not found");
    res.status(200).send("The message was updated");
  });
});

router.delete( "/:timestamp", function (req, res, next){
  Mensaje.destroy({where: {timestamp:req.params.timestamp}}).then(result=>{
    if(result===0) return res.status(404).send("The message was not found");
    res.status(204).send("The message was deleted");
  });

});
