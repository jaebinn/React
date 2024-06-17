package com.kh.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kh.demo.domain.dto.Criteria;
import com.kh.demo.domain.dto.ProductDTO;
import com.kh.demo.mapper.ProductMapper;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductMapper pmapper;
	
	
	@Override
	public boolean add(ProductDTO product) {
		return pmapper.insertProduct(product) == 1;
	}

	@Override
	public boolean modify(ProductDTO product) {
		return pmapper.updateProduct(product) == 1;
	}

	@Override
	public boolean like(int prodnum) {
		return pmapper.updateLikeCnt(prodnum) == 1;
	}

	@Override
	public boolean remove(int prodnum) {
		return pmapper.deletePrduct(prodnum) == 1;
	}

	@Override
	public int getTotal(Criteria cri) {
		return pmapper.countProduct(cri);
	}

	@Override
	public List<ProductDTO> getList(Criteria cri) {
		int startrow = 0;
		startrow = (cri.getPagenum()-1)*cri.getAmount();
		return pmapper.selectProducts(cri, startrow);
	}

	@Override
	public ProductDTO getDetail(int prodnum) {
		return pmapper.selectProductByProdnum(prodnum);
	}

}
