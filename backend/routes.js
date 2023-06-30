const Outflows = require('./schemas/Outflows');

module.exports = function(app){

    app.get('/api', function(req, res){
        res.json(true);
    });

    app.get('/outflows', async function(req, res) {
        try {
            const outflows = await Outflows.find();

            res.json(outflows);
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
}