package com.kh.demo.controller;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.demo.domain.dto.UserDTO;
import com.kh.demo.service.UserService;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
	public ResponseEntity<String> join(@RequestBody UserDTO user, HttpServletResponse resp){
		if(service.join(user)) {
			Cookie cookie = new Cookie("joinid",user.getUserid());
			cookie.setMaxAge(300);
			resp.addCookie(cookie);
			return new ResponseEntity<String>("O",HttpStatus.OK);
		}
		else {
			return new ResponseEntity<String>("X",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("login")
	public ResponseEntity<String> login(String userid, String userpw, HttpServletRequest req){
		UserDTO loginUser = service.login(userid, userpw);
		if(loginUser != null) {
			req.getSession().setAttribute("loginUser", loginUser.getUserid());
			return new ResponseEntity<String>(loginUser.getUserid(), HttpStatus.OK);
		}
		else {
			return new ResponseEntity<String>("X",HttpStatus.INTERNAL_SERVER_ERROR); 
		}
	}
	
	@GetMapping("myinfo")
	public ResponseEntity<UserDTO> myinfo(HttpServletRequest req){
		String userid = (String)req.getSession().getAttribute("loginUser");
		return new ResponseEntity<UserDTO>(service.getDetail(userid), HttpStatus.OK);
	}
	
	@GetMapping("logout")
	public ResponseEntity<String> logout(HttpServletRequest req){
		req.getSession().invalidate();
		return new ResponseEntity<String>("O", HttpStatus.OK);
	}
	
	@PutMapping("{userid}")
	public ResponseEntity<String> modify(@PathVariable String userid, @RequestBody UserDTO user){
		if(service.modify(user)) {
			return new ResponseEntity<String>("O", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<String>("X",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@DeleteMapping("{userid}")
	public ResponseEntity<String> leave(@PathVariable String userid){
		if(service.leaveId(userid)) {
			return new ResponseEntity<String>("O", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<String>("X",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("loginCheck")
	public ResponseEntity<String> loginCheck(HttpServletRequest req){
		Object temp = req.getSession().getAttribute("loginUser");
		if(temp != null) {
			return new ResponseEntity<String>("O", HttpStatus.OK);
		}
		else {
			return new ResponseEntity<String>("X", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("joinCheck")
	public ResponseEntity<String> joinCheck(HttpServletRequest req){
		String joinid = "";
		Cookie[] cookies = req.getCookies();
		if(cookies != null && cookies.length > 0) {
			for(Cookie cookie : cookies) {
				if(cookie.getName().equals("joinid")) {
					joinid = cookie.getValue();
					break;
				}
			}
		}
		return new ResponseEntity<String>(joinid, HttpStatus.OK);
	}
	
}
