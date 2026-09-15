import database from "../database/connection";

class HortaAnalysisService {

  async analyze(cropId: number) {

    const crop = await database("my_crops")
      .join(
        "plant_catalog",
        "my_crops.plant_id",
        "=",
        "plant_catalog.id"
      )
      .where("my_crops.id", cropId)
      .select(
        "my_crops.id",
        "plant_catalog.popular_name",

        "plant_catalog.ideal_humidity",

        "plant_catalog.ideal_ph_min",
        "plant_catalog.ideal_ph_max",

        "plant_catalog.ideal_salinity_min",
        "plant_catalog.ideal_salinity_max"
      )
      .first();


    if (!crop) {
      throw new Error("Cultivo não encontrado");
    }


    const sensor = await database("sensor_readings")
      .where({
        crop_id: cropId
      })
      .orderBy(
        "created_at",
        "desc"
      )
      .first();


    if (!sensor) {
      throw new Error(
        "Nenhuma leitura encontrada"
      );
    }


    return {

      plant: crop.popular_name,


      humidity:
        this.checkHumidity(
          sensor.humidity_value,
          crop.ideal_humidity
        ),


      ph:
        this.checkRange(
          sensor.ph_value,
          crop.ideal_ph_min,
          crop.ideal_ph_max,
          "pH"
        ),


      salinity:
        this.checkRange(
          sensor.salinity_value,
          crop.ideal_salinity_min,
          crop.ideal_salinity_max,
          "Salinidade"
        )
    };

  }



  private checkHumidity(
    value:number,
    ideal:number
  ){

    const difference =
      value - ideal;


    if(value < ideal - 10){

      return {
        value,

        status:"LOW",

        message:
          "Umidade baixa. Necessário irrigar."
      };

    }


    if(value > ideal + 10){

      return {
        value,

        status:"HIGH",

        message:
          "Umidade acima do recomendado."
      };

    }


    return {
      value,

      status:"IDEAL",

      message:
        "Umidade adequada."
    };

  }




  private checkRange(
    value:number,
    min:number,
    max:number,
    name:string
  ){


    if(value < min){

      return {

        value,

        status:"LOW",

        message:
          `${name} abaixo do recomendado.`

      };

    }



    if(value > max){

      return {

        value,

        status:"HIGH",

        message:
          `${name} acima do recomendado.`

      };

    }



    return {

      value,

      status:"IDEAL",

      message:
        `${name} adequado.`

    };

  }


}


export default new HortaAnalysisService();