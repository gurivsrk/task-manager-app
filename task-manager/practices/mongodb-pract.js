// const mongodb =require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

// Use destructing 
const { MongoClient, ObjectId } = require("mongodb")

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
       return console.log(error)
    }
   
    const db = client.db(databaseName)

    db.collection('user').insertOne({
        _id:id,
        name: 'Vikram',
        age:'26'
    }, (error,result)=>{
        if(error){
            return console.log('Fail to insert data with error=>'+error);
        }
        console.log(result)
    })

     console.log('connected successfully')

    db.collection('task').insertMany([
        {
            description: 'Clean the house',
            completed: true
        },
        {
            description: 'Renew inspections',
            completed: false
        },
        {
            description: 'pot plants',
            completed: false
        }
    ],(error,result)=>{
        if(error){
            return console.log('Fail to insert data with error=>'+error);
        }
        console.log(result.insertedIds)
    })

            // challenge 1st
        db.collection('task').findOne({_id: new ObjectId("62381595919acde8d0a92700")},(error,result)=>{
            if(error){
                return console.log('Fail to find data with error=>'+error)
            }
            console.log(result)
        })
        
        // challenge 2nd
        db.collection('task').find({completed:false}).toArray((error,task)=>{
        if(error){
            return console.log('Fail to find data with error=>'+error)
        }
        console.log(task)
        })

        // pratice
        db.collection('task').find({completed:false}).count((error,count)=>{
        if(error){
            return console.log('Fail to find data with error=>'+error)
        }
        console.log(count)
        })

        db.collection('user').updateOne({
        _id:new ObjectId('623967a97a817941e341cd2b')},
    {$set: {
            name:'Jasjeet',
            age: 25
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{ 
        console.log(error)
    })

    db.collection('user').updateOne({
        _id:new ObjectId('623967a97a817941e341cd2b')},
    {$inc: {
            age:3
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{ 
        console.log(error)
    })

    
    db.collection('task').updateMany({completed:false},
        { $set: {
            completed:true
            }
        }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })

        db.collection('task').deleteMany({status:true}).then((result)=>{
            console.log(result)
        }).catch((error)=>{console.log(error)})
    
        db.collection('task').deleteOne({description:'task 1'}).then((result)=>{
            console.log(result)
        }).catch((error)=>{console.log(error)})
    
})