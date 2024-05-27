import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { EventDetails } from '../validations/event.zod';

@Table
export class Event extends Model<Event> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4, // Esto generará automáticamente un UUID
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  date: string;
  @Column({ type: DataType.STRING })
  title: string;
  @Column({ type: DataType.STRING })
  subTitle: string;
  @Column({ type: DataType.INTEGER })
  price: number;
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  event: EventDetails[];
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  description: string[];
}
