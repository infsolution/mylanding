'use strict'
const About = use('App/Models/About')
const Helpers = use('Helpers')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with abouts
 */
class AboutController {
  /**
   * Show a list of all abouts.
   * GET abouts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const about = await About.findBy('user_id', auth.user.id)
      return response.send({about})
    } catch (error) {
      return response.status(500).send(error.messaage)
    }
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
    try {
      const data = request.only(['title', 'content', 'video_url'])
      let about = await About.findBy('user_id', auth.user.id)
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
        data.video_cover=photo.clientName
      }
      if(!about){
        about = await About.create({...data, user_id:auth.user.id})
      }else{
        about.merge({...data})
        await about.save()
      }
      return response.send({about})
    } catch (error) {
      console.log(error)
      return response.status(500).send(error.messaage)
    }
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
    try {
      const presentetion = await About.findBy('id', params.id)
      presentetion.delete()
      return response.status(204).send()
     } catch (error) {
       return response.status(500).send(error.message)
       
     }
  }
}

module.exports = AboutController
