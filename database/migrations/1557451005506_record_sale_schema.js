'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecordSaleSchema extends Schema {
  up () {
    this.create('record_sales', (table) => {
      table.increments()
      table
        .integer('record_id')
        .unsigned()
        .references('id')
        .inTable('records')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('sale_id')
        .unsigned()
        .references('id')
        .inTable('sales')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.decimal('unitary_value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('record_sales')
  }
}

module.exports = RecordSaleSchema
