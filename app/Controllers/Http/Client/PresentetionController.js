'use strict'
const Presentetion = use('App/Models/Presentetion') 
const Helpers = use('Helpers')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with presentetions
 */
class PresentetionController {
  /**
   * Show a list of all presentetions.
   * GET presentetions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const presentetions = await Presentetion.query().where('user_id',auth.user.id).fetch()
      return response.send({presentetions})
    } catch (error) {
      return response.status(500).send(error.messaage)
    }
  }

  /**
   * Create/save a new presentetion.
   * POST presentetions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['title', 'content'])
      const photo = request.file('file',{
        types:['image'],
        size: '3mb'
      })

      await photo.move(Helpers.tmpPath('photos'),{
        name: `${Date.now()}-${photo.clientName}`,
        overwrite: true
      })
      if(!photo.moved()){
        return photo.error()
      }
      const presentetion = await Presentetion.create({...data, bacground_image:photo.clientName, user_id:auth.user.id})
      return response.send({presentetion})
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.messaage)
    }
  }

  /**
   * Display a single presentetion.
   * GET presentetions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    try {
      const presentetion = await Presentetion.findBy('id', params.id)
      return response.send({presentetion})
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  /**
   * Update presentetion details.
   * PUT or PATCH presentetions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const data = request.only(['title', 'content'])
      const presentetion = await Presentetion.findBy('user_id', auth.user.id)
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
        data.bacground_image=photo.clientName
      }

      presentetion.merge({...data})
      await presentetion.save()
      return response.send({presentetion})
    } catch (error) {
      return response.status(500).send(error.message)
    }

  }

  /**
   * Delete a presentetion with id.
   * DELETE presentetions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const presentetion = await Presentetion.findBy('id', params.id)
      presentetion.delete()
      return response.status(204).send()
     } catch (error) {
       return response.status(500).send(error.message)
       
     }
  }
}

module.exports = PresentetionController
