'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(()=>{
    Route.get('aboult/:username','AboultController.public').as('aboult.public')
    Route.get('category/:username','CategoryController.public').as('category.public')
    Route.get('galery/:username','GaleryController.public').as('galery.public')
    Route.get('contact/:username', 'ContactController.public').as('contact.public')
    Route.get('footer/:username', 'FooterController.public').as('footer.public')
    Route.get('presentetion/:username', 'PresentetionController.public').as('presentetion.public')
    //Route.get('product', 'ProductController.public').as('product.public')
    Route.get('profile/:username', 'ProfileController.public').as('profile.public')
    Route.get('social/:username', 'SocialController.public').as('social.public')
    Route.get('testimonial/:username', 'TestimonialController.public').as('testimonial.public')
    Route.get('image/:username', 'ImageController.public').as('.public')
}).prefix('public').namespace('Public')