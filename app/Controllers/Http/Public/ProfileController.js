'use strict'
const Profile = use('App/Models/Profile')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const profile = await Profile.findBy('user_id', auth.user.id)
      return response.send({profile}) 
    } catch (error) {
      return response.status(500).send(error.message)
    }
  }

  /**
   * Create/save a new profile.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['name', 'profission', 'title', 'description'])
      let profile = await Profile.findBy('user_id',auth.user.id)
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
      if(!profile){
        profile = await Profile.create({...data, user_id: auth.user.id})
        return response.status(201).send({profile})
      }
      profile.merge({...data})
      await profile.save()
      return response.status(201).send({profile})
    } catch (error) {
      return response.status(500).send(error.message)
    }

  }

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }



  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const profile = await Profile.findBy('id', params.id)
      profile.delete()
      return response.status(204).send()
     } catch (error) {
       return response.status(500).send(error.message)
       
     }
  }
}

module.exports = ProfileController
