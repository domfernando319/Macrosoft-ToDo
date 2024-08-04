import ListHeader from './components/ListHeader'
import  {useEffect, useState} from 'react'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'


const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email

  const [tasks, setTasks] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=> {
    if (authToken) {
      getData()
    }
  }, [authToken])

  console.log(tasks)

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))
  return (
    <div className='app'>
      {!authToken && <Auth/>}
      {authToken &&
        <>
          <ListHeader listName={'☀️ Summer Checklist'} getData={getData}/>
          <div className='banner'>
            <p className='user-email'>Welcome back!</p>
            <p className='user-email'> {userEmail}</p>
          </div>
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData}/>)}
        </>
      }
      <p className='copyright'>© Macrosoft To Do </p>
    </div>
  )
}

export default App;