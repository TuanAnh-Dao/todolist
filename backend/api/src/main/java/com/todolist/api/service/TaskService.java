package com.todolist.api.service;

import com.todolist.api.entity.Task;
import com.todolist.api.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getTasks(){
        return taskRepository.findAll();
    }

    public void addTask(Task task){
        Optional<Task> taskOptional = taskRepository.findTaskByName(task.getName());
        if(taskOptional.isPresent()){
            throw new IllegalStateException("Name has taken!");
        }
        taskRepository.save(task);
    }

    public void deleteTask(UUID taskID){
        Boolean checkExists = taskRepository.existsById(taskID);
        if(!checkExists){
            throw new IllegalStateException("Can't find task with id: " + taskID);
        }
        taskRepository.deleteById(taskID);
    }
    @Transactional
    public void editTask(Task task){
        Task oldTask = taskRepository.findById(task.getId())
                .orElseThrow(()->new IllegalStateException("Can't find task with id: " + task.getId()));
        oldTask.setName(task.getName());
        oldTask.setDeadline(task.getDeadline());

    }

}
