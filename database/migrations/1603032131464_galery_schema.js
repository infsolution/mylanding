'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GalerySchema extends Schema {
  up () {
    this.create('galeries', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('phrase')
      table.integer('user_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('galeries')
  }
}

module.exports = GalerySchema
