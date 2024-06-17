package com.kh.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kh.demo.domain.dto.Criteria;
import com.kh.demo.domain.dto.ProductDTO;

@Mapper
public interface ProductMapper {
	int insertProduct(ProductDTO product);
	
	int updateProduct(ProductDTO product);
	int updateLikeCnt(int prodnum);
	
	int deletePrduct(int prodnum);
	void deleteProducts(String userid);
	
	ProductDTO selectProductByProdnum(int prodnum);
	int countProduct(Criteria cri);
	List<ProductDTO> selectProducts(Criteria cri, int startrow);
	
	
	
}
