import { getCardData, getShuffledDeck } from './cards.mjs'
/**
 * This takes two players, and pits them against each other. This represents one draw of the decks.
 */
function playTurn (player1, player2, sendReport) {
  const pot = []
  while (true) {
    const card1 = player1.deck.pop()
    const card2 = player2.deck.pop()
    const { cardDisplay: card1Display, cardVal: card1Val } = getCardData(card1)
    const { cardDisplay: card2Display, cardVal: card2Val } = getCardData(card2)
    sendReport(`${card1Display} vs ${card2Display}`, 'versus')
    pot.push(card1, card2)
    if (card1Val > card2Val) {
      player1.discard.push(...pot)
      sendReport(`Player 1 Wins ${pot.length} cards`, 'win_turn')
      break
    }
    if (card2Val > card1Val) {
      player2.discard.push(...pot)
      sendReport(`Player 2 Wins ${pot.length} cards`, 'win_turn')
      break
    }
  }
  sendReport(`Player 1 Prize Count: ${player1.discard.length}`, 'card_count')
  sendReport(`Player 2 Prize Count: ${player2.discard.length}`, 'card_count')
}

/**
 * This is a destructive game of War that modifies the arrays
 *
 * sendReport is a callback that takes a message and a css class.
 */
function playWar (sendReport) {
  const deck = getShuffledDeck()
  const halfway = deck.length / 2
  const player1 = {
    deck: deck.slice(0, halfway),
    discard: []
  }
  const player2 = {
    deck: deck.slice(halfway),
    discard: []
  }
  while (player1.deck.length > 0 && player2.deck.length > 0) {
    playTurn(player1, player2, sendReport)
    sendReport('', 'split')
  }
  if (player1.discard.length > player2.discard.length) {
    sendReport('Player 1 Wins', 'win')
  }
  if (player1.discard.length < player2.discard.length) {
    sendReport('Player 2 Wins', 'win')
  }
  if (player1.discard.length === player2.discard.length) {
    sendReport('Player 1 and Player 2 Tied', 'draw')
  }
}

export default playWar
