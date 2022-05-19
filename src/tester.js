//four player tests
//no draws
const test = {"mountain1": 4, "mountain2": 5, "mountain3": 9, "mountain4": 2}
//one largest, second and third drawn
const tester = {"mountain1": 5, "mountain2": 5, "mountain3": 9, "mountain4": 2}
//drawn largest
const test2 = {"mountain1": 9, "mountain2": 5, "mountain3": 9, "mountain4": 2}
//three drawn
const test3 = {"mountain1": 9, "mountain2": 5, "mountain3": 9, "mountain4": 9}
//four drawn
const test4 = {"mountain1": 9, "mountain2": 9, "mountain3": 9, "mountain4": 9}

//three player tests
//no draws
const test30 = {"mountain1": 4, "mountain2": 5, "mountain3": 9}
//one largest, second and third drawn
const tester3 = {"mountain1": 5, "mountain2": 5, "mountain3": 9}
//drawn largest
const test32 = {"mountain1": 9, "mountain2": 5, "mountain3": 9}
//three drawn
const test33 = {"mountain1": 9, "mountain2": 9, "mountain3": 9}

/*
    THE ISSUE
sometimes this function applies to three sometimes to four
it starts by sorting the function so largest is last in array
BUT 
may need to reverse that so largest is first because otherwise the array isnt long enough 
and it trys to edit the largest score a lot. so all the calls for "environs[3]" actually
wants two.

gonna need to reverse the sort, and then edit the ifs so 3=0 and so on
*/


function threeOrFourBonus (obj) {
    let environs = Object.entries(obj)

    environs.sort(function(a,b) {
        return b[1] - a[1]
    })

    for(let group of environs) {
        console.log(group)
    }


    const first = environs[0]
    const second = environs[1]
    const third = environs[2]
    const fourth = (environs.length === 4 ? environs[3] : [0,0])

    if(first[1] !== second[1]) {
        environs[0][1] += 3
        if (second[1] !== third[1]){
            environs[1][1] += 1
        }
    } else if (first[1] === second[1] && second[1] !== third[1]) {
        environs [0][1] += 2
        environs [1][1] += 2
    } else if (first[1] === second[1] && second[1] === third[1]){
        if(third[1] === fourth[1]) {
            environs[3][1] += 1
        }
        environs [0][1] += 1
        environs [1][1] += 1
        environs [2][1] += 1
    }

    
    environs.sort(function(a,b) {
        const nameA = a[0].toUpperCase(); //
        const nameB = b[0].toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    })

    for(let group of environs) {
        console.log(group)
    }
}


//four player test calls
console.log("test,looking for 4 6 12 2")
threeOrFourBonus(test)
console.log("new test, drawnt second, looking for 5 5 12 2")
threeOrFourBonus(tester)
console.log("new test, drawnt first, looking for 11 5 11 2 ")
threeOrFourBonus(test2)
console.log("new test, three drawnt first, looking for 10 5 10 10")
threeOrFourBonus(test3)
console.log("new test, all drawn, looking for 10 10 10 10")
threeOrFourBonus(test4)



//three player testcalls
/*
console.log("test, looking for 4 6 12")
threeOrFourBonus(test30)
console.log("new test, looking for 5 5 12")
threeOrFourBonus(tester3)
console.log("test, looking for 11 5 11")
threeOrFourBonus(test32)
console.log("test, looking for 10 10 10")
threeOrFourBonus(test33)
*/