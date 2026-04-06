export enum EmailStatus {
  IDLE = "idle",
  CHECKING = "checking",
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
}

export type EmailCheck =
  | {
      status: EmailStatus.IDLE | EmailStatus.CHECKING;
      email: null;
    }
  | {
      status: EmailStatus.AVAILABLE | EmailStatus.UNAVAILABLE;
      email: string;
    };
