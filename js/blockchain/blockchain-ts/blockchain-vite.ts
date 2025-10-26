import { Block, BlockData, MiningResult } from './block-vite.ts'
import CryptoJS from 'crypto-js'

// Transaction interface
export interface Transaction extends BlockData {
  hash?: string
}

// Mining istatistikleri için interface
export interface MiningStats {
  totalBlocks: number
  totalMiningTime: number
  averageHashRate: number
  lastMiningTime: number | null
}

// Vite build bilgileri için interface
export interface ViteBuildInfo {
  isDev: boolean
  isProd: boolean
  mode: string
}

// Balance bilgileri için interface
export interface BalanceInfo {
  address: string
  amount: number
}

// Blockchain sınıfı - Tüm blokları yöneten ana sınıf (Vite Bundled versiyonu)
export class Blockchain {
  public readonly id: number = Math.floor(Math.random() * 1000) + 1
  public chain: Block[]
  public difficulty: number
  public pendingTransactions: Transaction[]
  public readonly miningReward: number = 100
  
  // GÜVENLIK: UTXO set private - sadece getter ile erişilebilir
  private utxoSet: Map<string, number>
  private addressIndex: Map<string, boolean>
  
  public miningStats: MiningStats
  public viteBuildInfo: ViteBuildInfo

  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = import.meta.env.DEV ? 1 : 2 // Dev mode'da düşük difficulty
    this.pendingTransactions = []
    
    // UTXO sistemi - Gerçek blockchain'lere daha yakın
    this.utxoSet = new Map() // address -> balance mapping
    this.addressIndex = new Map() // Hızlı arama için adres indeksi
    
    // Mining istatistikleri
    this.miningStats = {
      totalBlocks: 1, // Genesis block
      totalMiningTime: 0,
      averageHashRate: 0,
      lastMiningTime: null
    }

    // Vite env bilgileri
    this.viteBuildInfo = {
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD,
      mode: import.meta.env.MODE
    }
  }

  // Genesis block (ilk blok) oluşturma
  private createGenesisBlock(): Block {
    // timestamp,data,previousHash
    const genesisBlock = new Block(Date.now(), 'Genesis Block - Vite Bundled Edition', '0')
    console.log('✨ Genesis Block oluşturuldu - UTXO sistemi başlatıldı (Vite Bundled)')
    
    if (import.meta.env.DEV) {
      console.log('🔧 Vite Dev Mode aktif - Düşük difficulty kullanılıyor')
    }
    
    return genesisBlock
  }

  // Son bloğu getir
  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1] as Block
  }

  // Bekleyen işlemleri mine et (Vite optimized)
  public minePendingTransactions(miningRewardAddress: string): MiningResult {
    // Mining ödülü işlemini ekle
    const rewardTransaction: Transaction = {
      fromAddress: null,
      toAddress: miningRewardAddress,
      amount: this.miningReward
    }
    this.pendingTransactions.push(rewardTransaction)

    // Yeni blok oluştur
    const block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    )
    
    // Bloğu mine et
    console.log(`🔥 Blok #${this.chain.length} mining başlıyor... (Vite)`)
    const miningResult = block.mineBlock(this.difficulty)
    
    console.log('✅ Blok başarıyla mine edildi!')
    this.chain.push(block)
    
    // Mining istatistiklerini güncelle
    this.updateMiningStats(miningResult)
    
    // UTXO set'ini güncelle (Gerçek blockchain'lerde böyle yapılır)
    this.updateUtxoSet(this.pendingTransactions)
    
    // Bekleyen işlemleri temizle
    this.pendingTransactions = []
    
    return miningResult
  }

  // Mining istatistiklerini güncelle
  private updateMiningStats(result: MiningResult): void {
    this.miningStats.totalBlocks++
    this.miningStats.totalMiningTime += result.time
    this.miningStats.averageHashRate = Math.round(
      (this.miningStats.averageHashRate + result.hashRate) / 2
    )
    this.miningStats.lastMiningTime = result.time
    
    console.log(`📊 Mining İstatistikleri (Vite):`)
    console.log(`   Toplam Blok: ${this.miningStats.totalBlocks}`)
    console.log(`   Ortalama Hash Rate: ${this.miningStats.averageHashRate} hash/s`)
    console.log(`   Son Mining Süresi: ${this.miningStats.lastMiningTime}ms`)
  }

  // Yeni işlem oluştur
  public createTransaction(transaction: Transaction): void {
    // İşlem geçerliliği kontrolü
    if (transaction.fromAddress && transaction.amount > 0) {
      const senderBalance = this.getBalance(transaction.fromAddress)
      if (senderBalance < transaction.amount) {
        throw new Error(`❌ Yetersiz bakiye! Mevcut: ${senderBalance}, Gerekli: ${transaction.amount}`)
      }
    }
    
    // İşlem hash'i oluştur (güvenlik için)
    transaction.hash = this.createTransactionHash(transaction)
    
    this.pendingTransactions.push(transaction)
    console.log(`✨ Yeni işlem eklendi: ${transaction.fromAddress || 'Mining'} -> ${transaction.toAddress}: ${transaction.amount}`)
    console.log(`🔗 İşlem Hash: ${transaction.hash}`)
  }

  // İşlem hash'i oluştur (Vite bundled Crypto-JS)
  private createTransactionHash(transaction: Transaction): string {
    const transactionString = `${transaction.fromAddress}${transaction.toAddress}${transaction.amount}${Date.now()}`
    return CryptoJS.SHA256(transactionString).toString().substring(0, 16)
  }

  // Adres bakiyesini hesapla (UTXO Set - Modern yaklaşım)
  public getBalance(address: string): number {
    // UTXO set'inden bakiye al (O(1) karmaşıklık)
    return this.utxoSet.get(address) || 0
  }

  // UTXO set'ini güncelle (Optimize edilmiş bakiye yönetimi)
  private updateUtxoSet(transactions: Transaction[]): void {
    for (const trans of transactions) {
      // Gönderen adresin bakiyesini azalt
      if (trans.fromAddress) {
        const currentBalance = this.utxoSet.get(trans.fromAddress) || 0
        this.utxoSet.set(trans.fromAddress, currentBalance - trans.amount)
      }
      
      // Alıcı adresin bakiyesini artır
      if (trans.toAddress) {
        const currentBalance = this.utxoSet.get(trans.toAddress) || 0
        this.utxoSet.set(trans.toAddress, currentBalance + trans.amount)
      }
    }
    
    console.log('📊 UTXO set güncellendi. Mevcut bakiyeler:', Object.fromEntries(this.utxoSet))
  }

  // UTXO set'ini sıfırdan oluştur (Blockchain'i yeniden tararsa)
  public rebuildUtxoSet(): void {
    console.log('🔄 UTXO set yeniden oluşturuluyor... (Vite)')
    this.utxoSet.clear()
    
    for (const block of this.chain) {
      if (Array.isArray(block.data)) {
        this.updateUtxoSet(block.data as Transaction[])
      }
    }
    
    console.log('✅ UTXO set yeniden oluşturuldu')
  }

  // Başlangıç bakiyelerini oluştur (Vite için yardımcı fonksiyon)
  public initializeBalances(): MiningResult {
    const initialBalances: BalanceInfo[] = [
      { address: 'ahmet-wallet', amount: 1000 },
      { address: 'mehmet-wallet', amount: 800 },
      { address: 'ayse-wallet', amount: 600 },
      { address: 'miner1-wallet', amount: 200 }
    ]

    console.log('🪙 Başlangıç bakiyeleri oluşturuluyor... (Vite)')
    
    // Her adres için mining reward transaction'ı oluştur
    initialBalances.forEach(({ address, amount }) => {
      this.createTransaction({
        fromAddress: null, // Mining reward
        toAddress: address,
        amount: amount
      })
    })

    // Otomatik mining yap
    const result = this.minePendingTransactions('system-miner')
    
    console.log('✅ Başlangıç bakiyeleri oluşturuldu! (Vite)')
    console.log(`Mining tamamlandı: ${result.time}ms`)
    console.log(`Hash: ${result.hash}`)
    
    return result
  }

  // GÜVENLIK: UTXO Set'e sadece okunabilir erişim (immutable kopya)
  public getUtxoSet(): ReadonlyMap<string, number> {
    return new Map(this.utxoSet) // Yeni Map kopyası döndürülür - orijinal korunur
  }

  // GÜVENLIK: UTXO Set'i Object olarak döndür (display için)
  public getUtxoSetAsObject(): Record<string, number> {
    return Object.fromEntries(this.utxoSet)
  }

  // Tüm adresleri getir
  public getAllAddresses(): string[] {
    const addresses = new Set<string>()
    for (const block of this.chain) {
      if (Array.isArray(block.data)) {
        for (const trans of block.data as Transaction[]) {
          if (trans.fromAddress) addresses.add(trans.fromAddress)
          if (trans.toAddress) addresses.add(trans.toAddress)
        }
      }
    }
    return Array.from(addresses)
  }

  // Blockchain'in geçerliliğini kontrol et
  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i] as Block
      const previousBlock = this.chain[i - 1] as Block

      // Mevcut bloğun hash'ini kontrol et
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log('❌ Geçersiz hash tespit edildi:', currentBlock.hash)
        return false
      }

      // Önceki blok bağlantısını kontrol et
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log('❌ Geçersiz blok bağlantısı tespit edildi')
        return false
      }

      // Mining geçerliliğini kontrol et
      if (!currentBlock.isValidHash(this.difficulty)) {
        console.log('❌ Geçersiz mining tespit edildi - difficulty koşulu sağlanmıyor')
        return false
      }
    }

    // UTXO consistency kontrolü
    console.log('🔍 UTXO set tutarlılığı kontrol ediliyor...')
    const tempUtxo = new Map<string, number>()
    for (const block of this.chain) {
      if (Array.isArray(block.data)) {
        for (const trans of block.data as Transaction[]) {
          if (trans.fromAddress) {
            const balance = tempUtxo.get(trans.fromAddress) || 0
            tempUtxo.set(trans.fromAddress, balance - trans.amount)
          }
          if (trans.toAddress) {
            const balance = tempUtxo.get(trans.toAddress) || 0
            tempUtxo.set(trans.toAddress, balance + trans.amount)
          }
        }
      }
    }

    // UTXO set karşılaştırması
    for (const [address, balance] of tempUtxo) {
      if (this.utxoSet.get(address) !== balance) {
        console.log(`❌ UTXO tutarsızlığı: ${address} - Beklenen: ${balance}, Mevcut: ${this.utxoSet.get(address)}`)
        return false
      }
    }

    console.log('✅ Blockchain ve UTXO set geçerli! (Vite Bundled Edition)')
    return true
  }

  // Mining zorluğunu ayarla (Vite environment aware)
  public adjustDifficulty(targetTimeMs = 10000): void {
    if (this.miningStats.lastMiningTime) {
      if (this.miningStats.lastMiningTime < targetTimeMs / 2) {
        this.difficulty++
        console.log(`⬆️ Difficulty artırıldı: ${this.difficulty}`)
      } else if (this.miningStats.lastMiningTime > targetTimeMs * 2 && this.difficulty > 1) {
        this.difficulty--
        console.log(`⬇️ Difficulty azaltıldı: ${this.difficulty}`)
      }
    }

    // Dev mode limiti
    if (import.meta.env.DEV && this.difficulty > 2) {
      this.difficulty = 2
      console.log('🔧 Dev mode: Difficulty 2 ile sınırlandı')
    }
  }

  // Blockchain'i görüntüle (Vite enhanced)
  public displayBlockchain(): void {
    console.log('\n=== VITE BUNDLED BLOCKCHAIN BİLGİLERİ ===')
    console.log(`🆔 Blockchain ID: ${this.id}`)
    console.log(`📊 UTXO Set: ${JSON.stringify(this.getUtxoSetAsObject(), null, 2)}`)
    console.log(`⛏️ Mining İstatistikleri:`, this.miningStats)
    console.log(`🔧 Vite Build Info:`, this.viteBuildInfo)
    
    this.chain.forEach((block, index) => {
      console.log(`\n--- Blok ${index} ---`)
      console.log(`Timestamp: ${new Date(block.timestamp).toLocaleString()}`)
      console.log(`Previous Hash: ${block.previousHash}`)
      console.log(`Hash: ${block.hash}`)
      console.log(`Nonce: ${block.nonce}`)
      console.log(`Data: ${JSON.stringify(block.data, null, 2)}`)
    })
  }

  // Tüm bakiyeleri görüntüle
  public displayAllBalances(): void {
    console.log('\n=== TÜM ADRESLERİN BAKİYELERİ (Vite) ===')
    if (this.utxoSet.size === 0) {
      console.log('❌ Henüz hiçbir adresin bakiyesi yok. Önce mining yapın veya başlangıç bakiyelerini oluşturun.')
      return
    }
    
    for (const [address, balance] of this.utxoSet.entries()) {
      console.log(`💰 ${address}: ${balance} coin`)
    }
  }
}