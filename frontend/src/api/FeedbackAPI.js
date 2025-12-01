import axios from "axios";

const API_URL = "http://localhost:5000/api/feedback";

// Generic API request handler
const apiRequest = async (method, url, data = null) => {
  try {
    const config = { method, url, data };
    const response = await axios(config);
    return response.data;
  } catch (err) {
    console.error(
      `API Error (${method} ${url}):`,
      err.response?.data || err.message
    );
    throw new Error(err.response?.data?.message || "An error occurred");
  }
};

// Fetch all feedback along with SQL-calculated average rating
export const fetchFeedback = async () => {
  const data = await apiRequest("GET", API_URL);
  // Ensure proper structure: { feedback: [], avgRating: number }
  return {
    feedback: data.feedback || [],
    avgRating: Number(data.avgRating || 0),
  };
};

// Add or update response for a feedback
export const respondToFeedback = async (
  feedbackId,
  responderId,
  responseText
) => {
  if (!responseText.trim()) throw new Error("Response cannot be empty");

  const data = {
    responder_id: responderId,
    response: responseText,
  };

  return apiRequest("POST", `${API_URL}/${feedbackId}/respond`, data);
};
