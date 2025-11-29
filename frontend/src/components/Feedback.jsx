import { AlertCircle, MessageSquare, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "../hooks/use-toast"; // make sure this exists
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { DashboardHeader } from "../ui/DashboardHeader";
import { DashboardSidebar } from "../ui/DashboardSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Textarea } from "../ui/Textarea";

// Sample feedback data
const feedbackData = [
  {
    id: 1,
    customer: "Juan Dela Cruz",
    email: "juan@email.com",
    rating: 5,
    comment: "Excellent food quality and fast delivery!",
    date: "2024-03-15",
    status: "resolved",
    orderId: "ORD-001",
  },
  {
    id: 2,
    customer: "Maria Santos",
    email: "maria@email.com",
    rating: 4,
    comment: "Good food but delivery took longer than expected.",
    date: "2024-03-14",
    status: "pending",
    orderId: "ORD-002",
  },
  {
    id: 3,
    customer: "Pedro Reyes",
    email: "pedro@email.com",
    rating: 5,
    comment: "Best Filipino restaurant! Love the authentic taste.",
    date: "2024-03-13",
    status: "resolved",
    orderId: "ORD-003",
  },
];

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState("");
  const { toast: triggerToast } = useToast();

  // Handle sending response
  const handleRespond = () => {
    if (!response.trim()) return;
    triggerToast({
      title: "Response Sent",
      description: `Your response has been sent to ${selectedFeedback.customer}`,
    });
    setResponse("");
    setSelectedFeedback(null);
  };

  // Helper for rating color
  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  // Helper for status badge
  const getStatusBadge = (status) => {
    return status === "resolved" ? (
      <Badge className="bg-green-500 text-white">Resolved</Badge>
    ) : (
      <Badge className="bg-yellow-300 text-black">Pending</Badge>
    );
  };

  // Stats calculations
  const avgRating = (
    feedbackData.reduce((acc, f) => acc + f.rating, 0) / feedbackData.length
  ).toFixed(1);
  const totalFeedback = feedbackData.length;
  const pendingCount = feedbackData.filter(
    (f) => f.status === "pending"
  ).length;

  return (
    <div className="pl-64 min-h-screen w-full bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Customer Feedback
            </h1>
            <p className="text-gray-500">
              Monitor and respond to customer reviews
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Average Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {avgRating}
                </div>
                <p className="text-xs text-gray-500 mt-1">Out of 5.0</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Total Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700">
                  {totalFeedback}
                </div>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">
                  {pendingCount}
                </div>
                <p className="text-xs text-gray-500 mt-1">Needs attention</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Positive Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">
                  {feedbackData.filter((f) => f.rating >= 4).length}
                </div>
                <p className="text-xs text-gray-500 mt-1">4+ stars</p>
              </CardContent>
            </Card>
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {feedbackData.map((feedback) => (
              <Card
                key={feedback.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">
                          {feedback.customer}
                        </CardTitle>
                        {getStatusBadge(feedback.status)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{feedback.email}</span>
                        <span>•</span>
                        <span>Order: {feedback.orderId}</span>
                        <span>•</span>
                        <span>{feedback.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < feedback.rating
                              ? `fill-current ${getRatingColor(
                                  feedback.rating
                                )}`
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feedback.comment}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedFeedback(feedback)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Respond
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Respond to Feedback</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Customer:
                          </p>
                          <p className="font-medium">
                            {selectedFeedback?.customer}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Original Feedback:
                          </p>
                          <p className="text-sm">{selectedFeedback?.comment}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Your Response:
                          </label>
                          <Textarea
                            placeholder="Type your response here..."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <Button
                          onClick={handleRespond}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Send Response
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;
