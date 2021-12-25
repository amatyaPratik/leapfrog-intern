var fruits = [
    {
        id:1,
        name: 'apple',
        color: 'green'
    },
    {
        id:2,
        name: 'mango',
        color: 'yellow'
    },
    {
        id:3,
        name: 'kiwi',
        color: 'brown'
    },
    {
        id:4,
        name: 'banana',
        color: 'yellow'
    }
]

function searchByName(objecttosearch, namevalue){
    objecttosearch.forEach(
        function (val, index){
            if(val.name===namevalue){
                console.log(val);
                return val
            }
        }
    )
}

searchByName(fruits,'banana')