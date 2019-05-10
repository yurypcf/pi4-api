'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sale extends Model {
  record_sales () {
    return this.hasMany('App/Models/RecordSale')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Sale
