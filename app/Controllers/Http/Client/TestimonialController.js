'use strict'
const Testimonial = use('App/Models/Testimonial')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with testimonials
 */
class TestimonialController {
  /**
   * Show a list of all testimonials.
   * GET testimonials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const testimonial = await Testimonial.query().where('user_id', auth.user.id).fetch()
      return response.send({testimonial})
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

 
  /**
   * Create/save a new testimonial.
   * POST testimonials
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['image_description', 'name_client', 'profession', 'stars', 'declaration'])
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
        data.image = photo.clientName
      }
      const testimonial = await Testimonial.create({...data, user_id:auth.user.id})
      return response.status(201).send({testimonial})
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  /**
   * Display a single testimonial.
   * GET testimonials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const testimonial = await Testimonial.findBy('id', params.id)
      return response.send({testimonial})
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }



  /**
   * Update testimonial details.
   * PUT or PATCH testimonials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.only(['image_description', 'name_client', 'profession', 'stars', 'declaration'])
      const testimonial = await Testimonial.findBy('id', params.id)
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
        data.image = photo.clientName
      }
      testimonial.merge({...data})
      await testimonial.save()
      return response.status(200).send({testimonial})
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  /**
   * Delete a testimonial with id.
   * DELETE testimonials/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const testimonial = await Testimonial.findBy('id', params.id)
      testimonial.delete()
      return response.status(204).send()
     } catch (error) {
       return response.status(500).send(error.message)
     }
  }
}

module.exports = TestimonialController
