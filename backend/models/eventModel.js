const pool = require('../db-config')

const findById = async (id) => {
    const event = await pool.query("SELECT * FROM calorie_events WHERE id=$1", [id])
    return event.rows[0]
}

const findAllByDay = async (day_id) => {
    const allEvents = await pool.query("SELECT * FROM calorie_events WHERE day_id=$1", [day_id])
    return allEvents.rows
}

const add = async (eventInfo) => {
    const newDay = await pool.query(
        "INSERT INTO calorie_events(note, magnitude, positive, day_id) VALUES($1, $2, $3, $4) RETURNING *",
        [eventInfo.note, eventInfo.magnitude, eventInfo.positive, eventInfo.day_id])
    return newDay.rows[0]
}

const remove = async (id) => {
    await pool.query("DELETE FROM calorie_events WHERE id = $1", [id])
}

module.exports = {
    findById,
    findAllByDay,
    add,
    remove,
}