package com.unitbv.school_management_system.mappers;

import com.unitbv.school_management_system.authdtos.SignUpDto;
import com.unitbv.school_management_system.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    //se ignora campul password pentru ca nu are acelasi format, in db e string si in mapper e char[]
    @Mapping(target = "passwordHash", ignore = true)
    @Mapping(source = "role", target = "role")
    @Mapping(source = "createdAt", target = "createdAt")
    @Mapping(source = "token", target = "token")
    User signUpToUser(SignUpDto userDto);
}
