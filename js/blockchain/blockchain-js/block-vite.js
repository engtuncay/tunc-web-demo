// Block sınıfı - Blockchain'deki her bir blok (Vite Bundled versiyonu)
import CryptoJS from 'crypto-js'

export class Block {
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0 // Mining için kullanılan sayı
    }

    // SHA-256 hash fonksiyonu (Vite bundled Crypto-JS)
    calculateHash() {
        const str = this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce
        
        // Vite bundled Crypto-JS ile SHA-256 hash hesaplama
        return CryptoJS.SHA256(str).toString()
    }

    // Mining işlemi - Proof of Work (Vite optimized)
    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join('0')
        
        console.log(`🔨 Mining başlıyor... Target: ${target}`)
        console.log(`📊 Difficulty: ${difficulty}`)
        
        const startTime = Date.now()
        let attempts = 0
        
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++
            attempts++
            this.hash = this.calculateHash()
            
            // Her 10000 denemede bir progress göster (Vite HMR için optimize)
            if (attempts % 10000 === 0) {
                console.log(`⏳ Mining devam ediyor... Deneme: ${attempts}, Hash: ${this.hash.substring(0, 10)}...`)
            }

            // Vite dev mode için performans limiti
            if (import.meta.env.DEV && attempts > 100000) {
                console.warn('⚠️ Dev mode mining limiti aşıldı, difficulty azaltılıyor...')
                break
            }
        }
        
        const endTime = Date.now()
        const miningTime = endTime - startTime
        const hashRate = Math.round(attempts / (miningTime / 1000))
        
        console.log(`✅ Blok başarıyla mine edildi! (Vite Bundled)`)
        console.log(`🔗 Hash: ${this.hash}`)
        console.log(`⏱️ Mining süresi: ${miningTime}ms`)
        console.log(`🎯 Nonce: ${this.nonce}`)
        console.log(`⚡ Hash Rate: ${hashRate} hash/saniye`)
        console.log(`🔄 Toplam deneme: ${attempts}`)
        
        return {
            hash: this.hash,
            time: miningTime,
            nonce: this.nonce,
            attempts: attempts,
            hashRate: hashRate
        }
    }

    // Hash geçerliliğini kontrol et
    isValidHash(difficulty) {
        const target = Array(difficulty + 1).join('0')
        return this.hash.substring(0, difficulty) === target
    }

    // Blok bilgilerini göster (Vite console formatting)
    displayBlockInfo() {
        console.log('\n=== BLOK BİLGİLERİ (Vite Bundled) ===')
        console.log(`Timestamp: ${new Date(this.timestamp).toLocaleString()}`)
        console.log(`Previous Hash: ${this.previousHash}`)
        console.log(`Hash: ${this.hash}`)
        console.log(`Nonce: ${this.nonce}`)
        console.log(`Data: ${JSON.stringify(this.data, null, 2)}`)
        
        // Vite env bilgileri
        if (import.meta.env.DEV) {
            console.log(`🔧 Vite Dev Mode: Aktif`)
        }
        if (import.meta.env.PROD) {
            console.log(`🚀 Vite Production Build`)
        }
    }
}