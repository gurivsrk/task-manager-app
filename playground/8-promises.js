const doworkpromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
         resolve([7,4,1]) 
       // reject('things went wrong')
    },2000)
})

doworkpromise.then((result)=>{
    console.log('success!'+result)
}).catch((error)=>{
    console.log('error'+ error)
})

//
//                               fulfilled
//                             /
//promise       -- pending -->  
//                             \
//                               rejected
//
