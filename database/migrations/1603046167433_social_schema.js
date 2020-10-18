'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialSchema extends Schema {
  up () {
    this.create('socials', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('socials')
  }
}

module.exports = SocialSchema
