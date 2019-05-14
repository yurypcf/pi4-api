'use strict'

const RecordSale = use('App/Models/RecordSale')
const Record = use('App/Models/Record')

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

      const record = await Record.findByOrFail('id', data[i].record_id)
      try {
        const downStock = record.stock - data[i].quantity
        if(downStock < 0) {
          console.log(downStock);
          throw "Unable to lower stock, it reached 0 and its going to be negative"
        } else {
          record.merge({ stock: downStock })
          await record.save()
          if(downStock === 0) {
            console.log("Warning: stock reached 0!")
          }
        }
      } catch (error) {
        console.log('Unhandled error on lowering stock' + error)
      }
    }

    const record_sales = await RecordSale.createMany(results);

    return record_sales
  }
}

module.exports = RecordSaleController
