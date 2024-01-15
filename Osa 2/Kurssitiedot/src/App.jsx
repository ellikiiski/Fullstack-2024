const Header = ({ text, size}) => {
  if (size == 1) {
    return (
      <>
        <h1>{text}</h1>
      </>
    )
  }
  return (
    <>
      <h2>{text}</h2>
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

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);

  return (
    <>
      <p><b>Number of exercises {sum}</b></p>
    </>
  );
};


const Course = ({ course }) => {
  return (
    <>
      <div>
        <Header text={course.name} size={2} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
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

  return (
    <div>
      <Header text={"Web dev curriculum"} size={1}/>
      <ul>
        {courses.map(course => <Course key={course.id} course={course} />)}
      </ul>
    </div>
  )
}

export default App