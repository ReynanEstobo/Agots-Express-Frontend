import { MessageSquare, Star } from "lucide-react";
import { useState } from "react";
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
  const { addToast } = useToast(); // <-- use the hook here
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      addToast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    addToast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We appreciate it.",
    });

    setRating(0);
    setComment("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Give Feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Your Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Order: {orderId}
            </p>
            <p className="text-sm font-medium mb-3">
              How would you rate your experience?
            </p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoveredRating || rating)
                        ? "fill-accent text-accent"
                        : "text-muted"
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
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full bg-accent hover:bg-accent/90"
          >
            Submit Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
