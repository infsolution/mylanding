'use strict'
const Contact = use('App/Models/Contact')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const contact = await Contact.findBy('user_id',auth.user.id)
      return response.send({contact})
    } catch (error) {
      return response.status(500).send(error.messaage)
    }
  }


  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const {data} = request.all()
      let contact = await Contact.findBy('user_id',auth.user.id)
      if(!contact){
         contact = await Contact.create({...data, user_id:auth.user.id})
         return response.status(201).send({contact})
      }
      contact.merge({...data})
      await contact.save()
      return response.send({contact})      
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.messaage)
    }
  }

  /**
   * Display a single contact.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const contact = await Contact.findBy('id', params.id)
      contact.delete()
      return response.status(204).send()
     } catch (error) {
       return response.status(500).send(error.message)
       
     }
  }
}

module.exports = ContactController
