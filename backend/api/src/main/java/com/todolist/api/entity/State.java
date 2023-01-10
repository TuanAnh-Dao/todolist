package com.todolist.api.entity;

import lombok.AllArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

import static javax.persistence.CascadeType.*;

@Entity
@AllArgsConstructor
@Table(name = "State")
public class State {
    private static final String State = "state";
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "Binary(16)")
    private UUID id;
    private String name;
    private Integer stateOrder;

    private String color;

    @OneToMany(cascade= ALL,  fetch = FetchType.EAGER)
    @JoinColumn(name = "state_id", referencedColumnName = "id")
    private List<Task> taskList;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStateOrder() {
        return stateOrder;
    }

    public void setStateOrder(Integer stateOrder) {
        this.stateOrder = stateOrder;
    }

    public List<Task> getTaskList() {
        return taskList;
    }

    public void setTaskList(List<Task> taskList) {
        this.taskList = taskList;
    }

    public State() {
    }

    public State(String name, Integer stateOrder, String color, List<Task> taskList) {
        this.name = name;
        this.stateOrder = stateOrder;
        this.color = color;
        this.taskList = taskList;
    }

    public State(String name, Integer stateOrder, String color) {
        this.name = name;
        this.stateOrder = stateOrder;
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}