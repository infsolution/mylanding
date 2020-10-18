'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AboutSchema extends Schema {
  up () {
    this.create('abouts', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('content')
      table.string('video_cover')
      table.string('video_url')
      table.integer('user_id')
      table.foreign('user_id').references('users.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('abouts')
  }
}

module.exports = AboutSchema
