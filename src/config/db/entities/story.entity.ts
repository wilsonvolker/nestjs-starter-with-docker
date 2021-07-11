import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Story {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // just a dummy for learning purpose,
  //  in actual case, it should be an uuid that references other tables (e.g. Board table)
  @Column({type: "nvarchar", length: 255})
  board: string;

  @Column({type: "int", unique: true})
  @Generated("increment")
  ticket_no: number;

  @Column({type: "longtext", nullable: true})
  title: string;

  @Column({type: "longtext", nullable: true})
  content: string;

  // just a dummy for learning purpose,
  //  in actual case, it should be an uuid that references other tables (e.g. user table)
  @Column({type: "nvarchar", length: 255})
  created_by: string;

  @CreateDateColumn({type: "datetime"})
  created_on: Date;

  // just a dummy for learning purpose,
  //  in actual case, it should be an uuid that references other tables (e.g. user table)
  @Column({type: "longtext", nullable: true})
  last_modified_by: string;

  @UpdateDateColumn({type: "datetime", nullable: true})
  last_modified_on: Date;
}