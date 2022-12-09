package com.todolist.api.controller;

import com.todolist.api.entity.State;
import com.todolist.api.entity.Task;
import com.todolist.api.service.StateService;
import com.todolist.api.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/State")
@AllArgsConstructor
public class StateController {

    private final StateService stateService;

    private final TaskService taskService;

    @GetMapping
    public List<State> getStates(){
        return stateService.getStates();
    }
}
