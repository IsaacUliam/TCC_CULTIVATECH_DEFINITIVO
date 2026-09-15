export interface Crop {
  id: number;
  user_id: number;
  plant_id: number;
  device_code: string;
  nickname: string;
  alerts: string | null;
  last_watered_at: string | null;
  created_at: string;
}

export interface CreateCropDTO {
  user_id: number;
  plant_id: number;
  device_code: string;
  nickname: string;
  alerts?: {
    humidity?: boolean;
    ph?: boolean;
    salinity?: boolean;
  };
}

export interface UpdateCropDTO {
  plant_id?: number;
  nickname?: string;
  alerts?: {
    humidity?: boolean;
    ph?: boolean;
    salinity?: boolean;
  };
  last_watered_at?: string | null;
}