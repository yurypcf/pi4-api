'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.decimal('total').notNullable()
      table.enu('status', ['on_sale', 'processing', 'sold', 'canceled'])
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SaleSchema
