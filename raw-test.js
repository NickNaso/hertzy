'use strict'

const Hertzy = require('./')

const usrFreq = Hertzy.tune('user')

usrFreq.on('user:add', function (data) {
    console.log('NEW USER ADDED WITH FOLLOWING DATA:')
    console.log(data)
})

const usrFreq1 = Hertzy.tune('user')
usrFreq1.on('user:add', function (data) {
    console.log('NEW USER ADDED WITH FOLLOWING DATA:')
    console.log(data)
})

usrFreq.emit('user:add', {
    username: 'NickNaso',
    password: '********',
    email: 'nicoladelgobbo@gmail.com'
})




