create database db_controle_jogos_bb;

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

create table tbl_empresa (
	id                int not null primary key auto_increment,
    nome              varchar (45) not null,
    descricao         varchar (100) not null,
    tipo_de_empresa   varchar (45) not null,
    fundador          varchar (45) not null,
    pais_origem       varchar (45) not null,
    foto_capa_empresa varchar (200) not null
);

create table tbl_versao (
	id            int not null primary key auto_increment,
    nome_versao   varchar (100),
    numero_versao varchar (45),
    data_versao   varchar (45),
    tamanho       varchar (45)
);

create table tbl_plataforma (
	id   int not null primary key auto_increment,
    nome varchar (50) 
);

create table tbl_faixa_etaria(
	id int not null primary key auto_increment,
    tipo_de_classificacao varchar (40)
);

create table tbl_genero (
	id int not null primary key auto_increment,
    tipo_de_categoria varchar (45)
);

select * from tbl_jogo where id=3;
show tables;
desc tbl_jogo;
select * from tbl_jogo;
delete from tbl_jogo where id=5;

