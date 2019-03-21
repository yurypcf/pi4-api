'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Record extends Model {
    user () {
        return this.belongsTo('App/Models/Users')
    }

    images () {
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Record
