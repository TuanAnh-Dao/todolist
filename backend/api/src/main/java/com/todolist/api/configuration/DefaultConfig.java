package com.todolist.api.configuration;

import com.todolist.api.constant.Roles;
import com.todolist.api.entity.*;
import com.todolist.api.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class DefaultConfig {
    @Bean
    CommandLineRunner stateRunner(StateRepository stateRepository){
        return args -> {
            State state2 = new State(
                    "Pending",
                    0,
                    "#fff"
            );
            State state1 = new State(
                    "To do",
                    1,
                    "#fff"
                    );

            State state3 = new State(
                    "In Progess",
                    2,
                    "#fff"
                    );
            State state4 = new State(
                    "Done",
                    3,
                    "#fff"
                    );
            stateRepository.saveAll(List.of(state1,state2,state3,state4));
        };
    }

    @Bean
    CommandLineRunner taskRunner(TaskRepository taskRepository, StateRepository stateRepository){
        return args -> {
            List<State> stateList = stateRepository.findAll();
            stateList.forEach(state -> {
                for (int i = 0; i < 3; i++) {
                    Task task = new Task(
                            String.valueOf(i),
                            LocalDate.of(2022,Month.OCTOBER,13),
                            state
                    );
                    taskRepository.save(task);
                }
            });
        };
    }
    @Bean
    CommandLineRunner roleRunner(RoleRepository roleRepository){
        return args -> {
            Role roleAdmin = new Role(null, Roles.ADMIN);
            Role roleUser = new Role(null, Roles.USER);
            roleRepository.saveAll(List.of(roleUser, roleAdmin));
        };
    }


    
}
