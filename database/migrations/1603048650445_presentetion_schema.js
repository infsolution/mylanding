'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PresentetionSchema extends Schema {
  up () {
    this.create('presentetions', (table) => {
      table.increments()
      table.string('bacground_image')
      table.string('title')
      table.string('content')
      table.timestamps()
      table.integer('user_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('presentetions')
  }
}

module.exports = PresentetionSchema
