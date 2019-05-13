'use strict'

const Sale = use('App/Models/Sale')

class SaleController {
  async index ({}) {
    const sales = Sale.query().with('record_sales').fetch()

    return sales;
  }

  async store ({ request, auth }) {
    const { id } = auth.user
    const data = request.only(['total'])

    const sale = Sale.create({ ...data, user_id: id, status: 'sold'})

    return sale;
  }
}

module.exports = SaleController
