import { IsDefined, IsNumber, Max, Min } from 'class-validator';

export class ArraysDto {
  @IsNumber()
  @Max(1000)
  @Min(1)
  @IsDefined()
  public key: number;
}
