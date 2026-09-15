import bcrypt from "bcryptjs";

import database from "../database/connection";

import {
    generateToken
} from "../utils/jwt";


class AuthService {


async login(
email:string,
password:string
){


const user =
await database("users")
.where({
    email
})
.first();



if(!user){

throw new Error(
"Usuário ou senha inválidos"
);

}



const passwordMatch =
await bcrypt.compare(
password,
user.password_hash
);



if(!passwordMatch){

throw new Error(
"Usuário ou senha inválidos"
);

}



const token =
generateToken({

id:user.id,

email:user.email

});



return {

user:{
id:user.id,
name:user.name,
email:user.email
},

token

};


}



}



export default new AuthService();