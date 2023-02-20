interface Interface {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const isSuccess = (hours: number[], target: number) => {
  if (!hours.find(value => value < target)) {
    return false
  }
  return true
}

const countAverage = (hours: number[]) => {
  const sumHours = hours.reduce((sum, current) => sum + current)
  return sumHours / hours.length
}

const countRating = (hours: number[], target: number) => {
  const failedDays = hours.filter(value => value < target).length

  if (failedDays === 0) {
    return 3
  } else if (failedDays === 1) {
    return 2
  } else {
    return 1
  }
}

const exerciseCalculator = (hours: number[], target: number): Interface => {
  if ((!hours) || (!target)) {
    throw 'parameters missing'
  }

  if (isNaN(Number(target))) {
    throw 'malformatted parameters'
  } else {
    target = Number(target)
  }

  hours = hours.map((value) => {
    if (isNaN(Number(value))) {
      throw 'malformatted parameters'
    }
    return Number(value)
  })

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(Boolean).length,
    success: isSuccess(hours, target),
    rating: countRating(hours, target),
    ratingDescription: 'You can always do better',
    target: target,
    average: countAverage(hours),
  }
}

export default exerciseCalculator 