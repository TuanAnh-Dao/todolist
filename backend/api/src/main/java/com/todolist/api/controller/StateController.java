package com.todolist.api.controller;

import com.todolist.api.entity.State;
import com.todolist.api.entity.Task;
import com.todolist.api.service.StateService;
import com.todolist.api.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<State>> getStates(){
        List<State> stateList = stateService.getStates();

        if (stateList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(stateList ,HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<List<State>> updateStates(@RequestBody List<State> stateList){
        List<State> stateSavedList = stateService.saveAllStates(stateList);

        if (stateSavedList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.FAILED_DEPENDENCY);
        }

        return new ResponseEntity<>(stateSavedList ,HttpStatus.OK);
    }

}
