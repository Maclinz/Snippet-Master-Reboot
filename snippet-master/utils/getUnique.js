
//get unique values from array
export const getUnique = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}   