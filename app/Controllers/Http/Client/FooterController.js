'use strict'
const Footer = use('App/models/Footer')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with footers
 */
class FooterController {
  /**
   * Show a list of all footers.
   * GET footers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const footer = await Footer.findBy('user_id',auth.user.id)
      return response.send({footer})
    } catch (error) {
      return response.status(500).send(error.messaage)
    }
  }



  /**
   * Create/save a new footer.
   * POST footers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const {data} = request.all()
      let footer = await Footer.findBy('user_id',auth.user.id)
      if(!footer){
         footer = await Footer.create({...data, user_id:auth.user.id})
         return response.status(201).send({footer})
      }
      footer.merge({...data})
      await footer.save()
      return response.send({footer})      
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.messaage)
    }
  }

  /**
   * Display a single footer.
   * GET footers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }


  /**
   * Update footer details.
   * PUT or PATCH footers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const footer = await Footer.findBy('id', params.id)
      footer.delete()
      return response.status(204).send()
     } catch (error) {
       return response.status(500).send(error.message)
       
     }
  }

  /**
   * Delete a footer with id.
   * DELETE footers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FooterController
