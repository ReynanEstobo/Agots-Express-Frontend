import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchOrderFeedback, submitFeedback } from "../api/CustomerAPI";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Textarea } from "../ui/Textarea";

export function ProvideOrderFeedback({ orderId }) {
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [adminResponse, setAdminResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const res = await fetchOrderFeedback(orderId);
        if (res.success && res.data) {
          const { rating, comment, response } = res.data;
          setRating(rating || 0);
          setComment(comment || "");
          setAdminResponse(response || "");
          setSubmitted(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadFeedback();
  }, [orderId]);

  const handleSubmit = async () => {
    if (rating === 0) {
      addToast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await submitFeedback(orderId, rating, comment);
      if (res.success) {
        addToast({
          title: "Feedback Submitted",
          description: "Thank you for your feedback!",
        });
        setSubmitted(true);
        setAdminResponse(res.data.response || "");
      } else {
        addToast({
          title: "Error",
          description: res.message || "Failed to submit feedback",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      addToast({
        title: "Error",
        description: "Server error while submitting feedback",
        variant: "destructive",
      });
    }
  };

  const renderStars = (score, size = 6) => (
    <div className="flex gap-1 justify-center mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-${size} w-${size} ${
            star <= score ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!submitted ? (
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all shadow-md rounded-lg">
            Give Feedback
          </Button>
        </DialogTrigger>
      ) : (
        <div className="p-4 rounded-xl bg-blue-50 shadow-md w-72 mx-auto text-center">
          <p className="font-semibold text-lg mb-2">Your Feedback</p>
          {renderStars(rating, 7)}
          {comment && (
            <p className="mt-2 text-gray-700 italic text-sm">"{comment}"</p>
          )}
          {adminResponse && (
            <p className="mt-3 text-blue-800 text-sm bg-blue-100 p-2 rounded-lg shadow-sm">
              <span className="font-medium">Admin Response:</span> "
              {adminResponse}"
            </p>
          )}
        </div>
      )}

      {!submitted && (
        <DialogContent className="sm:max-w-lg sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Rate Your Order
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 pt-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Order ID: {orderId}</p>
              <p className="text-base font-medium mb-3">
                How was your experience?
              </p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-125"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Additional Comments (Optional)
              </label>
              <Textarea
                placeholder="Tell us about your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 rounded-lg shadow-sm"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600 transition-all rounded-lg shadow-md"
            >
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
