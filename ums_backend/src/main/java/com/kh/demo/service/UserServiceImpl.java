package com.kh.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.demo.domain.dto.UserDTO;
import com.kh.demo.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserMapper umapper;

	@Override
	public boolean join(UserDTO user) {
		return umapper.insertUser(user) == 1;
	}
	@Override
	public boolean checkId(String userid) {
		return umapper.selectUserById(userid) == null;
	}

	
	
	
	
}
