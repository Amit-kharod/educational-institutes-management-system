// capitalize the first letter of each word in a string
export const toTitleCase = str => str.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
export const nToNth = (n) => {return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}
