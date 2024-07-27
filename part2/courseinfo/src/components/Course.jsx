const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
    <b>
      total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises
    </b>     
  </>

const Course = ({ courses }) =>
  <>
    {courses.map(course =>
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
      </div>
    )}
  </>

export default Course