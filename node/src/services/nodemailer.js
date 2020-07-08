"use strict";
const nodemailer = require("nodemailer");
const config = require("../config.js");
const fs=require('fs')

async function enviarConfirmacionEmail(emailDestino, nombreCompleto, codigoVerificacion) {
    
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.email,
          pass: config.passwordEmail
        }
      });
    //qmabclitfbuulzxh
  
    // send mail with defined transport object
    let data=fs.readFileSync("./src/views/confirmation.html").toString();
    data=data.replace('${nombre_usuario}',nombreCompleto);
    data=data.replace('${codigo_verificacion}',codigoVerificacion);
    let info = await transporter.sendMail({
        from: `"Equipo SUMATE ✔" ${config.email}`, // sender address
        to: emailDestino, // list of receivers
        subject: "Verifique su correo", // Subject line
        //text: "Bienvenido texto plano",
        html: data
    });
    return info;;
  }
  
  module.exports={
      enviarConfirmacionEmail
  };