export interface SensorReading {
  id: number;
  crop_id: number;
  humidity_value: number;
  ph_value: number;
  salinity_value: number;
  created_at: string;
}

export interface CreateSensorReadingDTO {
  device_code: string;
  humidity: number;
  ph: number;
  salinity: number;
}