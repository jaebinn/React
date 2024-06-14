package com.kh.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.demo.domain.dto.UserDTO;
import com.kh.demo.service.UserService;

import jakarta.annotation.PostConstruct;

@RestController
@RequestMapping("api/user/*")
public class UserController {
	@Autowired
	private UserService service;
	
	@GetMapping("checkId")
	public ResponseEntity<String> checkId(String userid){
		System.out.println(userid);
		if(service.checkId(userid)) {
			return new ResponseEntity<>("",HttpStatus.OK); //200
		}
		else {
			return new ResponseEntity<>(HttpStatus.CONFLICT); //409
		}
	}
	@PostMapping("join")
	public ResponseEntity<String> join(@RequestBody UserDTO user){
		if(service.join(user)) {
			return new ResponseEntity<String>("O",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<String>("Xx",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
