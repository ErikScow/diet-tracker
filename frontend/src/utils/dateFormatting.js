
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

export {
    formatDateFromForm,

}