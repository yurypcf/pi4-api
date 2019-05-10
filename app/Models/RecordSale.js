'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RecordSale extends Model {
  sale () {
    return this.belongsTo('App/Models/Sale')
  }

  records () {
    return this.hasMany('App/Models/Record')
  }
}

module.exports = RecordSale
