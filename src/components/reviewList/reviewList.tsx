"use client";
import { useEffect, useState } from "react";
import { getReviewsByUserId } from "@/data/server-data";
import { supabase } from "@/lib/supabaseClient";
import "./reviewList.css";

export default function UserReviewsTable({ userId }: { userId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    fetchReviews();
  }, [userId]);

  async function fetchReviews() {
    try {
      const data = await getReviewsByUserId(userId);
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch user reviews:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete review.");
    }
  }

  function startEdit(review: any) {
    setEditingReview(review.id);
    setEditForm({ rating: review.rating, comment: review.comment });
  }

  async function handleUpdate(id: string) {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ rating: editForm.rating, comment: editForm.comment })
        .eq("id", id);

      if (error) throw error;

      setReviews((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, rating: editForm.rating, comment: editForm.comment }
            : r
        )
      );
      setEditingReview(null);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update review.");
    }
  }

  if (loading) {
    return <p className="loading">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p className="no-reviews">No reviews found.</p>;
  }

  return (
    <div className="reviews-container">
      <table className="reviews-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="product-cell">
                {review.product?.image && (
                  <img
                    src={review.product.image}
                    alt={review.product.name}
                    className="product-image"
                  />
                )}
                <span>{review.product?.name}</span>
              </td>
              <td>
                {editingReview === review.id ? (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editForm.rating}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        rating: Number(e.target.value),
                      })
                    }
                    className="edit-input"
                    placeholder="Enter rating (1-5)"
                    title="Edit rating"
                  />
                ) : (
                  <div className="stars">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="star filled">
                        ★
                      </span>
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <span key={i} className="star empty">
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td>
                {editingReview === review.id ? (
                  <textarea
                    value={editForm.comment}
                    onChange={(e) =>
                      setEditForm({ ...editForm, comment: e.target.value })
                    }
                    className="edit-textarea"
                    placeholder="Edit your comment"
                  />
                ) : (
                  <span className="comment-text" title={review.comment}>
                    {review.comment.length > 30
                      ? review.comment.slice(0, 30) + "..."
                      : review.comment}
                  </span>
                )}
              </td>
              <td>{new Date(review.created_at).toLocaleDateString()}</td>
              <td>
                {editingReview === review.id ? (
                  <>
                    <button
                      className="btn save-btn"
                      onClick={() => handleUpdate(review.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn cancel-btn"
                      onClick={() => setEditingReview(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn edit-btn"
                      onClick={() => startEdit(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
