export interface Garden {
  id: number;
  user_id: number;
  name: string;
  monitoring_enabled: boolean;
  created_at: string;
}

export interface CreateGardenDTO {
  user_id: number;
  name: string;
}

export class GardenServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = "GardenServiceError";
  }
}
