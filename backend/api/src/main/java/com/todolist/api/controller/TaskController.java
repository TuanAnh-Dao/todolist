package com.todolist.api.controller;

import com.todolist.api.entity.Task;
import com.todolist.api.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/v1/Task")
@AllArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public List<Task> getTasks(){
        return taskService.getTasks();
    }

    @PostMapping
    public void addTask(@RequestBody Task task){
        taskService.addTask(task);
    }

    @DeleteMapping(path = "{taskID}")
    public void deleteTask(@PathVariable("taskID") String taskID){
        taskService.deleteTask(UUID.fromString(taskID));
    }

    @PutMapping
    public void editTask(@RequestBody Task task){
        taskService.editTask(task);
    }
}
