'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TestimonialSchema extends Schema {
  up () {
    this.create('testimonials', (table) => {
      table.increments()
      table.string('image')
      table.string('image_description')
      table.string('name_client')
      table.string('profession')
      table.integer('stars')
      table.string('declaration')
      table.timestamps()
      table.integer('user_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('testimonials')
  }
}

module.exports = TestimonialSchema
