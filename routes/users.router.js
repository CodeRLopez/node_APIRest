const express = require('express');


const router = express.Router();

//parametros query (no van definidos en el endpoint ya que son opcionales)
router.get('/', (req, res) => {
    const { limit, offset } = req.query;

    if (limit && offset) {
        res.json({
            limit,
            offset
        });
    } else {
        res.send('No hay parametros');
    }

});

module.exports = router;
