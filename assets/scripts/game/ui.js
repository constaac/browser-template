'use strict'

const gamelogic = require('./gamelogic')

const createGameSuccess = function (response) {
  console.log(response)
  $('.create-error').css('color', 'green')
  $('.create-error').text('Game Created!')
  $('.create-error').css('visibility', 'visible')
  setTimeout(function () {
    $('.create-error').css('visibility', 'hidden')
  }, 2000)
  $('#turn-indicator').text("X's Turn")
  return response
}

const createGameFailure = function (response) {
  console.log(response)
  $('.create-error').css('color', 'red')
  $('.create-error').text('Error creating game!')
  $('.create-error').css('visibility', 'visible')
  setTimeout(function () {
    $('.create-error').css('visibility', 'hidden')
  }, 2000)
}

const gameHistorySuccess = function (response) {
  console.log(response.games)
  $('.game-history').empty()
  $('.empty-game-history').css('display', 'none')
  if (response.games.length === 0) {
    $('.empty-game-history').css('display', 'block')
    setTimeout(function () {
      $('.empty-game-history').css('display', 'none')
    }, 2000)
  }
  response.games.forEach(function (element) {
    if (element.player_o === null) {
      $('.game-history').append('<li><ul><li>Game ID: ' + element.id + '</li><li>Game is Over: ' + element.over + '</li><li><i>Local Game</i></li></ul></li><br>')
    } else {
      $('.game-history').append('<li><ul><li>Game ID: ' + element.id + '</li><li>Game is Over: ' + element.over + '</li><li><i>Online Game</i></li><li>Player X: ' + element.player_x.email + '</li><li>Player O: ' + element.player_o.email + '</li></ul></li><br>')
    }
  })
}

const gameHistoryFailure = function (response) {
  $('.empty-game-history1').text('Error Loading Game History!')
  $('.empty-game-history1').css('display', 'block')
  setTimeout(function () {
    $('.empty-game-history1').css('display', 'none')
    $('.empty-game-history1').text('No Games Found!')
  }, 2000)
}

const loadGameSuccess = function (response) {
  $('#loadModal').modal('hide')
  gamelogic.resetCurrentStats()
  gamelogic.calcCurrentTurnCounter(response)
  gamelogic.updateGame(response)
  console.log('Created Loaded Game?')
  return response
}

const loadGameFailure = function (response) {

}

module.exports = {
  createGameSuccess,
  createGameFailure,
  gameHistorySuccess,
  gameHistoryFailure,
  loadGameSuccess,
  loadGameFailure
}