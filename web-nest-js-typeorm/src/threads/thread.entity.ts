// Thread is an entity in src/threads/thread.entity.ts 
// with a UUID primary key and a createdAt that the database sets

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('threads')
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;
}

export type ThreadPayload = Pick<Thread, 'title' | 'author' | 'body'>;