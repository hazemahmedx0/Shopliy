const { Router } = require('express')
const categoryControllers = require('./../controllers/categoryControllers')

const router = Router()
router.get('/categories', categoryControllers.get_all_categories)
router.get('/categories/:id', categoryControllers.get_category_by_id)
router.post('/categories/add', categoryControllers.add_category)
router.delete('/categories/delete/:id', categoryControllers.delete_category)
router.put('/categories/update/:id', categoryControllers.update_category)

module.exports = router
