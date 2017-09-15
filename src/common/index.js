const addZero1 = (i) => {
  let num = i
  if (i < 10) {
    num = `0${i}`
  }
  return num
}

export const addZero(e) {
  return addZero1(e)
}


// export function rand(min, max) {
//   return Math.floor((Math.random() * max) + min)
// }

// export function calcPorcentagem(now, created) {
//   const dateCreated = new Date(created)

//   let dateCreatedCur = new Date(dateCreated.getTime() + (now.getTimezoneOffset() * 60000))

//   dateCreatedCur = dateCreatedCur.getTime()

//   const nowNum = now.getTime()

//   const diff = dateCreatedCur - nowNum
//   const max = -20 * (1000 * 60)

//   return Math.floor((diff * 100) / max)
// }

// // function getSeconds (time) {
// //   return new Date(time).getSeconds()
// // }

// // function getMinutes (time) {
// //   return Math.floor(time / 60 / 60)
// // }

// export const timeDistance = (start, end, type = 'both') => {
//   if (typeof type === 'undefined') {
//     type = 'both'
//   }

//   let distance = 0
//   let direction = ''

//   if (type === 'both') {
//     if (start > end) {
//       direction = 'que aconteceu'
//       distance = start - end
//     } else {
//       direction = 'ainda vai acontecer'
//       distance = end - start
//     }
//   } else if (type === 'future') {
//     direction = 'ainda vai acontecer 1'
//     distance = end - start

//     if (distance < 0) {
//       distance = 0
//     }
//   }

//   if (distance < 60000) {
//     // console.log(direction, distance);
//   }

//   let seconds = Math.floor((distance / 1000) % 60)
//   let minutes = Math.floor((distance / 1000 / 60) % 60)
//   let hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
//   let days = Math.floor(distance / (1000 * 60 * 60 * 24))

//   return {
//     direction: direction,
//     order: start + '-' + end,
//     total: start - end,
//     days: days,
//     hours: hours,
//     minutes: minutes,
//     seconds: seconds
//   }
// }

// export const wasHapping = (now, time) => {
//   const newTime = []

//   const distance = timeDistance(now, time)

//   if (distance.days) {
//     newTime.push(`${distance.days} dias`)
//   }
//   if (distance.hours) {
//     newTime.push(`${distance.hours} horas`)
//   }
//   if (distance.minutes) {
//     newTime.push(`${distance.minutes} minutos`)
//   }
//   if (distance.seconds) {
//     newTime.push(`${distance.seconds} segundos`)
//   }

//   return newTime.join(' ')
// }

// export function calcTimeout (now, created) {
//   let dateCreated = new Date(created)

  //   let dateCreatedCorrent = new Date(dateCreated.getTime()
//  + now.getTimezoneOffset() * 60000).getTime()

//   now = now.getTime()

//   // let diff = now - dateCreatedCorrent

//   let finished = dateCreatedCorrent + (20 * 60 * 1000)

//   // diff = diff / 1000

//   // console.log(diff / 60)

//   // dateCreatedCorrent =
//   // console.log(now / 60 / 1000, finished / 60 / 1000)
//   if (now >= finished) return '0min 0s'

//   let distance = timeDistance(finished, now)
//   // console.log(distance)
//   // if (diff < 0) return '00:00:00'
//   // return 'asd'
//   return `${distance.minutes}min ${distance.seconds}s`
// }

// export function calcDateTimeout (now, created) {
//   let dateCreated = new Date(created)

  //   let dateCreatedCorrent = new Date(dateCreated.getTime()
//  + now.getTimezoneOffset() * 60000).getTime()

//   now = now.getTime()

//   // let diff = now - dateCreatedCorrent

//   let finished = dateCreatedCorrent + (20 * 60 * 1000)

//   // diff = diff / 1000

//   // console.log(diff / 60)

//   // dateCreatedCorrent =
//   // console.log(now / 60 / 1000, finished / 60 / 1000)
//   if (now >= finished) return '0min 0s'

//   let distance = timeDistance(finished, now)
//   // console.log(distance)
//   // if (diff < 0) return '00:00:00'
//   // return 'asd'
//   return `${distance.days}dias ${distance.hours}hor ${distance.hours}min
// ${distance.minutes } min ${distance.seconds } s`
// }

// export function timezone (time) {
//   const dateCreated = new Date(time)
//   const now = new Date()

//   const dateFixed = new Date(dateCreated.getTime() + now.getTimezoneOffset() * 60000)

//   let day = dateFixed.getDate()
//   let month = dateFixed.getMonth() + 1
//   let minutes = dateFixed.getMinutes()
//   let hours = dateFixed.getHours()

//   const date = [
//     addZero(day),
//     addZero(month),
//     dateFixed.getFullYear()
//   ].join('/')

//   const hour = [ addZero(hours), addZero(minutes) ].join(':')

//   return [ date, hour ].join(' ')
// }

// export function DateTime (time) {
//   const dateObj = new Date(time)

//   let day = dateObj.getDate()
//   let month = dateObj.getMonth() + 1
//   let minutes = dateObj.getMinutes()
//   let hours = dateObj.getHours()

//   const date = [
//     addZero(day),
//     addZero(month),
//     dateObj.getFullYear()
//   ].join('/')

//   const hour = [ addZero(hours), addZero(minutes) ].join(':')

//   return [ date, hour ].join(' ')
// }
