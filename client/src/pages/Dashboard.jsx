import React, { useState } from "react";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Navigation */}
        <div className="col-3">
          <div className="nav flex-column nav-pills" role="tablist">
            <button
              className={`nav-link ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
            <button
              className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`nav-link ${activeTab === "messages" ? "active" : ""}`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
            <button
              className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Right Tab Content */}
        <div className="col-9">
          <div className="tab-content">
            {/* Home Tab */}
            <div
              className={`tab-pane fade ${
                activeTab === "home" ? "show active" : ""
              }`}
            >
              <h2>Welcome Home</h2>
              <p>This is the home tab content. You can put any HTML here.</p>
            </div>

            {/* Profile Tab */}
            <div
              className={`tab-pane fade ${
                activeTab === "profile" ? "show active" : ""
              }`}
            >
              <h2>User Profile</h2>
              <p>Profile details and form go here.</p>
            </div>

            {/* Messages Tab */}
            <div
              className={`tab-pane fade ${
                activeTab === "messages" ? "show active" : ""
              }`}
            >
              <h2>Messages</h2>
              <ul>
                <li>Message 1</li>
                <li>Message 2</li>
              </ul>
            </div>

            {/* Settings Tab */}
            <div
              className={`tab-pane fade ${
                activeTab === "settings" ? "show active" : ""
              }`}
            >
              <h2>Settings</h2>
              <p>Change your preferences here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
