const mongoose = require('mongoose')

//Schema to control what goes to the database
//Using built in validators
const TaskSchema = new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true, 'Name is not provided!!'],
            trim:true,
            maxlength:[100, 'Cannot be more than 100 characters']
        },
        completed:
        {
            type:Boolean,
            default:false
            //required:[true,'Status is not provided!!!']
        }
    }
)

module.exports = mongoose.model('Task',TaskSchema)