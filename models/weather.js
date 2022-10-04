const mongoose = require('mongoose')
const Joi = require('joi')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { string } = require('joi')

    const DailyDataSchema = new mongoose.Schema({
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'adresses'
        },
        latitude: {type:Number, required:true},
        longitude: {type:Number, required:true},
        date: {type:Date, required:true},
        current_temperature: {type:Number, required:true},
        current_rain_level: {type:Number, required:true},
        current_chance_rain: {type:String, required:true},
        next_temperature: {type:Number, required:true},
        next_rain_level: {type:Number, required:true},
        next_chance_rain: {type:String, required:true},
    })

    const liveDataSchema = new mongoose.Schema({
        latitude: {type:Number, required:true},
        longitude: {type:Number, required:true},
        temperature: {type:Number, required:true},
        humidity: {type:Number, required:true},
        rain: {type:Number, required:true},
        description: {type:String, required:true},
    })

    const addressSchema = new mongoose.Schema({
        id: {type:String},
        latitude: {type:String, required:true},
        longitude: {type:String, required:true},
        location: {type:String, required:true},
        created_at: {type:Date, default: Date.now, required:true},
        updated_at: {type:Date, default: Date.now, required:true},
    },
    { collection: 'adresses' })

    const broadcasterSchema = new mongoose.Schema({
        name: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        password: {type:String, required:true}
    })

    broadcasterSchema.methods.generateToken = function(){
        const token = jwt.sign(_.pick(this, ['_id', 'name', 'email']), 'aghubJWTKey' )
        return token;
    }

    const contactShema = new mongoose.Schema({
        broadcaster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'broadcasters'
        },
        name: {type:String, required:true},
        email: {type:String,unique:true, sparse: true},
        phone: {type:String, required:true},
        location:{type:String, required:true}
    })

    // validators ***********************************
    function validContact(contact){
        const schema = Joi.object({
            name:Joi.string().required(),
            email:Joi.string().email(),
            phone:Joi.string().required(),
            location:Joi.string().required(),
        })
        return schema.validate(contact)
    }

    function validContactUpdate(contact){
        const schema = Joi.object({
            name:Joi.string(),
            email:Joi.string().email(),
            phone:Joi.string(),
            location:Joi.string(),
        })
        return schema.validate(contact)
    }

    function validBroadcaster(user){
        const schema = Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required().email(),
            password:Joi.string().required(),
            repeat_password: Joi.ref('password')
        })
        .with('password', 'repeat_password')

        return schema.validate(user)
    }

    function validBroadcasterlogin(user){
        const schema = Joi.object({
            email:Joi.string().required().email(),
            password:Joi.string().required()
        })

        return schema.validate(user)
    }

    function validBroadcasterUpdate(user){
        const schema = Joi.object({
            name:Joi.string(),
            email:Joi.string().email(),
            password:Joi.string(),
            repeat_password: Joi.ref('password')
        })

        return schema.validate(user)
    }

    exports.DailyWeather = mongoose.model('DailyWeather',DailyDataSchema)
    exports.LiveWeather = mongoose.model('LiveWeather',liveDataSchema)
    exports.Address = mongoose.model('adresses', addressSchema)
    exports.Broadcaster = mongoose.model('broadcasters', broadcasterSchema)
    exports.Contacts = mongoose.model('contact', contactShema)


    // validator
    module.exports.validateB = validBroadcaster
    module.exports.validateBL = validBroadcasterlogin
    module.exports.validateBU = validBroadcasterUpdate
    module.exports.validateC = validContact
    module.exports.validateCU = validContactUpdate


