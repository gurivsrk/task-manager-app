///CRUD  -- CREATE READ UPDATE DELETE
const { MongoClient, ObjectId } = require("mongodb")

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'



MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
       return console.log(error)
    }
    //console.log(client)
    const db = client.db(databaseName)

    

    
})