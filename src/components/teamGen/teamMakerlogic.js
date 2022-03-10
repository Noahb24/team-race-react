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
/* creates all possible racer combos with a given team size and retrun an array of the combos*/
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
///////////////

/* Converts racer object from redux to name and time in ms object */
function tooMS (arr){
    let newArr = []
    arr.map(racer => {
        const minute =  Number(racer.minute) * 60000
        const second = Number(racer.second) * 1000
        const milSec = Number(racer.ms)
        newArr.push({name: racer.name, time: minute + second + milSec})
    })
  return newArr  
}
///////////


function totalRaceTimes (combos) {
    const totaledCombos = combos.map(combo => {
        let teamTotal = 0
        combo.forEach(racer => {
            teamTotal += racer.time
        })
        //combo.teamTotal = teamTotal
        return ([...combo, {teamTotal}])
    })
    return totaledCombos
}

function averageRaceTime (teams) {
    const timesArr = teams.map(team => team[team.length-1].teamTotal)
    var total = 0
    for(let i = 0; i < timesArr.length; i++){
        total += timesArr[i]
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

    return {combo: raceTimesObjArr[arr.indexOf(closestTime)].racers ,total:closestTime, num}
}

function nthClosest (raceTimesObjArr, goal, teams){
    const usedRacers = []
    const closestTimes = []
    let arr = raceTimesObjArr
    let b = 0
    console.log(arr)

    for(let i = 0; i < teams; i){
        const close = closest(arr, goal, b)
        //console.log(arr)
        //let newArr = arr.filter(time => time.total !== close.total)
        let newArr = arr.filter(obj => obj.racers !== close.combo)
        arr = newArr
        b++
        //!usedRacers.includes(close.combo[0]) && !usedRacers.includes(close.combo[1]) && !usedRacers.includes(close.combo[2])

        if(!usedRacers.some(r=> close.combo.indexOf(r) >= 0)) {
            close.combo.map(racer => usedRacers.push(racer))
            closestTimes.push(close)
            i++
        }

    }
    return closestTimes
}

export function findClosestNthTimes (racerObj, teamSize) {
    const racers = tooMS(racerObj)

    const combinations = k_combinations(racers, teamSize)
    const teamTimes = totalRaceTimes(combinations)
    const averageTime = averageRaceTime(teamTimes)

    const raceTimesObj = teamTimes.map(team => {
        const racerArr = []
        for(let i = 0; i < team.length - 1; i++){
            racerArr.push(team[i].name)
        }
        return {racers: racerArr, total: team[team.length-1].teamTotal}
    })
    console.log(nthClosest(raceTimesObj, averageTime, (racers.length/teamSize)))
    return nthClosest(raceTimesObj, averageTime, (racers.length/teamSize))
}

export function msToTime (time) {
    const minute = Math.floor(Number(time) / 60000)
    const minuteRemainder =Number(time) % 60000

    const second = Math.floor(minuteRemainder / 1000)
    const ms = minuteRemainder % 1000

    return `${minute}:${second}.${ms}`
}