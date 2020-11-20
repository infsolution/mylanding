'use strict'
const About = use('App/Models/About')
const User = use('App/Models/User')
const Helpers = use('Helpers')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with abouts
 */
class AboultController {
  /**
   * Show a list of all abouts.
   * GET abouts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params }) {
   
  }


  /**
   * Create/save a new about.
   * POST abouts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
   
  }

  /**
   * Display a single about.
   * GET abouts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

 
  /**
   * Update about details.
   * PUT or PATCH abouts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a about with id.
   * DELETE abouts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

  }

  async public({params, request, response}){
    try {
      const user = await User.findBy('username', params.username)
      if(!user){
        return response.status(404).send({message: 'Page not found!'})
      }
      const about = await About.findBy('user_id', user.id)  
      return response.send(about)
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.messaage)
    }
  }
}

module.exports = AboultController
