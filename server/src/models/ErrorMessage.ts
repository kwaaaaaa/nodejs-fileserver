import IMessage from './IMessage';

export default class ErrorMessage implements IMessage {
  public status: boolean;
  public error: string;

  constructor(error: string) {
    this.status = false;
    this.error = error;
  }
}
