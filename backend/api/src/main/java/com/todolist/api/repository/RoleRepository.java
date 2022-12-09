package com.todolist.api.repository;

import com.todolist.api.constant.Roles;
import com.todolist.api.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;
@Transactional
public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByName(Roles name);
}