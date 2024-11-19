function OficiiChoose(oficii, data) {
    oficii.map(item => [
        data !== item.oficiul
            ? document.getElementById("dsAl_" + item._id).style.display = 'none'
            : {},
        
        data === item.oficiul
        ? document.getElementById("dsAl_" + item._id).style.display = 'table-row'
        : {}, 

        data === undefined
        ? document.getElementById("dsAl_" + item._id).style.display = 'table-row'
        : {} 
        ]
        )
}
export default OficiiChoose;