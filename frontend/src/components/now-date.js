export function NowDate () {
    const myDate = new Date();
        const myYear = myDate.getFullYear().toString().slice(-2)
        const myMonth = ("0" + (myDate.getMonth() + 1)).slice(-2);
        const myDay = ("0" + myDate.getDate()).slice(-2);
        const myHour = ("0" + myDate.getHours()).slice(-2);
        const myMin = ("0" + myDate.getMinutes()).slice(-2);
        const mySec = ("0" + myDate.getSeconds()).slice(-2);

        const myToday = myDay + "." + myMonth + "." + myYear + "\n" + myHour + ":" + myMin

        return  [
            myToday,
            myDay,
            myMonth,
            myYear,
            myHour,
            myMin,
            mySec
        ]
        
}