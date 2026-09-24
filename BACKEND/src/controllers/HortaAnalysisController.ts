import { Request, Response } from "express";

import HortaAnalysisService from "../services/HortaAnalysisService";

class HortaAnalysisController {

async show(
request:Request,
response:Response
){

try{


const cropId =
Number(request.params.cropId);



const result =
await HortaAnalysisService.analyze(
cropId
);



return response.json(result);



}catch(error){


if(error instanceof Error){

return response.status(404)
.json({

message:error.message

});

}


return response.status(500)
.json({

message:"Erro interno"

});


}


}


}


export default new HortaAnalysisController();