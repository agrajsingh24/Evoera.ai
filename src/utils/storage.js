// src/utils/storage.js

// ---------- AUTHENTICATION ----------

// Run once when app starts to ensure default credentials exist
export const initializeDefaultUser = () => {
  const existingUsers = JSON.parse(localStorage.getItem("evora_users")) || [];

  const defaultUser = {
    email: "itzakshat706@gmail.com",
    password: "111111",
    username: "Akshat",
    ecoPoints: 0,
    badges: [],
    level: 1,
    watchedLessons: [],
  };

  // if user doesn’t exist already, add it
  const alreadyExists = existingUsers.some(
    (u) => u.email === defaultUser.email
  );

  if (!alreadyExists) {
    existingUsers.push(defaultUser);
    localStorage.setItem("evora_users", JSON.stringify(existingUsers));
  }
};

// Login function
export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("evora_users")) || [];
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("evora_loggedInUser", JSON.stringify(user));
    return { success: true, user };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("evora_loggedInUser");
};

// Get current logged in user
export const getLoggedInUser = () => {
  const user = localStorage.getItem("evora_loggedInUser");
  return user ? JSON.parse(user) : null;
};

export const getUserData = () => {
  const data = localStorage.getItem("evora_loggedInUser");
  return data ? JSON.parse(data) : null;
};

export const setUserData = (data) => {
  localStorage.setItem("evora_loggedInUser", JSON.stringify(data));
};

export const joinCampaign = (campaignId, ecoReward = 0) => {
  const user = getLoggedInUser();
  if (!user) return { success: false, message: "User not logged in" };

  const alreadyJoined = user.joinedCampaigns?.includes(campaignId);
  if (alreadyJoined) return { success: false, message: "Already joined this campaign" };

  const newJoined = [...(user.joinedCampaigns || []), campaignId];
  const updatedCoins = (user.ecoPoints || 0) + ecoReward;

  const updatedUser = updateLoggedInUser({
    joinedCampaigns: newJoined,
    ecoPoints: updatedCoins,
  });

  return { success: true, user: updatedUser };
};

export const updateUserStats = (newCoins, newExp) => {
  const user = getLoggedInUser();
  if (!user) return;

  user.ecoCoins = (user.ecoCoins || 0) + newCoins;
  user.exp = (user.exp || 0) + newExp;

  saveUser(user);
};


// ✅ Save joined campaign
export const joinChallenge = (campaignId) => {
  const user = getLoggedInUser();
  if (!user) return;

  user.joinChallenge = user.joinChallenge || [];
  if (!user.joinChallenge.includes(campaignId)) {
    user.joinChallenge.push(campaignId);
  }

  saveUser(user);
};

// ✅ Check if user already joined
export const hasJoinedChallenge = (campaignId) => {
  const user = getLoggedInUser();
  return user?.joinedChallenge?.includes(campaignId);
};

export const updateUserXP = (xpAmount) => {
  const user = getLoggedInUser();
  if (!user) return;

  user.ecoXP = (user.ecoXP || 0) + xpAmount;
  localStorage.setItem("evora_loggedInUser", JSON.stringify(user));
};

export const updateUserData = (updates) => {
  const user = getLoggedInUser();
  if (!user) return;

  const updated = { ...user, ...updates };
  localStorage.setItem("evora_loggedInUser", JSON.stringify(updated));
};

export const getUserField = (field, fallback = 0) => {
  const user = getLoggedInUser();
  return user?.[field] ?? fallback;
};