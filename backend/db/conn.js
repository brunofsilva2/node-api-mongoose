const mongoose = require('mongoose');

async function main(){
    try{
        await mongoose.connect('');

        console.log("Conectado com o banco!")
        
    } catch (error){
        console.log(`Erro: ${error}`)
    }
}

module.exports = main;