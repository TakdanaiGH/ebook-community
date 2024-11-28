import React from 'react';
import ReactDOM from 'react-dom';
import ChatPage from '../components/ChatPage';

document.addEventListener('DOMContentLoaded', () => {
  const chatPageContainer = document.getElementById('chat-page-container');

  if (chatPageContainer) {
    const groupId = chatPageContainer.getAttribute('data-group-id');
    const groupName = chatPageContainer.getAttribute('data-group-name');
    const messagesJson = chatPageContainer.getAttribute('data-messages');
    const groupImageUrl = chatPageContainer.getAttribute('data-group-image-url'); // Ensure this attribute is set in the Rails view

    const currentUserId = window.currentUserId; // Access from global scope
    const currentUserName = window.currentUserName; // Access from global scope
    try {
      const messages = JSON.parse(messagesJson);

      ReactDOM.render(
        <ChatPage
          groupId={groupId}
          groupName={groupName}
          messages={messages}
          groupImageUrl={groupImageUrl}
          currentUserId={currentUserId} // Pass to React
          currentUserName={currentUserName}
        />,
        chatPageContainer
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
});


