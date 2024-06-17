package com.kh.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.demo.domain.dto.UserDTO;
import com.kh.demo.mapper.ProductMapper;
import com.kh.demo.mapper.UserMapper;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserMapper umapper;
	@Autowired
	private ProductMapper pmapper;

	@Override
	public boolean join(UserDTO user) {
		return umapper.insertUser(user) == 1;
	}
	@Override
	public boolean checkId(String userid) {
		return umapper.selectUserById(userid) == null;
	}
	@Override
	public boolean modify(UserDTO user) {
		return umapper.updateUser(user) == 1;
	}
	@Override
	public boolean leaveId(String userid) {
		pmapper.deleteProducts(userid);
		return umapper.deleteUser(userid) == 1;
	}
	@Override
	public UserDTO getDetail(String userid) {
		return umapper.selectUserById(userid);
	}
	@Override
	public UserDTO login(String userid, String userpw) {
		UserDTO user = umapper.selectUserById(userid);
		if(user != null) {
			if(user.getUserpw().equals(userpw)) {
				return user;
			}
		}
		return null;
	}

	
	
	
	
}
