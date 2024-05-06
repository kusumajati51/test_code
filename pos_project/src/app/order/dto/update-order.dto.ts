import { PartialType } from '@nestjs/swagger';
import { CreateListOrderDto } from './create-order.dto';

export class UpdateOrderListDto extends PartialType(CreateListOrderDto) {}
