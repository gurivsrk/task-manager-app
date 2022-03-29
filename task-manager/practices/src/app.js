const {user,tasks} =require('./db/mongoose.js')

    // const me = new user({
    //     name: ' sharry            ',
    //     email: 'sharry@domain.com',
    //     password: 'sharry@123',
    //     age: '33'
    // })

    // me.save().then(()=>{
    //     console.log('success: '+me)
    // }).catch((error)=>{
    //     console.log('error: '+error)
    // })

    const task = new tasks({
        description: 'breakfast',
        completed: true
    })

    task.save().then(()=>{
        console.log('success: '+task)
    }).catch((error)=>{
        console.log('error: '+error)
    })



    //delete 

    // user.deleteMany().then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{ console.log(error)})