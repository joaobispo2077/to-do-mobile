import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks(previousTasks => previousTasks.concat(newTask));
  }

  function handleToggleTaskDone(id: number) {
    const toggleTask = (task: Task) => {
      const isToggledTask = task.id === id;

      if (isToggledTask) {
       return Object.assign({}, task, { done: !task.done })
      }
    
      return task;
  };

    setTasks(previousTasks => previousTasks.map(toggleTask));
  }

  function handleRemoveTask(id: number) {
    setTasks(previousTasks => previousTasks.filter(prevTask => prevTask.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})