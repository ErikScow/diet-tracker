export const calculateBmr = (gender, weight, height, age) => {
    let bmr
    if (gender === 'male'){
        bmr = (66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age))
    } 
    if (gender === 'female'){
        bmr =  (665.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age))
    }
    return Math.floor(bmr)
}

export const calculateSuggestion = (bmr, dailyBurned, desiredLossPerWeekPounds) => {
    const desiredLossPerWeekCalories = desiredLossPerWeekPounds * 3500
    const dailyCalorieDeficit = desiredLossPerWeekCalories / 7

    const calorieSuggestion = (bmr + dailyBurned - dailyCalorieDeficit)

    return Math.floor(calorieSuggestion)
}