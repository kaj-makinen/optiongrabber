/* jshint -W104 */
/* jshint -W119 */

// funktion för att filtrera bort del av array
const filterArr = function filterarr(myarr,filter) {
   
    let returnarr = myarr.filter((element) => { 
        return element !=filter;
    });
    
   return returnarr;
};

// funktion för att söka index i arr2 där arr1 är del av arr2
// söker från index 1
const findArrayInArr = function findarrayinarr(arr1,arr2) {
   
    let arr2length = arr2.length;

    for(i=1;i<arr2length;i++) {
        if(JSON.stringify(arr2.slice(i,i+1))==JSON.stringify(arr1)) {
            return true;
        }
    }   
    return(false);
};
const commandoptions = {
    useroption:"--user",
    passwordoption:"--password"
};

module.exports = {
    filterArr: filterArr,
    findArrayInArr: findArrayInArr,
    commandoptions:commandoptions
};