const pool = require('../db-config')

const findById = async (id) => {
    const day = await pool.query("SELECT * FROM daily_data WHERE id=$1", [id])
    return day.rows[0]
}

const findByDate = async (day, user_id) => {
    const dayData = await pool.query("SELECT * FROM daily_data WHERE date=$1 and user_id=$2", [`${day}`, user_id])
    return dayData.rows[0]
}

const findAllByUser = async (user_id) => {
    const allDailyData = await pool.query("SELECT * FROM daily_data WHERE user_id=$1", [user_id])
    return allDailyData.rows
}

const add = async (dayInfo) => {
    const newDay = await pool.query(
        "INSERT INTO daily_data(date, calorie_total, weight, bmr, calorie_suggestion, positive, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [dayInfo.date, dayInfo.calorie_total, dayInfo.weight, dayInfo.bmr, dayInfo.calorie_suggestion, dayInfo.positive, dayInfo.user_id])
    return newDay.rows[0]
}

const update = async (newInfo, id) => {
    const original = await findById(id)
    const updated = { ...original, ...newInfo }
    const updatedDay = await pool.query(
        "UPDATE daily_data SET date=$1, calorie_total=$2, weight=$3, bmr=$4, calorie_suggestion=$5, positive=$6, user_id=$7 WHERE id=$8 RETURNING *",
        [updated.date, updated.calorie_total, updated.weight, updated.bmr, updated.calorie_suggestion, updated.positive, updated.user_id, id])
    return updatedDay
}

const remove = async (id) => {
    await pool.query("DELETE FROM daily_data WHERE id = $1", [id])
}

module.exports = {
    findById,
    findByDate,
    findAllByUser,
    add,
    remove,
    update
}