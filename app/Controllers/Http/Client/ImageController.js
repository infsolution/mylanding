'use strict'
const Galery = use('App/Models/Galery')
const Image = use('App/Models/Image')
const Helpers = use('Helpers')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class ImageController {
   async index({request, response, auth}){
        try {
            const galery = await Galery.findBy('user_id', auth.user.id)
            const images = await galery.images().fetch()
        return response.send({images})
        } catch (error) {
            return response.status(500).send(error.message)
        }
    }
    async store({request, response, auth}){
        try {
            const galery = await Galery.findBy('user_id', auth.user.id)
            const photos = request.file('file',{
                size: '3mb'
              })
              if(photos){
                await photos.moveAll(Helpers.tmpPath('photos'),(file)=>{
                  return{
                    name:`${Date.now()}-${file.clientName}`
                  }
                })
                
                if(!photos.movedAll()){
                  return photos.errors()
                }
          
                await Promise.all(                 
                  photos.movedList().map(item=> Image.create({galery_id:galery.id, path:item.fileName}))
                )
              }
              return response.status(201).send({galery})
        } catch (error) {
            console.log(error)
            return response.status(500).send(error.message)
        }
        
          }

    async destroy ({ params, request, response }) {
      try {
        const image = await Image.findBy('id', params.id)
        image.delete()
        return response.status(204).send()
      } catch (error) {
        return response.status(500).send(error.message)
        
      }
      
      }
    }

module.exports = ImageController