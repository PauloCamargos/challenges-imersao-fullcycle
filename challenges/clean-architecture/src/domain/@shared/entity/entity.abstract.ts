import Notification from "../notification";

export default abstract class AbstractEntity {
  private _id!: string;
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
  protected notification: Notification

  constructor() {
    this.notification = new Notification()
  }
}