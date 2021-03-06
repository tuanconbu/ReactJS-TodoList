import React, { useState, useEffect } from 'react';
import { Layout, Modal } from 'antd';
import './App.css';
import TodoList from "./components/TodoList"
import { SocialIcon } from 'react-social-icons';

const { Header, Footer, Content } = Layout;
function App() {
  const [todo, setTodo] = useState([])

  useEffect(() => {
    const storageTodo = JSON.parse(localStorage.getItem('todos'));
    if (storageTodo) setTodo(storageTodo);
    else setTodo([]);
  }, [])

  const success = (message) => {
    Modal.success({
      content: message,
    });
  }
  //delete
  const onDelete = (e) => {
    const index = todo.find(x => x.id === e.id);
    if (index < 0) return;
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
    success("Deleted");
  }
  //add
  const onAdd = (item) => {
    const newTodo = {
      id: todo.length + 1,
      ...item,
    };
    const newTodoList = [...todo];
    newTodoList.unshift(newTodo);
    setTodo(newTodoList);
    success("Added")
  }
  //search
  const onSearch = (e) => {
    const searchItem = todo.filter(x => x.content.toLowerCase().includes(e.toLowerCase()));
    setTodo(searchItem);

  }
  //save
  const onSave = () => {
    if (todo.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todo));
      success("Saved to your memory successfully")
    }
    else {
      Modal.error({
        content: "No todos to save"
      })
    }

  }
  //clear
  const onClear = () => {
    const storageTodo = JSON.parse(localStorage.getItem('todos'));
    if (!storageTodo) {
      Modal.error({
        content: "Cache is already cleared"
      });
    }
    else {
      localStorage.clear();
      success("Successfully cleared")
    }
  }
  return (
    <div className="App">
      <Layout>
        <Header className="header">REACT HOOKS - TODO LISTS</Header>
        <Content style={{ backgroundColor: 'white' }}>
          <TodoList todo={todo} onDelete={onDelete} onAdd={onAdd} onSearch={onSearch} onSave={onSave} onClear={onClear} />
        </Content>
        <Footer className="footer">
          <SocialIcon url="https://www.facebook.com/cauvangdinhbacho" />
          <div>
            <p>Designed by Hieu US/UK</p>
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
