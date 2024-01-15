const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <li>
        {props.part} {props.exercises}
      </li>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map(part => 
          <Part key={part.id} part={part.name} exercises={part.exercises} />  
        )}
      </ul>
    </>
  )
}

const Total = ({ parts }) => { // aha se oliki heti seuraava osa, no boldataan nyt vaik
  let sum = 0
  for (let i = 0; i < parts.length; i++) {
    sum += parts[i].exercises
  }
  return (
    <>
      <p><b>Number of exercises {sum}</b></p>
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
  const course = {
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
        name: 'Playing Tetris',
        exercises: 8,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App