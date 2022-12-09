package com.todolist.api.constant;



public enum Permissions {
    STATE_READ("state:read"),
    STATE_EDIT("state:edit"),
    STATE_ADD("state:add"),
    STATE_DEL("state:delete"),
    TASK_READ("task:read"),
    TASK_EDIT("task:edit"),
    TASK_ADD("task:add"),
    TASK_DEL("task:delete");

    private final String permission;

    public String getPermission() {
        return permission;
    }

    Permissions(String permission) {
        this.permission = permission;
    }
}
