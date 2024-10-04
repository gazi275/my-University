import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./AcademicDepartment.interface";


export const AcademicDepartmentSchema= new Schema<TAcademicDepartment>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
      },
},
{
    timestamps:true
})
AcademicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExist= await AcademicDepartment.findOne({
        name:this.name
    })

    if (isDepartmentExist) {
        throw new Error('Department is already exist')
    }

    next()
})
 
AcademicDepartmentSchema.pre('findOneAndUpdate', async function(next){
const query =this.getQuery()
const isDepartmentExist=await AcademicDepartment.findOne(query)
if (!isDepartmentExist) {
    throw new Error('Department is already exist')
}
next()
}) 


export const AcademicDepartment= model<TAcademicDepartment>('AcademicDepartment',AcademicDepartmentSchema)