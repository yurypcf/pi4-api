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

// User related Routes
Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

// Records related Routes
Route.resource('records', 'RecordController')
    .apiOnly()
    .middleware('auth')

// Records images related Routes
Route.post('records/:id/images', 'ImageController.store').middleware('auth')
Route.get('images/:path', 'ImageController.show')