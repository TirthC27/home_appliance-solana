/**
 * Phantom Wallet Utilities
 * Based on official Phantom documentation: https://docs.phantom.com/
 */

/**
 * Detects if Phantom wallet is installed
 * @returns {Object|null} - Phantom provider or null if not installed
 */
export const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  // If Phantom is not installed, redirect user to download
  window.open('https://phantom.app/', '_blank');
  return null;
};

/**
 * Connects to Phantom wallet
 * @param {boolean} onlyIfTrusted - Only connect if app is already trusted
 * @returns {Promise<Object>} - Connection response with publicKey
 */
export const connectWallet = async (onlyIfTrusted = false) => {
  try {
    const provider = getProvider();
    if (!provider) {
      throw new Error('Phantom wallet not installed');
    }

    const resp = await provider.connect({ onlyIfTrusted });
    console.log('Connected to wallet:', resp.publicKey.toString());
    return resp;
  } catch (err) {
    console.error('Connection failed:', err);
    throw err;
  }
};

/**
 * Disconnects from Phantom wallet
 */
export const disconnectWallet = async () => {
  try {
    const provider = getProvider();
    if (provider) {
      await provider.disconnect();
      console.log('Disconnected from wallet');
    }
  } catch (err) {
    console.error('Disconnect failed:', err);
    throw err;
  }
};

/**
 * Signs a message with the connected wallet
 * @param {string} message - Message to sign
 * @returns {Promise<Object>} - Signed message response
 */
export const signMessage = async (message) => {
  try {
    const provider = getProvider();
    if (!provider) {
      throw new Error('Phantom wallet not installed');
    }

    if (!provider.isConnected) {
      throw new Error('Wallet not connected');
    }

    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
    
    console.log('Message signed successfully');
    return signedMessage;
  } catch (err) {
    console.error('Message signing failed:', err);
    throw err;
  }
};

/**
 * Verifies a signed message
 * @param {Uint8Array} signature - The signature to verify
 * @param {string} message - Original message
 * @param {string} publicKey - Public key of the signer
 * @returns {boolean} - True if signature is valid
 */
export const verifySignature = async (signature, message, publicKey) => {
  try {
    const nacl = await import('tweetnacl');
    const { PublicKey } = await import('@solana/web3.js');
    
    const messageBytes = new TextEncoder().encode(message);
    const publicKeyBytes = new PublicKey(publicKey).toBytes();
    
    return nacl.default.sign.detached.verify(messageBytes, signature, publicKeyBytes);
  } catch (err) {
    console.error('Signature verification failed:', err);
    return false;
  }
};