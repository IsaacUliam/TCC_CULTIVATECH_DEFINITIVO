export interface Plant {
  id: number;
  popular_name: string;
  ideal_humidity: number;
  ideal_ph_min: number;
  ideal_ph_max: number;
  ideal_salinity_min: number;
  ideal_salinity_max: number;
  care_tips?: string;
}

export interface CreatePlantDTO {
  popular_name: string;
  ideal_humidity: number;
  ideal_ph_min: number;
  ideal_ph_max: number;
  ideal_salinity_min: number;
  ideal_salinity_max: number;
  care_tips?: string;
}

export interface UpdatePlantDTO {
  popular_name?: string;
  ideal_humidity?: number;
  ideal_ph_min?: number;
  ideal_ph_max?: number;
  ideal_salinity_min?: number;
  ideal_salinity_max?: number;
  care_tips?: string;
}