interface NameProps {
  courseName: string
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartBase {
  description: string;
  backroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[]
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case "basic": {
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.description}</i></p>
        </div>
      )
    }
    case "group": {
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      )
    }
    case "background": {
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p><i>{course.description}</i></p>
          <p>submit to {course.backroundMaterial}</p>
        </div>
      )
    }
    case "special": {
      return (
        <div>
          <b>{course.name} {course.exerciseCount}</b>
          <p>{course.description}</p>
          <p>required skills: {course.requirements.map(value => value + " ")}</p>
        </div>
      )
    }
    default: {
      return <></>
    }
  }
}


const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((value) => (
        <Part course={value} key={value.name} />
      ))}
    </div>
  )
}

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <p>
        <b>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</b>
      </p>
    </div>
  )
}

const Header = (props: NameProps) => {
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
};

export default App;