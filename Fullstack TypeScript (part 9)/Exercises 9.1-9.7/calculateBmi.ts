interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (!(args.length === 4)) throw new Error('Only two arguments allowed');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Arguments were not numbers');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const square = height * height
  const m2 = square / 10000
  const bmi = weight / m2

  if (bmi >= 30) {
    console.log("obese")
  } else if (bmi >= 25) {
    console.log("overweight")
  } else if (bmi >= 18.5) {
    console.log("normal weight")
  } else {
    console.log("underweight")
  }
}

const { height, weight } = parseArguments(process.argv)
calculateBmi(height, weight)