import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div>
      <h1 className='app-title'> Todo App</h1>
      <TodoList />
    </div>
  )
}

export default App
