'use strict'

const Sale = use('App/Models/Sale')

class SaleController {
  async index ({}) {
    const sales = Sale.query().with('record_sales').fetch()

    return sales;
  }

  async store ({ request, auth }) {
    const { id } = auth.user
    const data = request.only(['total', 'cep', 'shipping_value', 'tracking_code'])

    const sale = Sale.create({ ...data, user_id: id, status: 'sold'})

    return sale;
  }

  async show ({ params }) {
    const sale = await Sale.findOrFail(params.id)

    await sale.load('record_sales')

    return sale
  }

  async update ({ params, request }) {
    const sale = await Sale.findOrFail(params.id)

    const data = request.only(['total', 'cep', 'shipping_value', 'tracking_code'])

    sale.merge(data)

    await sale.save()

    return sale
  }

  async destroy ({ params, response }) {
    const sale = await Sale.findOrFail(params.id)

    sale.delete()

    return response.json({ message: "Sale deleted succesfully" })
  }
}

module.exports = SaleController
