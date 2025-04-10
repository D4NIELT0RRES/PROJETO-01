

#ATIVA O DATABASE
use db_controle_jogos_bb;

create table tbl_jogo (
	id               int not null primary key auto_increment,
    nome             varchar (80) not null,
    data_lancamento  date not null,
    versao           varchar (10) not null,
    tamanho          varchar(10),
    descricao        text,
    foto_capa        varchar(200),
    link             varchar(200)
    
);

select * from tbl_jogo where id=3;
show tables;
desc tbl_jogo;
select * from tbl_jogo;
delete from tbl_jogo where id=5;