import Hotel from "../models/Hotel.js";

export const createHotel= async (req,res,next)=>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json({
            message:"Hotel created Sucessfully",
            savedHotel
        })

    }
catch(err){
   
    next(err);
}
}

export const getAllHotel =async (req,res,next)=>{ 
    try{
        const allHotel = await Hotel.find();
        res.status(200).json(allHotel)
          }
        catch(err){
         next(err)
      }
}

export const getHotel = async (req,res,next) =>{
    try{
        const id =req.params.id
        const getHotel = await Hotel.findById(id)
        res.status(200).json(getHotel)
    }
   catch(err){  
    next(err)
}
}

export const updateHotel= async (req,res,next)=>{
    try{
        const id =req.params.id
        const updateHotel = await Hotel.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({
            message:`Hotel with id:${id} updated`,
            updateHotel
        })
    }
catch(err){ 
    next(err)
}
}
export const deleteHotel = async (req,res,next)=>{
    try{
        const id =req.params.id
        const deleteHotel = await Hotel.findByIdAndDelete(id)
        res.status(200).json({
            message:`Hotel with id:${id} sucessfully Deleted`,       
        })
    }
catch(err){
    next(err)
}
}

export const countByCity =async (req,res,next)=>{ 
    const cities= req.query.cities.split(",")
    
    try{
        const list = await Promise.all(cities.map((city)=>{
return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
          }
        catch(err){
         next(err)
      }
}