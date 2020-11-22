'use strict'
const Category = use('App/Models/Category')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      
      const categories = await Category.query().where('user_id', auth.user.id)
      .with('products')
      .fetch()
      return response.send({categories})
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.message)
    }
  }



  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const {name} = request.all()
      const category = await Category.create({name:name, user_id: auth.user.id})
      return response.status(201).send({category})
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.message)
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response}) {
    try {
      const category = await Category.findBy('id', params.id)
      return response.send({category})
    } catch (error) {
      return response.status(500).send(error.message)
    }

  }


  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response}) {
    try {
      const {name} = request.only(['name'])
      const category = await Category.findBy('id', params.id)
      category.name = name
      await category.save()
      return response.send({category})
    } catch (error) {
      return response.status(500).send(error.message)
      
    }
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
   try {
    const category = await Category.findBy('id', params.id)
    category.delete()
    return response.status(204).send()
   } catch (error) {
     return response.status(500).send(error.message)
     
   }
   
  }
}

module.exports = CategoryController
