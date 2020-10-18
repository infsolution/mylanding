'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(()=>{
    Route.resource('about','AboutController').apiOnly()
    Route.resource('category','CategoryController').apiOnly()
    Route.resource('contact', 'ContactController').apiOnly()
    Route.resource('footer', 'FooterController').apiOnly()
    Route.resource('presentetion', 'PresentetionController').apiOnly()
    Route.resource('product', 'ProductController').apiOnly()
    Route.resource('profile', 'ProfileController').apiOnly()
    Route.resource('social', 'SocialController').apiOnly()
    Route.resource('testimonial', 'TestimonialController').apiOnly()
    //Route.resource('contact', 'ContactController').apiOnly()

}).prefix('client').namespace('Client').middleware(['auth','is:client'])