import React, { useEffect, useState } from "react";
import "../styles/Settings.css";
import axios from "axios";
import API_URL from "../../config/api";

const Settings = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
  });
  const [providers, setProviders] = useState({
    gemini: false,
    groq: false,
    githubModels: false,
    ollama: false,
  });
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/settings`);

      setSettings(response.data);
      const providerResponse = await axios.get(
        `${API_URL}/admin/settings/providers`,
      );

      setProviders(providerResponse.data);
      console.log("settings");
    } catch (error) {
      console.error(error);
    }
  };
  const updateSetting = async (key) => {
    const updated = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(updated);

    try {
      await axios.put(`${API_URL}/admin/settings`, updated);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-settings">
      <div className="settings-header">
        <h1>Settings</h1>

        <p>Manage platform configuration</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>Platform Settings</h3>

          <div className="setting-row">
            <span>Maintenance Mode</span>

            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={() => updateSetting("maintenanceMode")}
            />
          </div>

          <div className="setting-row">
            <span>User Registration</span>

            <input
              type="checkbox"
              checked={settings.userRegistration}
              onChange={() => updateSetting("userRegistration")}
            />
          </div>
        </div>

        {/* <div className="settings-card">
          <h3>Notifications</h3>

          <div className="setting-row">
            <span>Email Notifications</span>

            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div> 
        </div>*/}

        <div className="settings-card">
          <h3>AI Providers</h3>

          <div className="provider-box">
            <p>Gemini</p>
            <span>{providers.gemini ? "Active" : "Inactive"}</span>
          </div>

          <div className="provider-box">
            <p>Groq</p>
            <span>{providers.groq ? "Active" : "Inactive"}</span>
          </div>

          <div className="provider-box">
            <p>GitHub Models</p>
            <span>{providers.githubModels ? "Active" : "Inactive"}</span>
          </div>

          <div className="provider-box">
            <p>Ollama</p>
            <span>{providers.ollama ? "Active" : "Inactive"}</span>
          </div>
        </div>

        <div className="settings-card">
          <h3>System Information</h3>

          <p>Version: 1.0.0</p>

          <p>Environment: Production</p>

          <p>Last Deployment: Today</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
