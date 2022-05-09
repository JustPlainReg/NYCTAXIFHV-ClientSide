import mainApi from 'utils/api'
const SCREEN_LOADER = '@SCREEN_LOADER@'

class Common {
  constructor () {  
    
  }

 async updateLocation(locationId,Lat,Lng)
{      
    await mainApi.updateLocation(locationId,Lat,Lng);      
} 
async getLocation(address)
{     
    const data=await mainApi.getLocation(address);     
    return data  
} 
async getZones()
{     
    const data=await mainApi.getTaxiZones();     
    return data  
}
getMonths()
{
var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";
return months;
}
}

export default new Common()