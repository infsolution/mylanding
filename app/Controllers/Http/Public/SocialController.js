'use strict'
const Social = use("App/Models/Social")
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with socials
 */
class SocialController {
  /**
   * Show a list of all socials.
   * GET socials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const social = await Social.query().where('user_id', auth.user.id).fetch()
      return response.send({social})
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  /**
   * Create/save a new social.
   * POST socials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['name', 'link'])
      const social = await Social.create({...data, user_id:auth.user.id})
      return response.status(201).send({social})
    } catch (error) {
      return response.status(500).send(error.message) 
    }
  }

  /**
   * Display a single social.
   * GET socials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const social = await Social.findBy('id', params.id)
      return response.send({social})
    } catch (error) {
      return response.status(500).send(error.message)
    }

  }


  /**
   * Update social details.
   * PUT or PATCH socials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const {name} = request.only(['name', 'link'])
      const social = await Social.findBy('id', params.id)
      social.name = name
      await social.save()
      return response.send({social})
    } catch (error) {
      return response.status(500).send(error.message)
      
    }
  }

  /**
   * Delete a social with id.
   * DELETE socials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const social = await Social.findBy('id', params.id)
      social.delete()
      return response.status(204).send()
     } catch (error) {
       return response.status(500).send(error.message)
       
     }
  }
}

module.exports = SocialController
