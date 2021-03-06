'use strict'
const User = use('App/Models/User')
const About = use('App/Models/About')
const Category = use('App/Models/Category')
const Contact = use('App/Models/Contact')
const Footer = use('App/Models/Footer')
const Galery = use('App/Models/Galery')
const Presentetion = use('App/Models/Presentetion') 
const Profile = use('App/Models/Profile')
const Social = use("App/Models/Social")
const Testimonial = use('App/Models/Testimonial')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with landinpages
 */
class LandinpageController {
  /**
   * Show a list of all landinpages.
   * GET landinpages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params }) {
    try {
      let landinpage = []
      const user = await User.findBy('username', params.username)
      if(!user){
        return response.status(404).send({message: 'Page not found!'})
      }
      const about = await About.query().where('user_id', user.id).fetch()
      landinpage[0]=about.rows  
      const category = await Category.query().where('user_id', user.id).with('products').fetch()
      landinpage[1]=category.rows
      const contact = await Contact.query().where('user_id', user.id).fetch()
      landinpage[2]=contact.rows
      const footer = await Footer.query().where('user_id', user.id).fetch()
      landinpage[3]=footer.rows
      const galery = await Galery.query().where('user_id', user.id).with('images').fetch()
      landinpage[4]=galery.rows
      const presentetions = await Presentetion.query().where('user_id',user.id).fetch()
      landinpage[5]=presentetions.rows
      const profile = await Profile.query().where('user_id',user.id).fetch()
      landinpage[6]=profile.rows
      const social = await Social.query().where('user_id', user.id).fetch()
      landinpage[7]=social.rows
      const testimonial = await Testimonial.query().where('user_id', user.id).fetch()
      landinpage[8]=testimonial.rows
      return response.send({landinpage})

    } catch (error) {
      console.log(error)
      return response.status(400).send({message:error.message})
    }
  }

  /**
   * Render a form to be used for creating a new landinpage.
   * GET landinpages/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new landinpage.
   * POST landinpages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single landinpage.
   * GET landinpages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing landinpage.
   * GET landinpages/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update landinpage details.
   * PUT or PATCH landinpages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a landinpage with id.
   * DELETE landinpages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LandinpageController
