import React, { useState, useEffect } from 'react';
import './ChatPage.css';

const ChatPage = ({ groupId, groupName, groupImageUrl, groupColor, currentUserId, currentUserName }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch messages for the group
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/groups/${groupId}/messages`);
        if (response.ok) {
          const messagesData = await response.json();
          setMessages(messagesData);
        } else {
          console.error('Error fetching messages:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [groupId]);

  // Fetch group members when the component mounts
  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await fetch(`/groups/${groupId}/members`);
        if (response.ok) {
          const membersData = await response.json();
          setGroupMembers(membersData);
        } else {
          console.error('Error fetching group members:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch group members:', error);
      }
    };

    fetchGroupMembers();
  }, [groupId]);

  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userName = currentUserName || "Unknown User";

    const response = await fetch(`/groups/${groupId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
      },
      body: JSON.stringify({
        message: { 
          content: message,
          name: userName,
        }
      }),
    });

    if (response.ok) {
      const newMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } else {
      console.error('Error sending message:', await response.json());
    }

    setMessage('');
  };

  const handleLeaveGroup = async () => {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    try {
      const response = await fetch(`/groups/${groupId}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ group_id: groupId, user_id: currentUserId }),
      });

      if (response.ok) {
        alert('You have left the group.');
        window.location.href = '/';
      } else {
        console.error('Error leaving group:', await response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Close modal when clicking the background (overlay)
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('members-modal-overlay')) {
      setIsModalOpen(false);
    }
  };
  
  return (
    <div className="chat-page" style={{ borderTopColor: groupColor }}>
      {/* Header with circular group image */}
      <div className="chat-header" style={{ backgroundColor: groupColor }} onClick={toggleModal}>
        <div className="group-avatar">
          {groupImageUrl ? (
            <img src={groupImageUrl} alt={groupName} className="group-avatar-img" />
          ) : (
            <div className="group-avatar-placeholder" style={{ backgroundColor: groupColor }}>
              {groupName && groupName.charAt(0)}
            </div>
          )}
        </div>
        <h1 className="group-name">{groupName}</h1>
      </div>

      {/* Group Members Modal */}
      {isModalOpen && (
        <div className="members-modal-overlay" onClick={handleOverlayClick}>
          <div className="members-modal">
            <div className="modal-content">
              <h2>{groupName} Members</h2>
              <div className="members-list">
                {groupMembers.length > 0 ? (
                  groupMembers.map((member) => (
                    <div key={member.id} className="member-item">
                      {member.profile_picture_url ? (
                        <img
                          src={member.profile_picture_url}
                          alt={member.name}
                          className="profile-pic"
                        />
                      ) : (
                        <div
                          className="profile-pic"
                          style={{ backgroundColor: '#ccc' }} // Default background color
                        />
                      )}
                      <strong>{member.name}</strong>
                    </div>
                  ))
                ) : (
                  <p>No members found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="messages">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${
                msg.user_id === currentUserId ? 'message-right' : 'message-left'
              }`}
            >
              {msg.user_id !== currentUserId && (
                <div className="message-meta">
                  {msg.profile_picture_url.startsWith("#") ? (
                    <div
                      className="profile-pic"
                      style={{ backgroundColor: msg.profile_picture_url }}
                    />
                  ) : (
                    <img
                      src={msg.profile_picture_url}
                      alt={`${msg.name}'s profile`}
                      className="profile-pic"
                    />
                  )}
                  <strong>{msg.name}</strong>
                </div>
              )}
              <div className="message-content">
                <p>{msg.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className = "NoM">No messages yet. Be the first to send a message!</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          rows="1"
        />
        <button type="submit">Send</button>
      </form>

      <button className="leave-group-button" onClick={handleLeaveGroup}>
        Leave Group
      </button>
    </div>
  );
};

export default ChatPage;
