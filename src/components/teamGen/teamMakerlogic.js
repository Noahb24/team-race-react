/* eslint-disable array-callback-return */
/*const times = [
    {id: 0, time:'15:10.60'},
    {id: 1, time:'13:50.26'},
    {id: 2, time:'15:21.63'},
    {id: 3, time:'15:26.97'},
    {id: 4, time:'13:18.59'},
    {id: 5, time:'13:05.25'},
    {id: 6, time:'13:36.18'},
    {id: 7, time:'14:25.68'},
    {id: 8, time:'15:24.15'}
]*/

function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	if (k > set.length || k <= 0) {
		return [];
	}
	if (k === set.length) {
		return [set];
	}
	if (k === 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	combs = [];

	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i + 1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function tooMS (arr){
    let newArr = []
    arr.map(time => {
        const minute = Number(time.slice(0,2)) * 60000
        const second = Number(time.slice(3,5)) * 1000
        const milSec = Number(time.slice(6))
        newArr.push(minute + second + milSec)
    })
  return newArr  
}

function totalRaceTimes (combos, timesObj) {
    const totaledArr = []
    combos.map(combo => {
        
        let comboTotal = 0
        combo.map(r => {

            comboTotal += timesObj[r]
            return ''
        })
        totaledArr.push({combo, total:comboTotal})
        return comboTotal
    })
    return totaledArr
}

function averageRaceTime (timesArr) {
    var total = 0
    for(let i = 0; i < timesArr.length; i++){
        total += timesArr[i].total
    }
    return total / timesArr.length
}
  

function closest (raceTimesObjArr, goal, num){
    let arr = []
    raceTimesObjArr.map(time => {
        arr.push(time.total)
    })
    
    const closestTime =  arr.reduce((prev, curr) => {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
    })
    return {combo: raceTimesObjArr[arr.indexOf(closestTime)].combo ,total:closestTime, num}
}

function nthClosest (raceTimesObjArr, goal, teams){
    const usedRacers = []
    const closestTimes = []
    let arr = raceTimesObjArr
    let b = 0

    for(let i = 0; i < teams; i){
        const close = closest(arr, goal, b)

        let newArr = arr.filter(time => time.total !== close.total)
        arr = newArr
        b++

        //console.log(i + " " + teams)
        //console.log(close)
        //console.log(usedRacers)
        //console.log(arr)

        if(!usedRacers.includes(close.combo[0]) && !usedRacers.includes(close.combo[1]) && !usedRacers.includes(close.combo[2])) {
            close.combo.map(racer => usedRacers.push(racer))
            closestTimes.push(close)
            i++
        }
    }
    return closestTimes
}

export function findClosestNthTimes (racerObj, teamSize) {


    let racers = []
    let times = []

    racerObj.map(racer => {
        racers.push(racer.id)
        times.push(racer.time)
    })

    const combinations = k_combinations(racers, teamSize)
    const ms = tooMS(times)

    const raceTimesObj = totalRaceTimes(combinations ,ms)
    const raceTimesAverage = averageRaceTime(raceTimesObj)

    //console.log(raceTimesObj)
    //console.log(raceTimesAverage)

    //console.log(nthClosest(raceTimesObj, raceTimesAverage, teamSize))
    return nthClosest(raceTimesObj, raceTimesAverage, teamSize)
}

export function msToTime (time) {
    const minute = Math.floor(Number(time) / 60000)
    const minuteRemainder =Number(time) % 60000

    const second = Math.floor(minuteRemainder / 1000)
    const ms = minuteRemainder % 1000

    return `${minute}:${second}.${ms}`
}