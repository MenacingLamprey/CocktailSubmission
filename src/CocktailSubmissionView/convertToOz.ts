export const convertToOz = (unit : string) => {
  if (unit == "dash" ) unit = 'dashes'
  switch(unit) { 
    case 'dashes' : { 
      return 1/48
    }
    case 'oz' : {
      return 1
    }
    default: { 
      console.log('Unit Not Recognized!')
      return 1
    } 
 } 
}