const { Broadcaster, validateB, validateBL,validateBU, validateC, validateCU, Contacts} = require('../models/weather') 
const mongoose =  require('mongoose')
const bcrypt = require('bcrypt')
const axios =  require('axios')
const _ = require('lodash')


mongoose.connect('mongodb://`root:t5f2KfqwvNRX8ii@srv-captain--weather/weatherDB')
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('could not connect to mongoDB', err))


module.exports = {
    // Broadcasters ****************************************************
    register: async (req, res) => {
        const validate = validateB(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

        let user = await Broadcaster.findOne({email:validate.value.email})
        if(user) return res.status(400).send('email already exists')

         user = new Broadcaster({
            'name': validate.value.name,
            'email': validate.value.email,
            'password': validate.value.password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()
        const token = user.generateToken()
        res.json(token)
     },

     login: async (req, res) => {
        const validate = validateBL(req.body)
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

        let user = await Broadcaster.findOne({email:validate.value.email})
        if(!user) return res.status(400).send('invalid username or password')

        const validPass = await bcrypt.compare(validate.value.password, user.password)
        if(!validPass) return res.status(400).send('invalid password')

        const token = user.generateToken()
        res.json(token)
     },

    index: async (req, res) => {
        const users = await Broadcaster.find()
        var userarr = []
        users.forEach(element => {
          userarr.push(_.pick(element, ['_id', 'name', 'email']))
        });
        res.send(userarr)
    },

    delete: async (req, res) => {
        const user = await Broadcaster.findByIdAndRemove(req.params.id)
        res.send(_.pick(user, ['_id', 'name', 'email']))
    },

    update: async (req, res) => {
        const validate = validateBU(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

        if(validate.value.password){
            const salt = await bcrypt.genSalt(10)
            validate.value.password = await bcrypt.hash(validate.value.password, salt)
        }

        const user =  await Broadcaster.findByIdAndUpdate(req.params.id, {
        $set:validate.value
        },{new:true});
        
        res.send(_.pick(user, ['_id', 'name', 'email']))
    },

    // Contacts ***************************************************************
    createContact : async (req, res) => {
        const validate = validateC(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

        // let contactEmail = await Contacts.findOne({email:validate.value.email})
        // if(contactEmail) return res.status(400).send('email already exists')
                
         const contact = new Contacts({
            broadcaster : req.auth._id.toString(),
            'name': validate.value.name,
            'email': validate.value.email,
            'location': validate.value.location,
            'phone': validate.value.phone
        })

        await contact.save();        
        res.send(contact)
    },

    showContacts : async (req, res) => {
        const contacts = await Contacts.find({broadcaster:req.auth._id})
        res.send(contacts)
    },  

    updateContact: async (req, res) => {
        const validate = validateCU(req.body) 
        if (validate.error) return res.status(400).send(validate.error.details[0].message)

        var authcontacts = await Contacts.findById(req.params.id).select({broadcaster:1})
        
        if(authcontacts.broadcaster != req.auth._id) return res.status(401).send('unauthorized action')

        const contact =  await Contacts.findByIdAndUpdate(req.params.id, {
            $set:validate.value
        },{new:true});
        
        res.send(contact)
    },

    deleteContact: async (req, res) => {
        var authcontacts = await Contacts.findById(req.params.id).select({broadcaster:1})

        if(authcontacts.broadcaster != req.auth._id) return res.status(401).send('unauthorized action')

        const contact = await Contacts.findByIdAndRemove(req.params.id)
        res.send(contact)
    },

    notify: async (req, res) => {
        
        const apiKey = 'KSI5vjdg5z3LjV8ezU7OTElJxfOirVKbOshkMvAS4DEny' // move to env
        let recipients =  req.body.recipient
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

}