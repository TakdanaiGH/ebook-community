import React, { useState, useEffect } from "react";
import "./CommunityPage.css";

const CommunityPage = () => {
  const [showModal, setShowModal] = useState(false); // Show/hide modal
  const [newGroup, setNewGroup] = useState({ name: "", image: null }); // New group state
  const [previewImage, setPreviewImage] = useState(null); // Image preview for file input
  const [loading, setLoading] = useState(false); // To show loading state
  const [groups, setGroups] = useState([]); // State to store all groups
  const [joinedGroups, setJoinedGroups] = useState([]); // State to store the joined groups
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  useEffect(() => {
    // Fetch groups from the backend (All available groups)
    const fetchGroups = async () => {
      try {
        const response = await fetch("/groups");
        const data = await response.json();
        setGroups(data); // Update the state with the fetched groups
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    const fetchJoinedGroups = async () => {
      try {
        const response = await fetch("/joined_groups");
        const data = await response.json();
        setJoinedGroups(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching joined groups:", error);
      }
    };

    fetchGroups();
    fetchJoinedGroups(); // Fetch the joined groups
  }, []); // Empty dependency array to run once on component mount

  // Helper function to generate random color
  const getColorForGroup = (groupId) => {
    const letters = "0123456789ABCDEF";
    let hash = 0;

    // Generate a hash from the group ID
    for (let i = 0; i < groupId.length; i++) {
      hash = groupId.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash to a color
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.abs((hash >> (i * 4)) & 0xF)];
    }

    return color;
  };

  const closeModal = (e) => {
    if (e.target.className === "modal-overlay") {
      setShowModal(false);
    }
  };

  const handlePlusClick = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({ ...newGroup, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewGroup({ ...newGroup, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreviewImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("group[name]", newGroup.name);
    if (newGroup.image) {
      formData.append("group[image]", newGroup.image); // Send image file as part of the form data
    }
  
    try {
      const response = await fetch("/groups", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        },
      });
  
      // Check if the response is unauthorized (401)
      if (response.status === 401) {
        alert("You must be logged in to create a group.");
        return;
      }
  
      const data = await response.json();
  
      if (response.ok) {
        // Add the new group with the image URL to the groups list
        setGroups((prevGroups) => [
          ...prevGroups,
          {
            id: data.id,
            name: data.name,
            image_url: data.image_url, // Use image URL for displaying the image
          },
        ]);
        setShowModal(false); // Close modal after successful creation
        setNewGroup({ name: "", image: null });
        setPreviewImage(null);
      } else {
        alert(data.error || "Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const navigateToChat = (groupId) => {
    // Redirect to the chat page for the selected group
    window.location.href = `/groups/${groupId}/chat`;
  };

  const joinGroup = async (groupId) => {
    try {
      const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

      const response = await fetch("/join_group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ group_id: groupId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update state immediately after the group is joined
        const joinedGroup = {
          id: data.id,
          name: data.name,
          image_url: data.image_url, // Ensure image_url is included in the response
        };

        // Add the newly joined group to `joinedGroups`
        setJoinedGroups((prev) => [...prev, joinedGroup]);

        // Remove the group from `groups` list (so it's no longer available to join)
        setGroups((prev) => prev.filter((group) => group.id !== groupId));
      } else {
        console.error("Error joining group:", data.message || data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Filter groups based on the search query
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="community-page">
      {/* Header */}
      <header className="page-header">
        <h1>Join a Thriving Community of Book Lovers</h1>
      </header>
      {/* Sidebar - Showing joined groups */}
      <div className="sidebar">
        <h2 className="sidebar-header">My Groups</h2>

        {joinedGroups.length > 0 ? (
        <div className="joined-group-list">
          {joinedGroups.map((group) => (
            <div
              key={group.id}
              className="group-item"
              onClick={() => navigateToChat(group.id)}
            >
              <div
                className="group-avatar"
                style={{
                  backgroundColor: group.image_url
                    ? "transparent"
                    : getColorForGroup(group.id.toString()),
                }}
              >
                {group.image_url ? (
                  <img src={group.image_url} alt={group.name} className="group-avatar-img" />
                ) : (
                  <span className="group-avatar-text">
                    {group.name ? group.name.charAt(0) : "?"}
                  </span>
                )}
              </div>
              <h3>{group.name} ({group.member_count} members)</h3> {/* Show the member count here */}
            </div>
          ))}
        </div>
      ) : (
        <p>No joined groups yet.</p>
      )}


        <div className="joined-group add-group" onClick={handlePlusClick}>
          <span>+</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="community-groups">

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Groups"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

          <div className="groups-list">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <div key={group.id} className="group-card">
                <div className="group-avatar-container">
                  <div
                    className="group-avatar"
                    style={{
                      backgroundColor: group.image_url
                        ? "transparent"
                        : getColorForGroup(group.id.toString()),
                    }}
                  >
                    {group.image_url ? (
                      <img
                        src={group.image_url}
                        alt={group.name}
                        className="group-avatar-img"
                      />
                    ) : (
                      <span className="group-avatar-text">
                        {group.name ? group.name.charAt(0) : "?"}
                      </span>
                    )}
                  </div>
                </div>
        
                <h3 className="group-name">{group.name}</h3>
                <p>({group.member_count} members)</p> {/* Display the member count here */}
        
                <button onClick={() => joinGroup(group.id)} className="join-group-button">
                  Join
                </button>
              </div>
            ))
          ) : (
            <p>No groups found</p>
          )}
        </div>



        <button className="add-group-button" onClick={handlePlusClick}>
          +
        </button>
      </div>

      {/* Modal for adding a new group */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="image-upload-section">
                  <label htmlFor="group-image" className="camera-circle">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="preview-image" />
                    ) : (
                      <div className="camera-icon">📷</div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="group-image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>

                <label className="group-name-label">
                  Group name
                  <input
                    type="text"
                    name="name"
                    value={newGroup.name}
                    onChange={handleInputChange}
                    placeholder="Enter group name"
                    required
                  />
                </label>
              </div>

              <div className="modal-buttons">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="next-button" disabled={loading}>
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
