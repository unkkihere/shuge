const express = require('express');
const router = express.Router();
const paintingController = require('../controllers/paintingController');
const bgPaintingController = require('../controllers/bgPaintingController');

router.get('/paintings/random', paintingController.random);
router.get('/paintings/latest', paintingController.latest);
router.get('/painting/:id', paintingController.byId);
router.post('/painting', paintingController.create);
router.post('/painting/like/:id', paintingController.like);
//如何实现这个更新接口???
router.put('/painting/:id', paintingController.update);


router.get('/bgpaintings', bgPaintingController.all);
router.get('/bgpainting/:id', bgPaintingController.byId);
router.get('/bgpainting', bgPaintingController.random);
router.post('/bgpainting', bgPaintingController.create);
//如何实现这个更新接口???
router.put('/bgpainting/:id', bgPaintingController.update);

module.exports = router;