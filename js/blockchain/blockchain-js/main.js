// Main Vite Application Entry Point
import CryptoJS from 'crypto-js'
import { Block } from './block-vite.js'
import { Blockchain } from './blockchain-vite.js'
import './style.css' // Vite CSS import

// Build info display
const buildTime = __BUILD_TIME__
const version = __APP_VERSION__ || '1.0.0'

document.addEventListener('DOMContentLoaded', function() {
  // Build bilgilerini göster
  document.getElementById('buildTime').textContent = new Date(buildTime).toLocaleString()
  document.getElementById('version').textContent = version
  
  console.log('🚀 Vite Blockchain demo başlatılıyor...')
  console.log(`📅 Build Time: ${buildTime}`)
  console.log(`📦 Version: ${version}`)
  console.log('📦 Block sınıfı yüklendi:', typeof Block)
  console.log('🔗 Blockchain sınıfı yüklendi:', typeof Blockchain)
  
  initializeApp()
})

// Global blockchain instance
const myBlockchain = new Blockchain()

// App initialization
function initializeApp() {
  displayBlockchain()
  validateChain()
  showPendingTransactions()
  displayMiningStats()
  
  // Event listener'ları ekle
  setupEventListeners()
}

// Event listeners setup
function setupEventListeners() {
  document.getElementById('initializeBalancesBtn').addEventListener('click', initializeBalances)
  document.getElementById('quickMineBtn').addEventListener('click', quickMine)
  document.getElementById('createTransactionBtn').addEventListener('click', createTransaction)
  document.getElementById('mineTransactionsBtn').addEventListener('click', mineTransactions)
  document.getElementById('adjustDifficultyBtn').addEventListener('click', adjustDifficulty)
  document.getElementById('checkBalanceBtn').addEventListener('click', checkBalance)
  document.getElementById('showPendingBtn').addEventListener('click', showPendingTransactions)
  document.getElementById('displayBlockchainBtn').addEventListener('click', displayBlockchain)
  document.getElementById('validateChainBtn').addEventListener('click', validateChain)
  document.getElementById('rebuildUtxoBtn').addEventListener('click', rebuildUtxo)
}

// Başlangıç bakiyelerini oluştur
function initializeBalances() {
  const statusDiv = document.getElementById('initStatus')
  statusDiv.innerHTML = '<p>🪙 Başlangıç bakiyeleri oluşturuluyor...</p>'

  const initialBalances = [
    { address: 'ahmet-wallet', amount: 1000 },
    { address: 'mehmet-wallet', amount: 800 },
    { address: 'ayse-wallet', amount: 600 },
    { address: 'miner1-wallet', amount: 200 }
  ]

  try {
    initialBalances.forEach(({ address, amount }) => {
      myBlockchain.createTransaction({
        fromAddress: null,
        toAddress: address,
        amount: amount
      })
    })

    const result = myBlockchain.minePendingTransactions('system-miner')
    
    statusDiv.innerHTML = `
      <div class="status valid">
        <strong>✅ Başlangıç bakiyeleri oluşturuldu! (Vite Bundled)</strong><br>
        Mining tamamlandı: ${result.time}ms<br>
        Hash: ${result.hash}<br>
        🪙 Dağıtılan bakiyeler:<br>
        ${initialBalances.map(b => `• ${b.address}: ${b.amount}`).join('<br>')}
      </div>
    `

    displayBlockchain()
    displayMiningStats()
  } catch (error) {
    statusDiv.innerHTML = `
      <div class="status invalid">
        <strong>❌ Hata:</strong> ${error.message}
      </div>
    `
  }
}

// Hızlı mining
function quickMine() {
  const statusDiv = document.getElementById('initStatus')
  statusDiv.innerHTML = '<p>⚡ Hızlı mining başlıyor...</p>'

  try {
    for (let i = 0; i < 3; i++) {
      myBlockchain.createTransaction({
        fromAddress: null,
        toAddress: 'miner1-wallet',
        amount: 100
      })
      
      const result = myBlockchain.minePendingTransactions('miner1-wallet')
      console.log(`Blok ${i + 1} mine edildi: ${result.hash}`)
    }

    statusDiv.innerHTML = `
      <div class="status valid">
        <strong>⚡ Hızlı mining tamamlandı! (Vite)</strong><br>
        3 blok mine edildi<br>
        miner1-wallet adresine toplam 400 coin eklendi
      </div>
    `

    displayBlockchain()
    displayMiningStats()
  } catch (error) {
    statusDiv.innerHTML = `
      <div class="status invalid">
        <strong>❌ Mining hatası:</strong> ${error.message}
      </div>
    `
  }
}

function createTransaction() {
  const from = document.getElementById('fromAddress').value
  const to = document.getElementById('toAddress').value
  const amount = parseInt(document.getElementById('amount').value)

  if (!from || !to || !amount) {
    alert('Lütfen tüm alanları doldurun!')
    return
  }

  try {
    myBlockchain.createTransaction({
      fromAddress: from,
      toAddress: to,
      amount: amount,
    })

    alert(`İşlem oluşturuldu: ${from} -> ${to}: ${amount}`)
    displayBlockchain()
    showPendingTransactions()
  } catch (error) {
    alert(`Hata: ${error.message}`)
  }
}

function mineTransactions() {
  const minerAddress = document.getElementById('minerAddress').value
  const difficulty = parseInt(document.getElementById('difficulty').value) || 2
  
  if (!minerAddress) {
    alert('Lütfen miner adresini girin!')
    return
  }

  myBlockchain.difficulty = difficulty

  if (myBlockchain.pendingTransactions.length === 0) {
    alert('Mine edilecek bekleyen işlem yok!')
    return
  }

  const statusDiv = document.getElementById('miningStatus')
  statusDiv.innerHTML = '<p>⛏️ Vite bundled Crypto-JS ile mining başlıyor... Lütfen bekleyin.</p>'

  const mineBtn = document.getElementById('mineTransactionsBtn')
  mineBtn.disabled = true
  mineBtn.textContent = 'Mining yapılıyor...'

  setTimeout(() => {
    try {
      const result = myBlockchain.minePendingTransactions(minerAddress)
      statusDiv.innerHTML = `
        <div class="status valid">
          <strong>✅ Vite Mining tamamlandı!</strong><br>
          Hash: ${result.hash}<br>
          Süre: ${result.time}ms<br>
          Nonce: ${result.nonce}<br>
          Hash Rate: ${result.hashRate} hash/s<br>
          Toplam Deneme: ${result.attempts}
        </div>
      `
      displayMiningStats()
      displayBlockchain()
      showPendingTransactions()
    } catch (error) {
      statusDiv.innerHTML = `
        <div class="status invalid">
          <strong>❌ Mining hatası:</strong><br>
          ${error.message}
        </div>
      `
    } finally {
      mineBtn.disabled = false
      mineBtn.textContent = 'Bekleyen İşlemleri Mine Et'
    }
  }, 100)
}

function displayMiningStats() {
  const statsDiv = document.getElementById('miningStats')
  const stats = myBlockchain.miningStats
  
  statsDiv.innerHTML = `
    <div class="mining-stats">
      <h4>📊 Mining İstatistikleri (Vite)</h4>
      <div><strong>Toplam Blok:</strong> ${stats.totalBlocks}</div>
      <div><strong>Ortalama Hash Rate:</strong> ${stats.averageHashRate} hash/s</div>
      <div><strong>Son Mining Süresi:</strong> ${stats.lastMiningTime}ms</div>
      <div><strong>Mevcut Difficulty:</strong> ${myBlockchain.difficulty}</div>
    </div>
  `
}

function adjustDifficulty() {
  myBlockchain.adjustDifficulty()
  document.getElementById('difficulty').value = myBlockchain.difficulty
  displayMiningStats()
  alert(`Difficulty ayarlandı: ${myBlockchain.difficulty}`)
}

function showPendingTransactions() {
  const pendingDiv = document.getElementById('pendingTransactions')

  if (myBlockchain.pendingTransactions.length === 0) {
    pendingDiv.innerHTML = `
      <div class="status valid">
        📭 Bekleyen işlem bulunmuyor.
      </div>
    `
    return
  }

  let html = `<h4>📋 Bekleyen İşlemler (${myBlockchain.pendingTransactions.length} adet):</h4>`

  myBlockchain.pendingTransactions.forEach((trans, index) => {
    html += `
      <div class="transaction">
        <strong>${index + 1}.</strong> 
        ${trans.fromAddress || 'Mining Reward'} → ${trans.toAddress}: 
        <strong>${trans.amount}</strong>
        ${trans.hash ? `<br><small>Hash: ${trans.hash}</small>` : ''}
      </div>
    `
  })

  pendingDiv.innerHTML = html
}

function checkBalance() {
  const address = document.getElementById('balanceAddress').value
  if (!address) {
    alert('Lütfen adres girin!')
    return
  }

  const balance = myBlockchain.getBalance(address)
  document.getElementById('balanceResult').innerHTML = `
    <div class="balance">
      <strong>${address}</strong> bakiye: <strong>${balance}</strong>
    </div>
  `
}

function validateChain() {
  const isValid = myBlockchain.isChainValid()
  const statusClass = isValid ? 'valid' : 'invalid'
  const statusText = isValid
    ? 'Blockchain geçerli! (Vite)'
    : 'Blockchain geçersiz!'

  document.getElementById('chainStatus').innerHTML = `
    <div class="status ${statusClass}">
      <strong>${statusText}</strong>
    </div>
  `
}

function rebuildUtxo() {
  myBlockchain.rebuildUtxoSet()
  alert('UTXO Set yeniden oluşturuldu!')
  displayBlockchain()
}

function displayBlockchain() {
  const blockchainDiv = document.getElementById('blockchain')
  let html = '<h3>Blockchain Blokları (Vite Bundled):</h3>'
  html += `<div><strong>Blockchain ID:</strong> ${myBlockchain.id}</div>`
  
  if (myBlockchain.utxoSet.size > 0) {
    html += '<div class="utxo-info"><h4>📊 UTXO Set (Optimize Edilmiş Bakiyeler):</h4>'
    for (const [address, balance] of myBlockchain.utxoSet.entries()) {
      html += `<div class="balance"><strong>${address}:</strong> ${balance}</div>`
    }
    html += '</div>'
  }

  myBlockchain.chain.forEach((block, index) => {
    html += `
      <div class="block">
        <h4>Blok ${index} ${index === 0 ? '(Genesis)' : ''}</h4>
        <p><strong>Timestamp:</strong> ${new Date(block.timestamp).toLocaleString()}</p>
        <p><strong>Previous Hash:</strong> ${block.previousHash}</p>
        <p><strong>Hash:</strong> ${block.hash}</p>
        <p><strong>Nonce:</strong> ${block.nonce}</p>
        <div><strong>Data:</strong></div>
    `

    if (Array.isArray(block.data)) {
      block.data.forEach((trans) => {
        html += `
          <div class="transaction">
            ${trans.fromAddress || 'Mining Reward'} → ${trans.toAddress}: ${trans.amount}
            ${trans.hash ? `<br><small>TX Hash: ${trans.hash}</small>` : ''}
          </div>
        `
      })
    } else {
      html += `<div class="transaction">${block.data}</div>`
    }

    html += '</div>'
  })

  blockchainDiv.innerHTML = html
}