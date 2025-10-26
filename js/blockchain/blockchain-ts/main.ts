// Main Vite Application Entry Point
import CryptoJS from 'crypto-js'
import { Block } from './block-vite.ts'
import { Blockchain, Transaction, BalanceInfo } from './blockchain-vite.ts'
import './style.css' // Vite CSS import

// Build info display
const buildTime: string = __BUILD_TIME__
const version: string = __APP_VERSION__ || '1.0.0'

document.addEventListener('DOMContentLoaded', function() {
  // Build bilgilerini göster
  const buildTimeElement = document.getElementById('buildTime')
  const versionElement = document.getElementById('version')
  
  if (buildTimeElement) buildTimeElement.textContent = new Date(buildTime).toLocaleString()
  if (versionElement) versionElement.textContent = version
  
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
function initializeApp(): void {
  displayBlockchain()
  validateChain()
  showPendingTransactions()
  displayMiningStats()
  
  // Event listener'ları ekle
  setupEventListeners()
}

// Event listeners setup
function setupEventListeners(): void {
  const elements = [
    { id: 'initializeBalancesBtn', handler: initializeBalances },
    { id: 'quickMineBtn', handler: quickMine },
    { id: 'createTransactionBtn', handler: createTransaction },
    { id: 'mineTransactionsBtn', handler: mineTransactions },
    { id: 'adjustDifficultyBtn', handler: adjustDifficulty },
    { id: 'checkBalanceBtn', handler: checkBalance },
    { id: 'showPendingBtn', handler: showPendingTransactions },
    { id: 'displayBlockchainBtn', handler: displayBlockchain },
    { id: 'validateChainBtn', handler: validateChain },
    { id: 'rebuildUtxoBtn', handler: rebuildUtxo }
  ]

  elements.forEach(({ id, handler }) => {
    const element = document.getElementById(id)
    if (element) {
      element.addEventListener('click', handler)
    }
  })
}

// DOM element helper function
function getElementByIdSafe(id: string): HTMLElement {
  const element = document.getElementById(id)
  if (!element) {
    throw new Error(`Element with id '${id}' not found`)
  }
  return element
}

// Input element helper function
function getInputValueById(id: string): string {
  const element = document.getElementById(id) as HTMLInputElement
  return element ? element.value : ''
}

// Set status message helper
function setStatusMessage(elementId: string, message: string, isError = false): void {
  const element = document.getElementById(elementId)
  if (element) {
    const statusClass = isError ? 'invalid' : 'valid'
    element.innerHTML = `<div class="status ${statusClass}">${message}</div>`
  }
}

// Başlangıç bakiyelerini oluştur
function initializeBalances(): void {
  const statusDiv = document.getElementById('initStatus')
  if (statusDiv) statusDiv.innerHTML = '<p>🪙 Başlangıç bakiyeleri oluşturuluyor...</p>'

  const initialBalances: BalanceInfo[] = [
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
    
    const message = `
      <strong>✅ Başlangıç bakiyeleri oluşturuldu! (Vite Bundled)</strong><br>
      Mining tamamlandı: ${result.time}ms<br>
      Hash: ${result.hash}<br>
      🪙 Dağıtılan bakiyeler:<br>
      ${initialBalances.map(b => `• ${b.address}: ${b.amount}`).join('<br>')}
    `
    
    setStatusMessage('initStatus', message)

    displayBlockchain()
    displayMiningStats()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    setStatusMessage('initStatus', `<strong>❌ Hata:</strong> ${errorMessage}`, true)
  }
}

// Hızlı mining
function quickMine(): void {
  const statusDiv = document.getElementById('initStatus')
  if (statusDiv) statusDiv.innerHTML = '<p>⚡ Hızlı mining başlıyor...</p>'

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

    const message = `
      <strong>⚡ Hızlı mining tamamlandı! (Vite)</strong><br>
      3 blok mine edildi<br>
      miner1-wallet adresine toplam 400 coin eklendi
    `
    
    setStatusMessage('initStatus', message)

    displayBlockchain()
    displayMiningStats()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    setStatusMessage('initStatus', `<strong>❌ Mining hatası:</strong> ${errorMessage}`, true)
  }
}

function createTransaction(): void {
  const from = getInputValueById('fromAddress')
  const to = getInputValueById('toAddress')
  const amountStr = getInputValueById('amount')
  const amount = parseInt(amountStr)

  if (!from || !to || !amount || isNaN(amount)) {
    alert('Lütfen tüm alanları doğru şekilde doldurun!')
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
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
    alert(`Hata: ${errorMessage}`)
  }
}

function mineTransactions(): void {
  const minerAddress = getInputValueById('minerAddress')
  const difficultyStr = getInputValueById('difficulty')
  const difficulty = parseInt(difficultyStr) || 2
  
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
  if (statusDiv) statusDiv.innerHTML = '<p>⛏️ Vite bundled Crypto-JS ile mining başlıyor... Lütfen bekleyin.</p>'

  const mineBtn = document.getElementById('mineTransactionsBtn') as HTMLButtonElement
  if (mineBtn) {
    mineBtn.disabled = true
    mineBtn.textContent = 'Mining yapılıyor...'
  }

  setTimeout(() => {
    try {
      const result = myBlockchain.minePendingTransactions(minerAddress)
      const message = `
        <strong>✅ Vite Mining tamamlandı!</strong><br>
        Hash: ${result.hash}<br>
        Süre: ${result.time}ms<br>
        Nonce: ${result.nonce}<br>
        Hash Rate: ${result.hashRate} hash/s<br>
        Toplam Deneme: ${result.attempts}
      `
      
      setStatusMessage('miningStatus', message)
      displayMiningStats()
      displayBlockchain()
      showPendingTransactions()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
      setStatusMessage('miningStatus', `<strong>❌ Mining hatası:</strong><br>${errorMessage}`, true)
    } finally {
      if (mineBtn) {
        mineBtn.disabled = false
        mineBtn.textContent = 'Bekleyen İşlemleri Mine Et'
      }
    }
  }, 100)
}

function displayMiningStats(): void {
  const statsDiv = document.getElementById('miningStats')
  if (!statsDiv) return
  
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

function adjustDifficulty(): void {
  myBlockchain.adjustDifficulty()
  const difficultyInput = document.getElementById('difficulty') as HTMLInputElement
  if (difficultyInput) {
    difficultyInput.value = myBlockchain.difficulty.toString()
  }
  displayMiningStats()
  alert(`Difficulty ayarlandı: ${myBlockchain.difficulty}`)
}

function showPendingTransactions(): void {
  const pendingDiv = document.getElementById('pendingTransactions')
  if (!pendingDiv) return

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

function checkBalance(): void {
  const address = getInputValueById('balanceAddress')
  if (!address) {
    alert('Lütfen adres girin!')
    return
  }

  const balance = myBlockchain.getBalance(address)
  const resultDiv = document.getElementById('balanceResult')
  if (resultDiv) {
    resultDiv.innerHTML = `
      <div class="balance">
        <strong>${address}</strong> bakiye: <strong>${balance}</strong>
      </div>
    `
  }
}

function validateChain(): void {
  const isValid = myBlockchain.isChainValid()
  const statusClass = isValid ? 'valid' : 'invalid'
  const statusText = isValid
    ? 'Blockchain geçerli! (Vite)'
    : 'Blockchain geçersiz!'

  const chainStatus = document.getElementById('chainStatus')
  if (chainStatus) {
    chainStatus.innerHTML = `
      <div class="status ${statusClass}">
        <strong>${statusText}</strong>
      </div>
    `
  }
}

function rebuildUtxo(): void {
  myBlockchain.rebuildUtxoSet()
  alert('UTXO Set yeniden oluşturuldu!')
  displayBlockchain()
}

function displayBlockchain(): void {
  const blockchainDiv = document.getElementById('blockchain')
  if (!blockchainDiv) return
  
  let html = '<h3>Blockchain Blokları (Vite Bundled):</h3>'
  html += `<div><strong>Blockchain ID:</strong> ${myBlockchain.id}</div>`
  
  // GÜVENLIK: Güvenli getter kullanarak UTXO Set'e erişim
  const utxoSet = myBlockchain.getUtxoSet()
  if (utxoSet.size > 0) {
    html += '<div class="utxo-info"><h4>📊 UTXO Set (Optimize Edilmiş Bakiyeler):</h4>'
    for (const [address, balance] of utxoSet.entries()) {
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
      (block.data as Transaction[]).forEach((trans) => {
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