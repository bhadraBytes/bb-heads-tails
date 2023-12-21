// Coin Flip Simulation

var coinFlipButton = document.getElementById('coinFlipButton');
var outcome = document.querySelector('.outcome');
const flipSound = new Audio('/Assets/Flip-Sound.mp3');
var HeadsBttn = document.querySelector('#coin-head');
var TailsBttn = document.querySelector('#coin-tail');
const CoinSelector = document.querySelector('#sound');
var selectedCurrency = 0;
var balance = 500; // Initial balance, change this value if needed

HeadsBttn.addEventListener('click', function() {
  CoinSelector.currentTime = 0;
  CoinSelector.play();
  updateButtonState();
});

TailsBttn.addEventListener('click', function() {
  CoinSelector.currentTime = 0;
  CoinSelector.play();
  updateButtonState();
});

// Listen for changes in currency radio buttons
var currencyButtons = document.querySelectorAll('input[name="money-bttns"]');
currencyButtons.forEach(function(button) {
  button.addEventListener('change', function() {
    selectedCurrency = parseInt(this.value);
    updateButtonState();
  });
});

function getRandomNumber() {
  return Math.floor(Math.random() * (2 - 1 + 1)) + 1;
}

function updateButtonState() {
  coinFlipButton.disabled = selectedCurrency === 0 || (!HeadsBttn.checked && !TailsBttn.checked) || balance < selectedCurrency;
}

function updateBalanceUI() {
  document.getElementById('current-balance').innerText = '₹' + balance;
}

coinFlipButton.addEventListener('click', function() {
  console.log('Button clicked!');
  if (selectedCurrency > 0 && balance >= selectedCurrency && (HeadsBttn.checked || TailsBttn.checked)) {
    // Deduct the selected currency from the balance
    balance -= selectedCurrency;
    
    var randomNumber = getRandomNumber();
    outcome.textContent = '';
    outcome.classList.toggle('flip');
    outcome.classList.add('toss');
    flipSound.play();

    setTimeout(function() {
      if (randomNumber === 1) {
        outcome.textContent = 'heads';
        if (HeadsBttn.checked) {
          // Double the balance if heads
          balance += selectedCurrency * 2;
        }
      } else if (randomNumber === 2) {
        outcome.textContent = 'tails';
        if (TailsBttn.checked) {
          // Double the balance if tails
          balance += selectedCurrency * 2;
        }
      }
      outcome.classList.remove('toss');
      updateBalanceUI();
    }, 800);

    disableButton();
  }
});

function disableButton() {
  coinFlipButton.disabled = true;
  setTimeout(function(){
    coinFlipButton.disabled = false;
  }, 900);
}

// Initial UI setup
updateButtonState();
updateBalanceUI();
