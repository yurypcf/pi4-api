'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecordSchema extends Schema {
  up () {
    this.create('records', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('artist').notNullable()
      table.string('genre').notNullable()
      table.decimal('price').notNullable()
      table.integer('stock').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('records')
  }
}

module.exports = RecordSchema
