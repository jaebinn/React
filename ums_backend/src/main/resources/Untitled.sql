use gb;
create table ums_user(
	userid varchar(300) primary key,
    userpw varchar(300),
    username varchar(300),
    usergender varchar(300),
    zipcode varchar(300),
    addr varchar(1000),
    addrdetail varchar(1000),
    addretc varchar(300),
    userhobby varchar(1000)
);

create table ums_product(
	prodnum int primary key auto_increment,
    prodname varchar(1000),
    prodprice int,
    prodamount int,
    prodinfo varchar(4000),
    prodcategory varchar(300),
    userid varchar(300)
)

