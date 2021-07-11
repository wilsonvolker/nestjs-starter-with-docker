create table if not exists story
(
    id               varchar(36)                              not null
    primary key,
    board            varchar(255)                             not null,
    ticket_no        int auto_increment,
    title            longtext                                 null,
    content          longtext                                 null,
    created_by       varchar(255)                             not null,
    created_on       datetime(6) default CURRENT_TIMESTAMP(6) not null,
    last_modified_by longtext                                 null,
    last_modified_on datetime(6) default CURRENT_TIMESTAMP(6) null on update CURRENT_TIMESTAMP(6),
    constraint IDX_e0f471d775e034069c83bd35cf
    unique (ticket_no)
    );

