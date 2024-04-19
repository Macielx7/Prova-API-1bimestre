const mongoose = require('mongoose'); 
 
 
async function main() { 
    try { 
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d1cm7ez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`); 
        console.log("Banco conectado"); 
    } catch (error) { 
        console.log('Erro: ' + error); 
    } 
} 
 
module.exports = main; 
 
 
// abra o arquivo .env e edite a senha e usuario 
//"" 
