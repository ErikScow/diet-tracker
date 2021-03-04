
const formatDateFromForm = (inputStr) => {
    try {
        const yearStr = inputStr.slice(0, 4)
        const monthStr = inputStr.slice(5,7)
        const dayStr = inputStr.slice(8)

        const formattedStr = yearStr + monthStr + dayStr

        return formattedStr
    } catch (error) {
        return error
    }
}

const formattedDate = () => {
    const date = new Date()
    let year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDay().toString()

    if (month.toString().length === 1){
        month = `0` + month
    }

    if (day.toString().length === 1){
        day = `0` + day
    }

    const returnString = `${year}` + `${month}` + `${day}`

    return returnString
}

export {
    formatDateFromForm,
    formattedDate
}