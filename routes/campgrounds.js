const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campground = require('../controllers/campgrounds')
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })





router.get('/', catchAsync(campground.index));

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campground.createCampground))
//router.post('/', upload.array('image'), (req, res) => {
//console.log(req.body, req.files)
//     res.send('it works')
// })
router.get('/new', isLoggedIn, campground.renderNewCampground)



router.get('/:id', catchAsync(campground.showCampgrounds))
router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campground.updateCampground))
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campground.deleteCampground));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.editCampground))

module.exports = router;