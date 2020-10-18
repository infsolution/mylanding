'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FooterSchema extends Schema {
  up () {
    this.create('footers', (table) => {
      table.increments()
      table.string('title')
      table.string('phrase')
      table.timestamps()
      table.integer('user_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('footers')
  }
}

module.exports = FooterSchema
