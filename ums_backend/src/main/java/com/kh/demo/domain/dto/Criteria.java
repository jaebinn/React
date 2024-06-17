package com.kh.demo.domain.dto;

import lombok.Data;

@Data
public class Criteria {
	private int pagenum;
	private int amount;
	private String category;
	
	public Criteria() {
		this(1,10);
	}
	
	public Criteria(int pagenum, int amount) {
		this.pagenum = pagenum;
		this.amount = amount;
	}
	
}
