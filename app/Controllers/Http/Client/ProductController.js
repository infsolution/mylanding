'use strict'
const Product = use('App/Models/Product')
const Category = use('App/Models/Category')
const Helpers = use('Helpers')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const productsAll = []
      const categories = await Category.query().where('user_id', auth.user.id)
      .with('products')
      .fetch()
      
      if(!categories){
        return response.status(404).send({'message':'Products not found'})
      }
      await Promise.all(
        categories.rows.map(async category =>{
          const products = await category.products().fetch()
          await Promise.all(
            products.rows.map(async product =>{
              productsAll.push(product)
            })
          )
        })
      )
      return response.send({productsAll})
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.message)
    }
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.only(['name', 'description', 'price', 'category_id'])

      const photo = request.file('file',{
        types:['image'],
        size: '3mb'
      })
      if(photo){
        await photo.move(Helpers.tmpPath('photos'),{
          name: `${Date.now()}-${photo.clientName}`,
          overwrite: true
        })
        if(!photo.moved()){
          return photo.error()
        }
        data.photo=photo.clientName
      }

      const product = await Product.create({...data})
      return response.status(201).send({product})
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.message)
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const product = await Product.findBy('id', params.id)
      return response.send({product})
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.only(['name', 'description', 'price', 'category_id'])
      const product = await Product.findBy('id', params.id)
      const photo = request.file('file',{
        types:['image'],
        size: '3mb'
      })
      if(photo){
        await photo.move(Helpers.tmpPath('photos'),{
          name: `${Date.now()}-${photo.clientName}`,
          overwrite: true
        })
        if(!photo.moved()){
          return photo.error()
        }
        data.photo=photo.clientName
      }
      product.merge({...data})
      await product.save()
      return response.send({product})
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.message)
      
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const product = await Product.findBy('id', params.id)
      product.delete()
      return response.status(204).send()
     } catch (error) {
       return response.status(500).send(error.message)
       
     }
  }
}

module.exports = ProductController
