# Phantom Wallet Authentication

A React application that demonstrates Phantom wallet authentication by connecting to the wallet and signing messages to verify ownership.

## Features

- 🔐 **Wallet Connection**: Connect to Phantom wallet seamlessly
- ✍️ **Message Signing**: Sign custom messages to verify wallet ownership
- 🔍 **Signature Verification**: Verify signed messages using cryptographic verification
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Clean, gradient-based design with smooth animations
- ⚡ **Real-time Status**: Live connection and authentication status updates

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** installed (version 14 or higher)
2. **Phantom Wallet** browser extension installed ([Download here](https://phantom.app/))
3. A Solana wallet with some SOL (for testing purposes)

## Installation

1. **Clone or download** this project to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd Auth
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser** and go to `http://localhost:3000`

## How It Works

### 1. Wallet Detection
The app automatically detects if Phantom wallet is installed in your browser. If not, it provides a link to install it.

### 2. Connection Process
- Click "Connect Wallet" button
- Phantom wallet popup will appear
- Approve the connection request
- Your wallet address will be displayed

### 3. Authentication Process
- Click "Sign Message" button
- Phantom will show a message signing prompt
- Sign the message to authenticate
- The signature is verified cryptographically
- Success message appears upon verification

### 4. Security Features
- **Message Signing**: Uses Ed25519 cryptographic signatures
- **Signature Verification**: Validates signatures using the tweetnacl library
- **No Private Key Exposure**: Private keys never leave the Phantom wallet
- **User Control**: Users can disconnect at any time

## Technical Implementation

### Key Components

1. **Phantom Utilities** (`src/utils/phantom.js`):
   - `getProvider()`: Detects Phantom wallet installation
   - `connectWallet()`: Establishes connection with wallet
   - `signMessage()`: Signs custom messages
   - `verifySignature()`: Cryptographically verifies signatures

2. **React App** (`src/App.js`):
   - State management for connection and authentication
   - Event listeners for wallet events
   - User interface components

3. **Styling** (`src/App.css`):
   - Modern gradient design
   - Responsive layout
   - Smooth animations and transitions

### Dependencies

- **React**: Frontend framework
- **@solana/web3.js**: Solana blockchain interactions
- **tweetnacl**: Cryptographic signature verification

## Wallet Events Handled

- `connect`: When wallet connects
- `disconnect`: When wallet disconnects
- `accountChanged`: When user switches accounts

## Error Handling

The application handles various error scenarios:
- Wallet not installed
- User rejection of connection/signing
- Network errors
- Signature verification failures

## Security Considerations

- Private keys never leave the Phantom wallet
- Messages are signed using Ed25519 cryptography
- Signatures are verified client-side using established cryptographic libraries
- No sensitive data is stored in the application

## Browser Compatibility

This application works with:
- Chrome/Chromium browsers with Phantom extension
- Firefox with Phantom extension
- Brave browser with Phantom extension
- Edge browser with Phantom extension

## Development

To modify or extend this application:

1. **Add new features** in `src/App.js`
2. **Modify wallet utilities** in `src/utils/phantom.js`
3. **Update styling** in `src/App.css`
4. **Test thoroughly** with Phantom wallet

## Troubleshooting

### Common Issues

1. **"Phantom wallet not found"**:
   - Install Phantom browser extension
   - Refresh the page after installation

2. **Connection rejected**:
   - Make sure you approve the connection in Phantom popup
   - Check if Phantom is unlocked

3. **Signing fails**:
   - Ensure wallet is connected
   - Check if you have sufficient permissions

4. **Page doesn't load**:
   - Make sure all dependencies are installed (`npm install`)
   - Check if port 3000 is available

## References

- [Phantom Developer Documentation](https://docs.phantom.com/)
- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [TweetNaCl Cryptography Library](https://tweetnacl.js.org/)

## License

This project is for educational purposes and demonstration of Phantom wallet integration.

---

Built with ❤️ using React and Phantom Wallet APIs