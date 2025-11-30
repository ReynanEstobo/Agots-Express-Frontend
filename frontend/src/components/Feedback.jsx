import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchFeedback, respondToFeedback } from "../api/FeedbackAPI";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { DashboardHeader } from "../ui/DashboardHeader";
import { DashboardSidebar } from "../ui/DashboardSidebar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Textarea } from "../ui/Textarea";

const StatsCard = ({ title, value, icon: Icon, iconColor }) => {
  const gradientMap = {
    "bg-yellow-400": "bg-gradient-to-br from-yellow-400 to-yellow-300",
    "bg-blue-400": "bg-gradient-to-br from-blue-400 to-blue-300",
    "bg-green-500": "bg-gradient-to-br from-green-500 to-green-400",
  };
  const gradientClass = gradientMap[iconColor] || "bg-gray-400";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 relative flex items-start gap-4">
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-lg ${gradientClass} absolute -top-6 left-5 shadow-lg`}
      >
        {Icon && <Icon size={28} className="text-white" />}
      </div>
      <div className="flex-1 pl-20">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
};

export default function Feedback() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast: triggerToast } = useToast();

  // Fetch all feedback
  const loadFeedback = async () => {
    try {
      const data = await fetchFeedback();
      setFeedbackData(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  // Handle sending response
  const handleRespond = async () => {
    if (!responseText.trim()) return;

    try {
      const responder_id = 1; // Replace with actual admin/staff ID

      // Send response
      await respondToFeedback(
        selectedFeedback.feedback_id,
        responder_id,
        responseText
      );

      // Refetch feedback to get latest responses
      await loadFeedback();

      // Close modal and reset state
      setIsModalOpen(false);
      setSelectedFeedback(null);
      setResponseText("");

      triggerToast({ title: "Response sent" });
    } catch (err) {
      console.error(err);
      triggerToast({ title: "Failed to send response" });
    }
  };

  // Stats
  const avgRating =
    feedbackData.length > 0
      ? (
          feedbackData.reduce((acc, f) => acc + f.rating, 0) /
          feedbackData.length
        ).toFixed(1)
      : 0;
  const totalFeedback = feedbackData.length;
  const positiveCount = feedbackData.filter((f) => f.rating >= 4).length;

  const statsCards = [
    {
      title: "Average Rating",
      value: avgRating,
      icon: Star,
      iconColor: "bg-yellow-400",
    },
    {
      title: "Total Feedback",
      value: totalFeedback,
      icon: MessageSquare,
      iconColor: "bg-blue-400",
    },
    {
      title: "Positive Reviews",
      value: positiveCount,
      icon: ThumbsUp,
      iconColor: "bg-green-500",
    },
  ];

  return (
    <div className="pl-64 min-h-screen w-full bg-[#F4F6F9]">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Customer Feedback
            </h1>
            <p className="text-gray-500">
              Monitor and respond to customer reviews
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsCards.map((card, idx) => (
              <StatsCard key={idx} {...card} />
            ))}
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <Card
                key={feedback.feedback_id}
                className="hover:shadow-xl transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-lg font-semibold">
                        {feedback.customer_name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{feedback.customer_email}</span>
                        <span>•</span>
                        <span>Order: {feedback.order_id}</span>
                        <span>•</span>
                        <span>
                          {new Date(
                            feedback.feedback_created_at
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < feedback.rating
                              ? "fill-current text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 mt-3 mb-4">
                    {feedback.feedback_comment}
                  </p>

                  {/* Existing Response */}
                  {feedback.response_text && (
                    <div className="mb-3 p-3 bg-gray-100 rounded-md text-gray-700">
                      <strong>Response:</strong> {feedback.response_text}
                    </div>
                  )}

                  {/* Response Modal */}
                  <Dialog
                    open={
                      isModalOpen &&
                      selectedFeedback?.feedback_id === feedback.feedback_id
                    }
                    onOpenChange={setIsModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedFeedback(feedback);
                          setResponseText(feedback.response_text || "");
                          setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Respond
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Respond to Feedback</DialogTitle>
                      </DialogHeader>
                      <DialogClose asChild>
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                          X
                        </button>
                      </DialogClose>
                      <div className="space-y-4 mt-2">
                        <p className="font-medium">
                          {selectedFeedback?.customer_name}
                        </p>
                        <p className="text-sm">
                          {selectedFeedback?.feedback_comment}
                        </p>
                        <Textarea
                          placeholder="Type your response here..."
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          rows={4}
                        />
                        <Button
                          onClick={handleRespond}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Send Response
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
