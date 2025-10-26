// Distributed Blockchain - P2P Node Implementation Example
// Bu dosya educational amaçlıdır - basitleştirilmiş P2P blockchain örneği

import { Blockchain, Transaction } from './blockchain-vite'
import { Block } from './block-vite'

/**
 * P2P Message Types
 */
enum MessageType {
  QUERY_LATEST = 'QUERY_LATEST',
  QUERY_ALL = 'QUERY_ALL',
  RESPONSE_BLOCKCHAIN = 'RESPONSE_BLOCKCHAIN',
  NEW_BLOCK = 'NEW_BLOCK',
  NEW_TRANSACTION = 'NEW_TRANSACTION'
}

/**
 * P2P Message Interface
 */
interface P2PMessage {
  type: MessageType
  data: any
}

/**
 * Distributed Blockchain Node
 * Her node bir WebSocket server ve client içerir
 */
export class DistributedBlockchainNode {
  private blockchain: Blockchain
  private peers: Set<WebSocket> = new Set()
  private server: WebSocket | null = null
  
  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain
  }

  /**
   * Yeni block'u tüm peer'lara broadcast et
   */
  broadcastBlock(block: Block): void {
    console.log('📡 Broadcasting new block to peers...')
    
    const message: P2PMessage = {
      type: MessageType.NEW_BLOCK,
      data: block
    }
    
    this.broadcast(message)
  }

  /**
   * Yeni transaction'ı broadcast et
   */
  broadcastTransaction(transaction: Transaction): void {
    console.log('📡 Broadcasting transaction to network...')
    
    const message: P2PMessage = {
      type: MessageType.NEW_TRANSACTION,
      data: transaction
    }
    
    this.broadcast(message)
  }

  /**
   * Peer'dan gelen block'u işle
   */
  handleReceivedBlock(block: Block): void {
    const latestBlock = this.blockchain.getLatestBlock()
    
    // Received block is newer
    if (block.previousHash === latestBlock.hash) {
      console.log('✅ Valid block received, adding to chain')
      
      // Validate block
      if (this.isValidNewBlock(block, latestBlock)) {
        this.blockchain.chain.push(block)
        
        // Update UTXO set
        if (Array.isArray(block.data)) {
          // Private method erişimi için reflection (demo amaçlı)
          console.log('📊 Updating UTXO set...')
          this.blockchain.rebuildUtxoSet()
        }
        
        // Broadcast to other peers
        this.broadcastBlock(block)
      } else {
        console.log('❌ Invalid block received')
      }
    } 
    // Fork detected - need full chain sync
    else if (block.timestamp > latestBlock.timestamp) {
      console.log('🔀 Fork detected! Requesting full chain from peer')
      this.queryAllBlocks()
    }
    // Old block, ignore
    else {
      console.log('⏮️ Received old block, ignoring')
    }
  }

  /**
   * Peer'dan gelen blockchain'i işle (conflict resolution)
   */
  handleReceivedBlockchain(receivedChain: Block[]): void {
    if (receivedChain.length === 0) {
      console.log('❌ Received empty blockchain')
      return
    }

    const latestReceivedBlock = receivedChain[receivedChain.length - 1]
    const latestOwnBlock = this.blockchain.getLatestBlock()

    // Type guard
    if (!latestReceivedBlock) {
      console.log('❌ Invalid received chain')
      return
    }

    // Received chain is longer
    if (latestReceivedBlock.timestamp > latestOwnBlock.timestamp) {
      console.log('📥 Received blockchain is longer, validating...')
      
      if (this.isValidChain(receivedChain)) {
        console.log('✅ Valid longer chain received, replacing local chain')
        this.blockchain.chain = receivedChain
        this.blockchain.rebuildUtxoSet()
        this.broadcastLatestBlock()
      } else {
        console.log('❌ Received chain is invalid')
      }
    } else {
      console.log('📊 Our chain is longer, keeping local chain')
    }
  }

  /**
   * Validate new block
   */
  private isValidNewBlock(newBlock: Block, previousBlock: Block): boolean {
    // Check previous hash link
    if (previousBlock.hash !== newBlock.previousHash) {
      console.log('❌ Previous hash mismatch')
      return false
    }
    
    // Check hash calculation
    if (newBlock.calculateHash() !== newBlock.hash) {
      console.log('❌ Invalid hash')
      return false
    }
    
    // Check proof of work
    if (!newBlock.isValidHash(this.blockchain.difficulty)) {
      console.log('❌ Invalid proof of work')
      return false
    }
    
    // Validate transactions (simplified)
    if (Array.isArray(newBlock.data)) {
      for (const tx of newBlock.data as Transaction[]) {
        if (tx.fromAddress && tx.amount <= 0) {
          console.log('❌ Invalid transaction amount')
          return false
        }
      }
    }
    
    return true
  }

  /**
   * Validate entire blockchain
   */
  private isValidChain(chain: Block[]): boolean {
    // Check genesis block
    if (JSON.stringify(chain[0]) !== JSON.stringify(this.blockchain.chain[0])) {
      console.log('❌ Genesis block mismatch')
      return false
    }

    // Validate each block
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i]
      const previousBlock = chain[i - 1]
      
      // Type guards
      if (!currentBlock || !previousBlock) {
        console.log('❌ Invalid block at index', i)
        return false
      }
      
      if (!this.isValidNewBlock(currentBlock, previousBlock)) {
        return false
      }
    }

    return true
  }

  /**
   * Query latest block from peers
   */
  private queryLatestBlock(): void {
    const message: P2PMessage = {
      type: MessageType.QUERY_LATEST,
      data: null
    }
    this.broadcast(message)
  }

  /**
   * Query all blocks from peers
   */
  private queryAllBlocks(): void {
    const message: P2PMessage = {
      type: MessageType.QUERY_ALL,
      data: null
    }
    this.broadcast(message)
  }

  /**
   * Broadcast latest block
   */
  private broadcastLatestBlock(): void {
    const message: P2PMessage = {
      type: MessageType.RESPONSE_BLOCKCHAIN,
      data: [this.blockchain.getLatestBlock()]
    }
    this.broadcast(message)
  }

  /**
   * Generic broadcast to all peers
   */
  private broadcast(message: P2PMessage): void {
    this.peers.forEach(peer => {
      try {
        peer.send(JSON.stringify(message))
      } catch (error) {
        console.error('Failed to send message to peer:', error)
      }
    })
  }

  /**
   * Handle incoming P2P message
   */
  handleMessage(message: P2PMessage): void {
    console.log(`📨 Received message type: ${message.type}`)

    switch (message.type) {
      case MessageType.QUERY_LATEST:
        this.broadcastLatestBlock()
        break

      case MessageType.QUERY_ALL:
        const responseMessage: P2PMessage = {
          type: MessageType.RESPONSE_BLOCKCHAIN,
          data: this.blockchain.chain
        }
        this.broadcast(responseMessage)
        break

      case MessageType.RESPONSE_BLOCKCHAIN:
        this.handleReceivedBlockchain(message.data)
        break

      case MessageType.NEW_BLOCK:
        this.handleReceivedBlock(message.data)
        break

      case MessageType.NEW_TRANSACTION:
        // Add to pending transactions if valid
        const tx = message.data as Transaction
        console.log(`📝 Received transaction: ${tx.fromAddress} -> ${tx.toAddress}: ${tx.amount}`)
        this.blockchain.createTransaction(tx)
        break

      default:
        console.log('❌ Unknown message type')
    }
  }

  /**
   * Connect to a peer
   */
  connectToPeer(url: string): void {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      console.log(`✅ Connected to peer: ${url}`)
      this.peers.add(ws)
      this.queryLatestBlock()
    }

    ws.onmessage = (event) => {
      const message: P2PMessage = JSON.parse(event.data)
      this.handleMessage(message)
    }

    ws.onerror = (error) => {
      console.error(`❌ Connection error with peer ${url}:`, error)
    }

    ws.onclose = () => {
      console.log(`👋 Disconnected from peer: ${url}`)
      this.peers.delete(ws)
    }
  }

  /**
   * Get network statistics
   */
  getNetworkStats(): {
    peerCount: number
    chainLength: number
    pendingTransactions: number
    difficulty: number
  } {
    return {
      peerCount: this.peers.size,
      chainLength: this.blockchain.chain.length,
      pendingTransactions: this.blockchain.pendingTransactions.length,
      difficulty: this.blockchain.difficulty
    }
  }
}

/**
 * USAGE EXAMPLE (Educational)
 * 
 * // Node 1
 * const blockchain1 = new Blockchain()
 * const node1 = new DistributedBlockchainNode(blockchain1)
 * 
 * // Node 2  
 * const blockchain2 = new Blockchain()
 * const node2 = new DistributedBlockchainNode(blockchain2)
 * 
 * // Connect nodes
 * node2.connectToPeer('ws://localhost:6001')
 * 
 * // Create transaction on node1
 * blockchain1.createTransaction({
 *   fromAddress: 'alice',
 *   toAddress: 'bob',
 *   amount: 50
 * })
 * 
 * // Mine and broadcast
 * const result = blockchain1.minePendingTransactions('miner1')
 * node1.broadcastBlock(blockchain1.getLatestBlock())
 * 
 * // Node2 automatically receives and validates the block
 * // Both nodes now have same chain and UTXO set
 */

/**
 * KEY CONCEPTS DEMONSTRATED:
 * 
 * 1. P2P Communication: WebSocket-based peer discovery
 * 2. Block Broadcasting: New blocks shared with all peers
 * 3. Chain Validation: Each node validates received blocks
 * 4. Conflict Resolution: Longest valid chain wins
 * 5. Fork Detection: Automatic full chain sync on forks
 * 6. UTXO Consistency: Deterministic state transitions
 * 
 * LIMITATIONS (Simplified for Education):
 * - No cryptographic signatures
 * - Simple longest chain rule (no difficulty adjustment)
 * - No mempool synchronization
 * - No NAT traversal / peer discovery protocol
 * - No persistent storage
 * 
 * REAL BLOCKCHAIN ADDITIONS:
 * - ECDSA signatures for transactions
 * - Merkle tree for efficient verification
 * - SPV (Simplified Payment Verification) support
 * - Advanced peer discovery (Kademlia DHT)
 * - Block relay protocols (compact blocks, etc.)
 */