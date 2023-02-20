// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bmiCalculator = (arg1: any, arg2: any) => {
  interface BmiValues {
    height: number;
    weight: number;
  }
  
  const parseArguments = (arg1: number, arg2: number): BmiValues => {
    if (!isNaN(Number(arg1)) && !isNaN(Number(arg2))) {
      return {
        height: Number(arg1),
        weight: Number(arg2)
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
      return "obese"
    } else if (bmi >= 25) {
      return "overweight"
    } else if (bmi >= 18.5) {
      return "normal weight"
    } else {
      return "underweight"
    }
  }
  
  const { height, weight } = parseArguments(arg1, arg2)
  return calculateBmi(height, weight)
}

export default bmiCalculator 