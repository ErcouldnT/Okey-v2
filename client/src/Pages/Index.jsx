import React from 'react'

export default function Index(props) {
  React.useEffect(() => {
    const token = localStorage.getItem("Auth_token")
    if (!token) {
      props.history.push('/login')
    } else {
      props.history.push('/dashboard')
    }
    
  }, [])
  
  return (
    <div>
      Homepage      
    </div>
  )
}
