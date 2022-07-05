import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contacts' })
export class ContactsMacapa extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ length: 200, nullable: false })
  nome: string;

  @Column({ length: 20, nullable: false })
  celular: string;
}
