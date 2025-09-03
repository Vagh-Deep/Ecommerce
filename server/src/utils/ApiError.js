class ApiError extends Error {
    constructor(statusCode,message, errors=[],stack="" ){
        super(message)
        this.statusCode= statusCode
        this.data=null
        this.success= statusCode<400
        this.message= message??"something went wrong"
        this.errors=errors

         if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }


    }
    

}
module.exports= ApiError
 