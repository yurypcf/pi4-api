'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', () => '/login')

// User related Rutes
Route.post('/users', 'UserController.create')
Route.get('/users', 'UserController.index').middleware('auth')
Route.get('/users/:id', 'UserController.show').middleware('auth')

// Auth related Routes
Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

// Records related Routes
Route.resource('records', 'RecordController')
    .apiOnly()
    .middleware('auth')

// Records images related Routes
Route.post('records/:id/images', 'ImageController.store').middleware('auth')
Route.get('images/:path', 'ImageController.show')

// Sale related Routes
Route.resource('sales', 'SaleController')
    .apiOnly()
    .middleware('auth')

Route.post('sales/:id/record_sales', 'RecordSaleController.store').middleware('auth')
Route.get('sales/:id/record_sales', 'RecordSaleController.index').middleware('auth')
