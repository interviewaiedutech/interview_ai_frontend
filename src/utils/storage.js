// src/utils/storage.js

// =====================================================
// Centralized Local Storage Manager
// =====================================================

export const STORAGE_KEYS = {
  MOCK_INTERVIEW: "mockInterview",
  COMMUNICATION: "communicationPractice",
  EMAIL: "emailPractice",
  APTITUDE: "aptitudePractice",
  JD_PREP: "jdPrepSession",
  READING: "readingPractice",
  USER_PROGRESS: "userProgress",
  AUTH_USER: "user",
  AUTH_TOKEN: "token",
};

// =====================================================
// Main Storage Functions
// =====================================================

export const storage = {
  // Save Data
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage Save Error:", error);
    }
  },

  // Get Data
  get: (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(key);

      if (!data) {
        return defaultValue;
      }

      return JSON.parse(data);
    } catch (error) {
      console.error("Storage Get Error:", error);

      return defaultValue;
    }
  },

  // Remove Single Item
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Storage Remove Error:", error);
    }
  },

  // Clear All Interview Related Sessions
  clearAllPracticeSessions: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.MOCK_INTERVIEW);

      localStorage.removeItem(STORAGE_KEYS.COMMUNICATION);

      localStorage.removeItem(STORAGE_KEYS.EMAIL);

      localStorage.removeItem(STORAGE_KEYS.APTITUDE);

      localStorage.removeItem(STORAGE_KEYS.READING);
    } catch (error) {
      console.error("Storage Clear Error:", error);
    }
  },

  // Clear Entire Local Storage
  clearAll: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Storage Clear All Error:", error);
    }
  },
};

// =====================================================
// Helper Functions
// =====================================================

// Save Mock Interview Session
export const saveMockInterviewSession = (data) => {
  storage.set(STORAGE_KEYS.MOCK_INTERVIEW, data);
};

// Get Mock Interview Session
export const getMockInterviewSession = () => {
  return storage.get(STORAGE_KEYS.MOCK_INTERVIEW, null);
};

// Remove Mock Interview Session
export const clearMockInterviewSession = () => {
  storage.remove(STORAGE_KEYS.MOCK_INTERVIEW);
};

// =====================================================

// Save Communication Session
export const saveCommunicationSession = (data) => {
  storage.set(STORAGE_KEYS.COMMUNICATION, data);
};

// Get Communication Session
export const getCommunicationSession = () => {
  return storage.get(STORAGE_KEYS.COMMUNICATION, null);
};

// Remove Communication Session
export const clearCommunicationSession = () => {
  storage.remove(STORAGE_KEYS.COMMUNICATION);
};

// =====================================================

// Save Email Practice Session
export const saveEmailSession = (data) => {
  storage.set(STORAGE_KEYS.EMAIL, data);
};

// Get Email Practice Session
export const getEmailSession = () => {
  return storage.get(STORAGE_KEYS.EMAIL, null);
};

// Remove Email Practice Session
export const clearEmailSession = () => {
  storage.remove(STORAGE_KEYS.EMAIL);
};

// =====================================================

// Save Aptitude Session
export const saveAptitudeSession = (data) => {
  storage.set(STORAGE_KEYS.APTITUDE, data);
};

// Get Aptitude Session
export const getAptitudeSession = () => {
  return storage.get(STORAGE_KEYS.APTITUDE, null);
};

// Remove Aptitude Session
export const clearAptitudeSession = () => {
  storage.remove(STORAGE_KEYS.APTITUDE);
};

// =====================================================

// Save JD Prep Session
export const saveJDPrepSession = (data) => {
  storage.set(STORAGE_KEYS.JD_PREP, data);
};

// Get JD Prep Session
export const getJDPrepSession = () => {
  return storage.get(STORAGE_KEYS.JD_PREP, null);
};

// Clear JD Prep Session
export const clearJDPrepSession = () => {
  storage.remove(STORAGE_KEYS.JD_PREP);
};
// =====================================================

// Save IELTS Reading Session
export const saveReadingSession = (data) => {
  storage.set(STORAGE_KEYS.READING, data);
};

// Get IELTS Reading Session
export const getReadingSession = () => {
  return storage.get(STORAGE_KEYS.READING, null);
};

// Remove IELTS Reading Session
export const clearReadingSession = () => {
  storage.remove(STORAGE_KEYS.READING);
};
