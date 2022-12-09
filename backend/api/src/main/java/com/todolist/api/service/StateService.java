package com.todolist.api.service;

import com.todolist.api.entity.State;
import com.todolist.api.repository.StateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StateService {

    private final StateRepository stateRepository;

    public List<State> getStates(){return stateRepository.findAll();}

    public void addState(State state){
        stateRepository.save(state);
    }
}
