import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  MessageCircle, 
  Mail, 
  MessageSquare, 
  Phone, 
  Plus,
  Play,
  Pause,
  Eye,
  Trash2,
  X
} from 'lucide-react';
import './AiComm.css';

interface SubContact {
  id: number;
  name: string;
  number: string;
  platforms: string[];
  aiMode: string;
  status: 'Active' | 'Paused';
  lastActive: string;
}

interface Contact {
  id: number;
  name: string;
  subContacts: SubContact[];
  isExpanded?: boolean;
}

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  message: string;
  time: string;
}

const AiComm: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { 
      id: 1, 
      name: "Satoshi Nakamoto",
      isExpanded: false,
      subContacts: [
        {
          id: 101,
          name: "Client 1",
          number: "+1-555-0123",
          platforms: ["WhatsApp", "Gmail"],
          aiMode: "Professional",
          status: "Active",
          lastActive: "2 mins ago"
        },
        {
          id: 102,
          name: "Adhivesh Crypto",
          number: "+91-9876543210",
          platforms: ["WhatsApp", "Telegram"],
          aiMode: "Friendly",
          status: "Active",
          lastActive: "15 mins ago"
        },
        {
          id: 103,
          name: "Blockchain Dev",
          number: "dev@crypto.com",
          platforms: ["Gmail", "SMS"],
          aiMode: "Professional",
          status: "Paused",
          lastActive: "1 hour ago"
        }
      ]
    },
    { 
      id: 2, 
      name: "Tirth Chudasama",
      isExpanded: false,
      subContacts: [
        {
          id: 201,
          name: "Business Partner",
          number: "+91-9988776655",
          platforms: ["WhatsApp", "Gmail"],
          aiMode: "Professional",
          status: "Active",
          lastActive: "5 mins ago"
        },
        {
          id: 202,
          name: "Tech Team Lead",
          number: "+91-8877665544",
          platforms: ["WhatsApp", "Telegram", "SMS"],
          aiMode: "Friendly",
          status: "Active",
          lastActive: "12 mins ago"
        },
        {
          id: 203,
          name: "Project Manager",
          number: "pm@project.com",
          platforms: ["Gmail", "WhatsApp"],
          aiMode: "Minimal",
          status: "Active",
          lastActive: "30 mins ago"
        }
      ]
    },
    { 
      id: 3, 
      name: "Vitalik Buterin",
      isExpanded: false,
      subContacts: [
        {
          id: 301,
          name: "Ethereum Dev",
          number: "+1-555-ETH1",
          platforms: ["Telegram", "Gmail"],
          aiMode: "Professional",
          status: "Active",
          lastActive: "8 mins ago"
        },
        {
          id: 302,
          name: "Smart Contract Auditor",
          number: "audit@ethereum.org",
          platforms: ["Gmail", "SMS"],
          aiMode: "Urgent",
          status: "Active",
          lastActive: "22 mins ago"
        }
      ]
    },
    { 
      id: 4, 
      name: "Changpeng Zhao",
      isExpanded: false,
      subContacts: [
        {
          id: 401,
          name: "Binance Support",
          number: "support@binance.com",
          platforms: ["Gmail", "WhatsApp"],
          aiMode: "Professional",
          status: "Active",
          lastActive: "1 hour ago"
        },
        {
          id: 402,
          name: "Trading Team",
          number: "+65-9123-4567",
          platforms: ["Telegram", "SMS"],
          aiMode: "Minimal",
          status: "Paused",
          lastActive: "3 hours ago"
        }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showChatPreview, setShowChatPreview] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<SubContact | null>(null);
  const [selectedMainContact, setSelectedMainContact] = useState<Contact | null>(null);
  const [aiMasterStatus, setAiMasterStatus] = useState(true);

  const [newSubContact, setNewSubContact] = useState({
    name: '',
    number: '',
    platforms: [] as string[],
    aiMode: 'Friendly'
  });

  const mockChatMessages: ChatMessage[] = [
    { id: 1, sender: 'user', message: 'What are your business hours?', time: '2:30 PM' },
    { id: 2, sender: 'ai', message: 'Hello! Our business is open Monday-Friday 9AM-6PM. How can I assist you today? 💼', time: '2:31 PM' },
    { id: 3, sender: 'user', message: 'I need information about your services.', time: '2:32 PM' },
    { id: 4, sender: 'ai', message: 'I\'d be happy to help! I\'ll connect you with our sales team shortly. �', time: '2:33 PM' },
  ];

  const platformIcons = {
    WhatsApp: MessageCircle,
    Gmail: Mail,
    SMS: MessageSquare,
    Telegram: MessageCircle,
    Calls: Phone
  };

  const aiModes = [
    { value: 'Friendly', description: '🤖 Friendly — casual tone, emoji use' },
    { value: 'Professional', description: '💼 Professional — formal, concise replies' },
    { value: 'Funny', description: '😂 Funny — adds humor' },
    { value: 'Minimal', description: '🧘 Minimal — one-line or emoji replies' },
    { value: 'Urgent', description: '🚨 Urgent — immediate priority responses' }
  ];

  const [selectedParentId, setSelectedParentId] = useState<number>(1);

  const handleAddSubContact = () => {
    if (newSubContact.name && newSubContact.number && newSubContact.platforms.length > 0) {
      const subContact: SubContact = {
        id: Date.now(),
        ...newSubContact,
        status: 'Active',
        lastActive: 'Just now'
      };
      
      setContacts(contacts.map(contact => 
        contact.id === selectedParentId 
          ? { ...contact, subContacts: [...contact.subContacts, subContact] }
          : contact
      ));
      
      setNewSubContact({ name: '', number: '', platforms: [], aiMode: 'Friendly' });
      setShowAddForm(false);
    }
  };

  const openContactsModal = (contact: Contact) => {
    setSelectedMainContact(contact);
    setShowContactsModal(true);
  };

  const toggleSubContactStatus = (contactId: number, subContactId: number) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId 
        ? { 
            ...contact, 
            subContacts: contact.subContacts.map(subContact =>
              subContact.id === subContactId
                ? { ...subContact, status: subContact.status === 'Active' ? 'Paused' : 'Active' }
                : subContact
            )
          }
        : contact
    ));
  };

  const deleteSubContact = (contactId: number, subContactId: number) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId 
        ? { 
            ...contact, 
            subContacts: contact.subContacts.filter(sub => sub.id !== subContactId)
          }
        : contact
    ));
  };

  const handlePlatformToggle = (platform: string) => {
    setNewSubContact(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p: string) => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const openChatPreview = (subContact: SubContact) => {
    setSelectedContact(subContact);
    setShowChatPreview(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="ai-comm-page"
    >
      <div className="page-header">
        <h1 className="page-title">🤖 AI Communication Center</h1>
        <p className="page-subtitle">Manage AI auto-replies across platforms</p>
      </div>

      {/* AI Master Status Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="ai-status-banner"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className={`status-indicator ${aiMasterStatus ? 'active' : 'inactive'}`}
            animate={aiMasterStatus ? { 
              boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0.7)", "0 0 0 10px rgba(16, 185, 129, 0)"]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div>
            <p className="status-text">
              AI Auto-Response: <strong>{aiMasterStatus ? 'Enabled (Holiday Mode)' : 'Disabled'}</strong>
            </p>
            <p className="status-subtext">{contacts.reduce((count, c) => count + c.subContacts.filter(sub => sub.status === 'Active').length, 0)} channels online</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAiMasterStatus(!aiMasterStatus)}
          className="toggle-button"
        >
          {aiMasterStatus ? 'Disable' : 'Enable'}
        </motion.button>
      </motion.div>

      {/* Add Contact Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="add-contact-section"
      >
        {!showAddForm ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(true)}
            className="add-contact-button"
          >
            <Plus size={20} />
            Add New Contact
          </motion.button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="add-contact-form"
          >
            <div className="form-header">
              <h3>Add New Contact</h3>
              <button onClick={() => setShowAddForm(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Parent Contact</label>
                <select
                  value={selectedParentId}
                  onChange={(e) => setSelectedParentId(Number(e.target.value))}
                  className="form-input"
                >
                  {contacts.map(contact => (
                    <option key={contact.id} value={contact.id}>
                      {contact.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={newSubContact.name}
                  onChange={(e) => setNewSubContact({...newSubContact, name: e.target.value})}
                  placeholder="Contact name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Phone / Email</label>
                <input
                  type="text"
                  value={newSubContact.number}
                  onChange={(e) => setNewSubContact({...newSubContact, number: e.target.value})}
                  placeholder="+91 or email@domain.com"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Platforms</label>
                <div className="platform-selector">
                  {Object.keys(platformIcons).map(platform => {
                    const Icon = platformIcons[platform as keyof typeof platformIcons];
                    return (
                      <motion.button
                        key={platform}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => handlePlatformToggle(platform)}
                        className={`platform-button ${newSubContact.platforms.includes(platform) ? 'selected' : ''}`}
                      >
                        <Icon size={16} />
                        {platform}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label>AI Mode</label>
                <select
                  value={newSubContact.aiMode}
                  onChange={(e) => setNewSubContact({...newSubContact, aiMode: e.target.value})}
                  className="form-input"
                >
                  {aiModes.map(mode => (
                    <option key={mode.value} value={mode.value}>
                      {mode.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddSubContact}
                className="submit-button"
              >
                Add Contact
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Hierarchical Contacts */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="contacts-hierarchy"
      >
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 70 }}
            className="contact-group"
          >
            {/* Main Contact Header */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`contact-header-main ${contact.isExpanded ? 'expanded' : ''}`}
            >
              <div className="contact-main-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="contact-main-info">
                <h3 className="contact-main-name">{contact.name}</h3>
                <span className="sub-contacts-count">
                  {contact.subContacts.filter(sub => sub.status === 'Active').length} active
                </span>
              </div>
              
              <button 
                className="expand-button"
                onClick={() => openContactsModal(contact)}
              >
                View Contacts
                <span className="expand-icon">▶</span>
              </button>
            </motion.div>


          </motion.div>
        ))}
      </motion.div>

      {/* AI Mode Reference Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="ai-modes-reference"
      >
        <h3>AI Mode Reference</h3>
        <div className="modes-grid">
          {aiModes.map(mode => (
            <div key={mode.value} className="mode-item">
              {mode.description}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Chat Preview Modal */}
      <AnimatePresence>
        {showChatPreview && selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="chat-preview-overlay"
            onClick={() => setShowChatPreview(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="chat-preview-panel"
              onClick={e => e.stopPropagation()}
            >
              <div className="chat-header">
                <div className="chat-contact-info">
                  <h3>{selectedContact.name}</h3>
                  <p>{selectedContact.platforms.join(', ')}</p>
                </div>
                <button
                  onClick={() => setShowChatPreview(false)}
                  className="close-chat"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="chat-messages">
                {mockChatMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className={`chat-message ${message.sender}`}
                  >
                    <div className="message-bubble">
                      {message.message}
                    </div>
                    <div className="message-time">
                      {message.time}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="chat-footer">
                <p>🤖 AI Auto-Response Active</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contacts Modal */}
      <AnimatePresence>
        {showContactsModal && selectedMainContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setShowContactsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              className="contacts-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{selectedMainContact.name} - Contacts</h3>
                <button 
                  className="close-modal"
                  onClick={() => setShowContactsModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content">
                <div className="sub-contacts-grid">
                  {selectedMainContact.subContacts.map((subContact, subIndex) => (
                    <motion.div
                      key={subContact.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: subIndex * 0.1 }}
                      whileHover={{ y: -4 }}
                      className={`sub-contact-card ${subContact.status.toLowerCase()}`}
                    >
                      <div className={`status-badge ${subContact.status.toLowerCase()}`}></div>
                      
                      <div className="sub-contact-header">
                        <div className="sub-contact-avatar">
                          {subContact.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="sub-contact-info">
                          <h4 className="sub-contact-name">{subContact.name}</h4>
                          <p className="sub-contact-number">{subContact.number}</p>
                        </div>
                      </div>

                      <div className="sub-contact-details">
                        <div className="platforms">
                          <span className="detail-label">Platforms:</span>
                          <div className="platform-badges">
                            {subContact.platforms.map(platform => {
                              const Icon = platformIcons[platform as keyof typeof platformIcons];
                              return (
                                <motion.span
                                  key={platform}
                                  whileHover={{ scale: 1.05 }}
                                  className="platform-badge"
                                >
                                  <Icon size={12} />
                                  {platform}
                                </motion.span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="ai-mode">
                          <span className="detail-label">AI Mode:</span>
                          <span className="ai-mode-value">{subContact.aiMode}</span>
                        </div>

                        <div className="last-active">
                          <span className="detail-label">Last Active:</span>
                          <span className="last-active-value">{subContact.lastActive}</span>
                        </div>
                      </div>

                      <div className="sub-contact-actions">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSubContactStatus(selectedMainContact.id, subContact.id)}
                          className={`action-button ${subContact.status === 'Active' ? 'pause' : 'play'}`}
                        >
                          {subContact.status === 'Active' ? <Pause size={14} /> : <Play size={14} />}
                          {subContact.status === 'Active' ? 'Pause' : 'Resume'}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openChatPreview(subContact)}
                          className="action-button preview"
                        >
                          <Eye size={14} />
                          Preview
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => deleteSubContact(selectedMainContact.id, subContact.id)}
                          className="action-button delete"
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AiComm;