const suits = ['\u2660', '\u2661', '\u2662', '\u2663']
const displayVals = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A'
]

/**
 * Fisher-Yates Shuffle
 */
function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function getCardData (cardId) {
  if (!cardId) throw new Error('getCardData needs a cardId')
  const cardVal = cardId % 13
  const cardDisplay = `${displayVals[cardVal]}${suits[cardId % 4]}`
  return { cardDisplay, cardVal }
}

function getShuffledDeck () {
  return shuffle(new Array(52).fill(0).map((x, i) => i + 1))
}

export { getCardData, getShuffledDeck }
