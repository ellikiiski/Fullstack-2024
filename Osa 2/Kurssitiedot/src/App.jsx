
const Header = ({ course }) => {
  return (
    <>
      <h2>{course}</h2>
    </>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((acc, curr) => acc + curr, 0)
  return (
    <>
      <p>TOTAL OF {total} EXERCISES</p>
    </>
  )
}

const Content = ({ parts }) => {
  const parts_elements = parts.map(part => <Part key={part.id} part={part} />)
  return (
    <>
     {parts_elements}
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const courses_elements = courses.map(course => <Course key={course.id} course={course} />)  

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses_elements}
    </div>
  )
}

export default App