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

export default Course