import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  Model,
} from 'sequelize-typescript';
import {
  PAYMENT_STATUSES,
  PaymentStatus,
} from '../interfaces/payment.interface';

@Table
export class Payment extends Model<Payment> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(PAYMENT_STATUSES),
    allowNull: false,
  })
  status: PaymentStatus;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dni: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  confirmAsist: boolean;
  @Column({
    type: DataType.STRING,
  })
  method: string;

  @Column({
    type: DataType.STRING,
  })
  paymentDate: string;
}
