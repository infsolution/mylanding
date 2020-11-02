'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('description')
      table.float('price', 8, 2)
      table.string('photo', 256)
      table.integer('category_id')
      table.foreign('category_id').references('categories.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
