'use strict'

const Record = use('App/Models/Record')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with records
 */
class RecordController {
  /**
   * Show a list of all records.
   * GET records
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const records = Record.query()
      .with('images')
      .fetch()

    return records
  }

  /**
   * Create/save a new record.
   * POST records
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const { id } = auth.user
    const data = request.only(['title', 'artist', 'genre', 'price'])

    const record = await Record.create({ ...data, user_id: id }) 

    return record
  }

  /**
   * Display a single record.
   * GET records/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const record = await Record.findOrFail(params.id)

    await record.load('images')

    return record
  }

  /**
   * Update record details.
   * PUT or PATCH records/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const record = await Record.findOrFail(params.id)

    const data = request.only(['title', 'artist', 'genre', 'price'])

    record.merge(data)

    await record.save()

    return record
  }

  /**
   * Delete a record with id.
   * DELETE records/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const record = await Record.findOrFail(params.id)

    record.delete()

    return response.json({ message: 'Record deleted successfully' })
  }
}

module.exports = RecordController
