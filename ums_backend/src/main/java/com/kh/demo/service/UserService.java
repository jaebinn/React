package com.kh.demo.service;

import com.kh.demo.domain.dto.UserDTO;

public interface UserService {
	boolean join(UserDTO user);
	boolean checkId(String userid);
	boolean modify(UserDTO user);
	boolean leaveId(String userid);
	UserDTO getDetail(String userid);
	UserDTO login(String userid, String userpw);
	
}
