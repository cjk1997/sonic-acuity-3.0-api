const express = require('express');
const router = express.Router();
const {
    getTracks,
    getTrackByID,
    getTrackByValue,
    addTrack,
    updateTrack,
    deleteTrack
} = require('../../data/tracks');

// router.get('/:key/:value', async function(req, res, next) {
//     if (!req.params.key && !req.params.value) next('route');
//     else next();
// }, async function(req, res, next) {
//     try {
//         const data = await getTrackByID();
//         res.send(data);
//     } catch {
//         console.log(err);
//         res.status(500).send("Internal Server Issues, check logs");
//     }
// });

// router.get('/:id', async function(req, res, next) {
//     if (!req.params.id) next('route');
//     else next('route');
// }, async function(req, res, next) {
//     try {
//         const data = await getTrackByValue(req.params.id);
//         res.send(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Issues, check logs");
//     };
// });

router.get('/', async function(req, res, next) {
    try {
        const data = await getTracks();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    };
});

router.post('/', async function(req, res) {
    try {
        const data = await addTrack(req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Issue, check logs");
    };
});

router.put('/:id', async function(req, res) {
    try {
        const data = await updateTrack(req.params.id, req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Issue, check logs");
    };
});

router.delete('/:id', async function(req, res, next) {
    try {
        const data = await deleteTrack(req.params.id);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Issue, check logs");

    };
});

module.exports = router;