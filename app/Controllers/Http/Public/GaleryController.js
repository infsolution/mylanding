'use strict'

const Galery = use('App/Models/Galery')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class GaleryController {
      /**
   * Show a list of all categories.
   * 
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const galery = await Galery.query().where('user_id', auth.user.id)
      .with('images')
      .first()
      return response.send({galery})
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
      const data = request.only(['title', 'phrase'])
      let galery = await Galery.findBy('user_id', auth.user.id)
      if(!galery){
        galery = await Galery.create({...data, user_id: auth.user.id})
        return response.status(201).send({galery})
      }
      galery.merge({...data})
      await galery.save()
      return response.status(200).send({galery})
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
        const galery = Galery.findBy('id', params.id)
        return response.send({galery})
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
        const data = request.only(['title', 'phrase'])
        const galery = await Galery.findBy('id', params.id)
        galery.merge({...data})
        await galery.save()
        return response.send({galery})
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
    const galery = await Galery.findBy('id', params.id)
    galery.delete()
    return response.status(204).send()
   } catch (error) {
     return response.status(500).send(error.message)
     
   }
   
  }
}

module.exports = GaleryController