'use strict'

const RecordSale = use('App/Models/RecordSale')

class RecordSaleController {
  async index ({}) {
    const record_sales = await RecordSale.query().fetch()

    return record_sales;
  }

  async store ({ request, params }) {
    const data = request.collect(['quantity', 'unitary_value', 'record_id'])

    const results = [];
    for(let i = 0; i < data.length; i++) {
      let record_sale = data[i]
      record_sale.sale_id = params.id
      results.push(record_sale);
    } 

    
    const record_sales = await RecordSale.createMany(results);

    return record_sales
  }
}

module.exports = RecordSaleController
