const Header = ({ text }) => {
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

  export default Course