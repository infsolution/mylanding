'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EspecialSchema extends Schema {
  up () {
    this.create('especials', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('especials')
  }
}

module.exports = EspecialSchema
