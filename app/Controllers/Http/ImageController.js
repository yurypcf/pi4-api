'use strict'

const Image = use('App/Models/Image')
const Record = use('App/Models/Record')

const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  /**
   * Create/save a new image.
   * POST images
   */
  async store ({ request, params }) {

    const record = await Record.findOrFail(params.id)

    const images = request.file('image', {
        types: ['image'],
        size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
        name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.movedAll()) {
        return images.errors()
    }

    await Promise.all(
        images
            .movedList()
            .map(image => record.images().create({ path: image.fileName }))
    )
    
  }
}

module.exports = ImageController