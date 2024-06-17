package com.kh.demo.domain.dto;

import lombok.Data;

@Data
public class PageDTO {
	private int startPage;
	private int endPage;
	private int total;
	private boolean prev, next;
	private Criteria cri;
	
	public PageDTO(int total, Criteria cri) {
		int pagenum = cri.getPagenum();
		this.cri = cri;
		this.total = total;
		
		this.endPage = (int)Math.ceil(pagenum/5.0)*5;
		this.startPage = this.endPage - 4;
		int realEnd = (int)Math.ceil(total*1.0/cri.getAmount());
		realEnd = realEnd == 0 ? 1 : realEnd;
		this.endPage = this.endPage > realEnd ? realEnd : this.endPage;
		
		this.prev = this.startPage > 1;
		this.next = this.endPage < realEnd;
	}
}
