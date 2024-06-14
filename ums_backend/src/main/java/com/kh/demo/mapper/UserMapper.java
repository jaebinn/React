package com.kh.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.kh.demo.domain.dto.UserDTO;

@Mapper
public interface UserMapper {
	int insertUser(UserDTO user);
	UserDTO selectUserById(String userid); 
}
