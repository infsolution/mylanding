'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactSchema extends Schema {
  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.string('title')
      table.string('phrase')
      table.string('attention')
      table.string('attention_content')
      table.string('attention_content_value')
      table.string('registration_link')
      table.string('registration_slug')
      table.string('call_whatsapp_slug')
      table.string('call_whatsapp_content')
      table.timestamps()
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('contacts')
  }
}

module.exports = ContactSchema
