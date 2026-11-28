
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Comment } from '../comments/comments.entity.js';

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

  @OneToMany(
    () => Comment,
    (comment) => comment.thread,
  )
  comments: Relation<Comment[]>;
}

// DELETE 
// export type ThreadPayload = Pick<
//   Thread,
//   'title' | 'author' | 'body'
// >;

// DELETE when using UpdateThreadDto:
// export type ThreadChanges = Partial<
//   Pick<Thread, 'title' | 'body'>
// >;
