import './config/env.js'
import app from './app.js'

const PORT = 4000 || process.env.PORT

const startServer =async ()=>{

    try {
        app.listen(PORT , ()=>{
            console.log('server started at ' , PORT)
        })
        
    } catch (error) {
        console.log(`error happend ${error}`);
        
    }
}

startServer();