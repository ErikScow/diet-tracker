const pool = require('../db-config')

const findById = async (id) => {
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [id])
    return user.rows[0]
}

const findByEmail = async (email) => {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email])
    return user.rows[0]
}

const register = async (userInfo) => {
    const newUser = await pool.query(
        "INSERT INTO users(name, email, password, activity_level, desired_loss_rate, manual_mode, birth_date, weight, height, gender) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [userInfo.name, userInfo.email, userInfo.password, userInfo.activity_level, userInfo.desired_loss_rate, userInfo.manual_mode, userInfo.birth_date, userInfo.weight, userInfo.height, userInfo.gender])
    return newUser.rows[0]
}

const update = async (newInfo, id) => {
    const original = await findById(id)
    const updated = { ...original, ...newInfo }
    const updatedUser = await pool.query(
        "UPDATE users SET name=$1, email=$2, password=$3, activity_level=$4, desired_loss_rate=$5, manual_mode=$6, birth_date=$7, weight=$8, height=$9, gender=$10 WHERE id = $11 RETURNING *",
        [updated.name, updated.email, updated.password, updated.activity_level, updated.desired_loss_rate, updated.manual_mode, updated.birth_date, updated.weight, updated.height, updated.gender, id])
    return updatedUser.rows[0]
}

const remove = async (id) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id])
}

module.exports = {
    findById,
    findByEmail,
    register,
    remove,
    update
}