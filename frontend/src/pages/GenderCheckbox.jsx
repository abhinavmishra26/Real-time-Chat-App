export const GenderCheckbox=({onCheckboxChange,selectedGender})=>{
    return(
        <div className="form-control mt-4">
            <label className={` text-gray-300 text-sm ${selectedGender==="male"? "selected":""}`}>
            Male
            <input type="checkbox" name="gender" value="male" className="checkbox border-slate-900  checkbox-accent mx-2 "
            checked={selectedGender==="male"}
            onChange={()=>onCheckboxChange("male")}/>
             
            </label>
             <label className={  ` text-gray-300 text-sm ${selectedGender==="female"? "selected":""}`}>
             Female
             <input type="checkbox" name="gender" value="female" className="checkbox border-slate-900  checkbox-accent mx-2"
              checked={selectedGender==="female"}
              onChange={()=>onCheckboxChange("female")}/>
            
            </label>

        </div>
    )
}