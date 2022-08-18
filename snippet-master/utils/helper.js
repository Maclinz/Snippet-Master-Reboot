

export const getUnique = (data,type) =>{
    let uniqueValue = data.map((item) =>{
        return item.name
    })

    return ['All', ...new Set(uniqueValue)]
}