// Koodi kopioitu suoraan osasta 2 lukunottamatta erikseen kommentoituja kohtia

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="notification">
        {message}
      </div>
    )
}

export default Notification