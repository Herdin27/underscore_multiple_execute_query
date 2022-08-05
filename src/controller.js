const pool = require('../config/config')
var _ = require('underscore');

exports.test = async (req, res) => {
    try {
        const { status } = req.body
        await pool.query(`select * from detail_order where status=?`, [status], (err, result) => {
            if (err) throw err
            _.each(result, async function (item) {
                await pool.query(`update detail_order set status="SIAP KIRIM" where id=?`, [item.id], (err, result) => {
                    if (err) throw err
                    return res.send(result.rows)
                })
            })
        })
    } catch (e) {
        console.log(e)
    }
}