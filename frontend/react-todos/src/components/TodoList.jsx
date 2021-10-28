import React, { useCallback, useEffect, useState } from "react";
import "./TodoList.css";
import TodoTab from "./TodoTab";
import TodoForm from "./TodoForm";
import {
  createTodo,
  deleteTodo,
  loadTodos,
  updateTodo,
} from "../services/todoService";
import { Col, Layout, message, Row, Tabs } from "antd";

const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleFormSubmit = (todo) => {
    createTodo(todo).then(onRefresh());
    message.success("Todo added!");
  };

  const handleRemoveTodo = (todo) => {
    deleteTodo(todo.id).then(onRefresh());
    message.warn("Todo removed!");
  };

  const handleToggleTodoStatus = (todo) => {
    todo.completed = !todo.completed;
    updateTodo(todo).then(onRefresh());
    message.info("Todo status updated!");
  };

  const refresh = () => {
    loadTodos()
      .then((json) => {
        setTodos(json);
        setActiveTodos(json.filter((todo) => todo.completed === false));
        setCompletedTodos(json.filter((todo) => todo.completed === true));
      })
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let data = await loadTodos();
    setTodos(data);
    setActiveTodos(data.filter((todo) => todo.completed === false));
    setCompletedTodos(data.filter((todo) => todo.completed === true));
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    refresh();
  }, [onRefresh]);

  return <Layout className="layout">
      <Content style={{padding: '0 50px'}}>
          <div className="todolist">
              <Row>
                  <Col span={14} offset={5}>
                      <h1>My Todos</h1>
                      <TodoForm onFormSubmit={handleFormSubmit}></TodoForm>
                      <br/>
                      <Tabs defaultActiveKey="all">
                          <TabPane tab="All" key="all">
                            <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                          </TabPane>
                          <TabPane tab="Active" key="active">
                          <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>  
                          </TabPane>
                          <TabPane tab="Completed" key="completed">
                          <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                          </TabPane>
                      </Tabs>
                  </Col>
              </Row>
          </div>
      </Content>
  </Layout>
};

export default TodoList;
