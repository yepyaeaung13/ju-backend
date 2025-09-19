import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SwaggerUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string; // store plain password for demo, use hash in production
}
