import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { Thread } from '../threads/thread.entity.js';

export type CommentPayload = Pick<Comment, 'author' | 'body'>;

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  threadId: string;

  @ManyToOne(
    () => Thread,
    (thread) => thread.comments,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'threadId' })
  thread: Relation<Thread>;
}