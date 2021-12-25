var myInfo = 
{
    name: 'Pratik Amatya',
    address: 'Nayabazar',
    email: 'pratikamatya@gmail.com',
    interests: ['cycling','hunting','gaming'],
    education: [
        {
            name:'space aeronautics', enrolledDate: '2011-11-12'
        },
        {
            name:'astro physics', enrolledDate: '2021-11-12'
        },
        {
            name:'Eastern Mystical Astrology', enrolledDate: '2041-11-12'
        }
    ]
}

function listEducation(){
    myInfo.education.forEach(function(val,index){
        console.log('Name: '+val.name+', Enrolled: '+val.enrolledDate);
    })
}

listEducation()