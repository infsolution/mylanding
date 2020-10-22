'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialSchema extends Schema {
  up () {
    this.create('socials', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('link').notNullable()
      table.timestamps()
      table.integer('user_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('socials')
  }
}

module.exports = SocialSchema
