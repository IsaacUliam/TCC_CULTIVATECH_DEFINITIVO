import {
Request,
Response
} from "express";


import AuthService from "../services/AuthService";


class AuthController{


async login(
request:Request,
response:Response
){


const {
email,
password
}=request.body ?? {};



if(!email || !password){

return response
.status(400)
.json({

message:
"Email e senha são obrigatórios"

});

}



try{


const result =
await AuthService.login(
email,
password
);



return response.json(
result
);



}catch(error){


if(error instanceof Error){

return response
.status(401)
.json({

message:error.message

});

}


return response
.status(500)
.json({

message:
"Erro interno"

});


}



}


}



export default new AuthController();