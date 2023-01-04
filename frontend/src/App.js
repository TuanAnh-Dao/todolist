
import { Provider } from 'react-redux';
import './App.css';
import TodoList from './components/TodoList';
import store from './redux/Store';


function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
