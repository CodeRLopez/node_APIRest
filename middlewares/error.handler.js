function logErrors (err, req, res, next) { //este middle solo captura el error y lo muestra en consola
    console.log('logErrors')
    console.error(err);
    next(err)
}

function errorHandler (err, req, res, next) { //este lo acaba con la peticion y manda al cliente el mensaje
    console.log('errorHandler')
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
} 

module.exports = {
    logErrors,
    errorHandler
};