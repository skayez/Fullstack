interface Interface {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateExercises = (hours: any, target: number): Interface => {
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

const makeList = () => {
  let counter = 3
  let hoursList = []

  while (counter < process.argv.length) {
    if (!isNaN(Number(process.argv[counter]))) {
      hoursList.push(process.argv[counter])
      counter = counter + 1
    } else {
      throw new Error('Arguments were not numbers')
    }
  }

  return hoursList
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hours: any = makeList()
const target: number = Number(process.argv[2])
console.log(calculateExercises(hours, target));
