package com.kh.demo.service;

import java.util.List;

import com.kh.demo.domain.dto.Criteria;
import com.kh.demo.domain.dto.ProductDTO;

public interface ProductService {
	boolean add(ProductDTO product);
	boolean modify(ProductDTO product);
	boolean like(int prodnum);
	
	boolean remove(int prodnum);
	
	int getTotal(Criteria cri);
	List<ProductDTO> getList(Criteria cri);
	ProductDTO getDetail(int prodnum);
}
