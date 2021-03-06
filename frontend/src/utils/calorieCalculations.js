export const calculateBmr = (gender, weight, height, age) => {
    if (gender === 'male'){
        return (66.47 + (6.24 * weight) + (12.7 * height) - (6.755 * age))
    } 
    if (gender === 'female'){
        return (665.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age))
    }
}

export const calculateSuggestion = (bmr, dailyBurned, desiredLossPerWeek) => {
    const desiredLossPerWeekCalories = desiredLossPerWeekPounds * 3500
    const dailyCalorieDeficit = desiredLossPerWeekCalories / 7

    const calorieSuggestion = (bmr + dailyBurned - dailyCalorieDeficit)

    return calorieSuggestion
}