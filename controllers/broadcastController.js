const bcrypt = require('bcrypt')
const axios =  require('axios')
const _ = require('lodash')
const db = require('../models')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")


const Address = db.Address
const ExtensionOfficer = db.ExtensionOfficer
const Extension = db.Extension
const ExtGroup = db.ExtGroup
const GroupLink = db.GroupLink


module.exports = {
    // Broadcasters ****************************************************
    register: async (req, res) => {

        function validExtOfficer(user){
            const schema = Joi.object({
                name:Joi.string().required(),
                email:Joi.string().required().email(),
                password:Joi.string().required(),
                repeat_password: Joi.ref('password')
            })
            .with('password', 'repeat_password')
    
            return schema.validate(user)
        }
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

        let user = await ExtensionOfficer.findOne({where:{email:req.body.email}})
        if(user) return res.status(400).send('email already exists')

         user = {
            'name': req.body.name,
            'email': req.body.email,
            'password': req.body.password
        }
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        user = await ExtensionOfficer.create(user)

        const token = jwt.sign(_.pick(user, ['id', 'name', 'email']), 'aghubJWTKey' ) //put in .env
        res.json(token)
     },

     login: async (req, res) => {
        let user = await ExtensionOfficer.findOne({where:{email:req.body.email}})
        if(!user) return res.status(400).send('invalid username')

        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass) return res.status(400).send('invalid password')

        const token = jwt.sign(_.pick(user, ['id', 'name', 'email']), 'aghubJWTKey' )  //put in .env
        res.json(token)
     },

    index: async (req, res) => {
        const users = await ExtensionOfficer.findAll({})
        var userarr = []
        users.forEach(element => {
          userarr.push(_.pick(element, ['_id', 'name', 'email']))
        });
        res.send(userarr)
    },

    delete: async (req, res) => {
        const user = await ExtensionOfficer.destroy({where:{id:req.params.id}})
        res.send(`User with id:452${req.params.id} deleted successfully`)
    },

    update: async (req, res) => {
        console.log(req.body)
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        const user =  await ExtensionOfficer.update(req.body, {where:{id : req.params.id}});
        
        res.status(200).send(`Ext Officer with id:452${req.params.id} has been updated`)
    },

    // Contacts ***************************************************************
    createContact : async (req, res) => {
        function validExtOfficer(contact){
            const schema = Joi.object({
                name:Joi.string().required(),
                email:Joi.string().email(),
                addressId:Joi.number().required(),
                phone: Joi.number().required()
            })
            .with('password', 'repeat_password')
    
            return schema.validate(contact)
        }
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)


       if(req.body.email){
            let contactEmail = await Extension.findOne({where:{
                email : req.body.email,
            }})
            if(contactEmail) return res.status(400).send('email already exists')
       }

         const contact =  {
            'extensionsOfficerId' : req.auth.id,
            'name': req.body.name,
            'email': req.body.email,
            'addressId': req.body.addressId,
            'phone': req.body.phone
        }

        await Extension.create(contact);        
        res.send(contact)
    },
    searchContacts: async (req, res) => {
        const extOfficer = await ExtensionOfficer.findOne({
            where: {
              id: req.auth.id
            },
        });
        let searchVal = req.params.extname
        const contacts = await extOfficer.getExtensions({ 
            where: {name:{[Op.substring]: searchVal} }         
         })
        res.status(200).send(contacts)   
    },

    showContacts : async (req, res) => {
       const extOfficer = await ExtensionOfficer.findOne({
            where: {
              id: req.auth.id
            },
          });
        const contacts = await extOfficer.getExtensions({            
            include: Address
        })
        res.send(contacts)
    },  
    showContactOne : async (req, res) => {  
        const extOfficer = await ExtensionOfficer.findOne({
             where: {
               id: req.auth.id
             },
           });
         const contacts = await extOfficer.getExtensions({ 
            where:{id:req.params.id},           
            include: Address
         })
         res.send(contacts)
     },  
 
    updateContact: async (req, res) => {

        var authOfficers = await Extension.findOne({where:{id:req.params.id}, attributes: ['extensionsOfficerId']})

        if(authOfficers.extensionsOfficerId != req.auth.id) return res.status(401).send('unauthorized action')

        const contact =  await Extension.update(req.body, {where:
            {id:req.params.id}
        });
        
        res.status(200).send(`Extension with id:0048${req.params.id} has been updated`)
    },

    deleteContact: async (req, res) => {
        var authOfficers = await Extension.findOne({where:{id:req.params.id}, attributes: ['extensionsOfficerId']})
        if(authOfficers.extensionsOfficerId != req.auth.id) return res.status(401).send('unauthorized action')

        const contact = await Extension.destroy({where:{
            id:req.params.id
        }})
        res.send(`the extention with id:0048${req.params.id} has been deleted`)
    },

    notify: async (req, res) => {
        const apiKey = 'KSI5vjdg5z3LjV8ezU7OTElJxfOirVKbOshkMvAS4DEny' // move to env
        let recipients =  req.body.recipients
        let msg = req.body.msg

        endPoint = 'https://api.mnotify.com/api/sms/quick'
        const data = {
             'recipient': recipients,
             'sender': 'Ikra',
             'message': msg     
        }
        const link = endPoint + '?key=' + apiKey
        const config = {
            method: 'post',
            url: link,
            headers : {
            'Accept': 'application/json'
            },
            data : data
        };

        await axios(config)  
        .then(function (response)  {
            res.send(JSON.stringify(response.data));  
        })  
        .catch(function (error)  {
            res.send(error);  
        })  
    },

    // ExtensionsGroup *************************************************
    createExtGroup : async (req, res) => {
        function validExtOfficer(contact){
            const schema = Joi.object({
                label:Joi.string().required(),
                description:Joi.string(),
                
            })
            .with('password', 'repeat_password')
    
            return schema.validate(contact)
        }
        const validate = validExtOfficer(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)


        if(req.body.label){
            let ExtGroupLabel = await ExtGroup.findOne({where:{
                label : req.body.label,
            }})
            if(ExtGroupLabel) return res.status(400).send('Group already exists')
        

        const group =  {
             'extensionsOfficerId' : req.auth.id,
             'label': req.body.label,
             'description': req.body.description
         }
 
         await ExtGroup.create(group);        
         res.send(group)
        }else{
            return res.status(400).send('input is required')
        }
     },

     showExtGroup : async (req, res) => {
        const extOfficer = await ExtensionOfficer.findOne({
             where: {
               id: req.auth.id
             },
           });
         const group = await extOfficer.getExtGroups()
         res.send(group)
     },  
 
     updateExtGroup: async (req, res) => {
 
         var authOfficers = await ExtGroup.findOne({where:{id:req.params.id}, attributes: ['extensionsOfficerId']})
 
         if(authOfficers.extensionsOfficerId != req.auth.id) return res.status(401).send('unauthorized action')
 
         const extGroup =  await ExtGroup.update(req.body, {where:
             {id:req.params.id}
         });
         
         res.status(200).send(`Extension with id:0048${req.params.id} has been updated`)
     },
 
     deleteExtGroup: async (req, res) => {
         var authOfficers = await ExtGroup.findOne({where:{id:req.params.id}, attributes: ['extensionsOfficerId']})
         if(authOfficers.extensionsOfficerId != req.auth.id) return res.status(401).send('unauthorized action')
 
         const extGroup = await ExtGroup.destroy({where:{
             id:req.params.id
         }})
         res.send(`the extention with id:0048${req.params.id} has been deleted`)
     },


    //  GroupLink*************************************************************************************
    addGroupLink : async (req, res) => {

        const grouplink =  {
           'extensionId' : req.body.extensionId,
           'extGroupId': req.body.extGroupId,
       }

       await GroupLink.create(grouplink);        
       res.send(grouplink)
   },

   showGroupLink : async (req, res) => {
      const extOfficer = await ExtensionOfficer.findOne({
           where: {
             id: req.auth.id
           },
         });
       const group = await extOfficer.getExtGroups({where:{
        id:req.params.ExtGroupId
       }})
       const link = await GroupLink.findAll({where:{
        extGroupId:group[0].id
       },include : Extension})
       res.send(link)

   },  

   deleteGroupLink: async (req, res) => {
       const extGroup = await GroupLink.destroy({where:{
           id:req.params.id
       }})
       res.send(`the extention with id:0048${req.params.id} has been deleted`)
   },
}