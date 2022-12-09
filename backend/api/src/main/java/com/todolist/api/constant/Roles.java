package com.todolist.api.constant;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public enum Roles {
    USER(new HashSet<Permissions>()),
    ADMIN(new HashSet<Permissions>(List.of(Permissions.values())));

    private final Set<Permissions> permissions;

    public Set<Permissions> getPermissions() {
        return permissions;
    }

    public Set<GrantedAuthority> getGrantedAuthorities() {
        Set<GrantedAuthority> grantedAuthorities = this.getPermissions().stream().map(
                permission -> new SimpleGrantedAuthority(permission.getPermission())
        ).collect(Collectors.toSet());
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return grantedAuthorities;
    }

    Roles(Set<Permissions> permissions) {
        this.permissions = permissions;
    }


}
