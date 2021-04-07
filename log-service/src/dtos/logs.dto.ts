import { IsDefined } from 'class-validator';

export class LogsDto {
  @IsDefined()
  public log: any;
}
