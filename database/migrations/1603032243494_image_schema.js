'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('path',256).notNullable()
      table.timestamps()
      table.integer('galery_id')
      table.foreign('galery_id').references('galeries.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
