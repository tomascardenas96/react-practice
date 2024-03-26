import { IsString } from 'class-validator';
import { Operation } from '../enum/operation.enum';

export default class AddOrSubstractDto {
  @IsString()
  operation: Operation;
}
