import IMessage from './IMessage';

export default class SuccessMessage implements IMessage {
  public status: boolean;
  public message: string;
  public data: object[];

  constructor(message: string= '', data: object[]= []) {
    this.status = true;
    this.message = message;
    this.data = data;
  }
}
