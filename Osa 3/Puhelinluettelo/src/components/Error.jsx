// Koodi kopioitu suoraan osasta 2 lukunottamatta erikseen kommentoituja kohtia

const Error = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
}

export default Error

