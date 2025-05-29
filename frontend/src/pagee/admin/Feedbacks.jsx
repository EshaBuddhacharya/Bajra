import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../../component/admin/orders/SearchBar';
import FeedbacksTable from '../../component/admin/feedbacks/FeedbacksTable'; // Placeholder, to be created
import { MessageSquareDot } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Box } from '@radix-ui/themes';

export default function Feedbacks() {
  const { axiosInstance } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState('');
  const [isFeedbacksLoading, setIsFeedbacksLoading] = useState(false);

  // Fetch feedbacks when the component mounts
  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        setIsFeedbacksLoading(true);
        const { data } = await axiosInstance.get('/api/feedback/getFeedbacks');
        setFeedbacks(data.feedbacks); // API returns { feedbacks: [...] }
        setIsFeedbacksLoading(false);
      } catch (err) {
        toast.error('Error fetching feedbacks', err.message);
      }
    }
    fetchFeedbacks();
  }, [axiosInstance]);

  // Handle deletion of a feedback
  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/feedback/deleteFeedback/${id}`)
      .then(() => setFeedbacks((prev) => prev.filter((f) => f._id !== id)))
      .catch((err) => toast.error('Error deleting feedback', err.message));
  };

  // Filter feedbacks based on search term
  const filteredFeedbacks = feedbacks.filter((f) => {
    const searchTerm = search.trim().toLowerCase();
    const feedbackMatch = f.feedback.toLowerCase().includes(searchTerm);
    const userMatch = f.user?.name?.toLowerCase().includes(searchTerm) || false; // Handle null user
    return feedbackMatch || userMatch;
  });

  return (
    <Box p='9' pr={{ initial: '3', md: '8' }} style={{ flexGrow: 1 }}>
      <h2 className='d-flex align-items-center gap-3'>
        <MessageSquareDot fontWeight={400} size={30} />
        Feedbacks
      </h2>
      <div className="my-4 d-flex gap-2 align-items-center">
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          placeholder="Search the feedbacks..."
        />
      </div>
      <AnimatePresence mode='wait'>
            <FeedbacksTable
            feedbacks={filteredFeedbacks}
            onDelete={handleDelete}
            isLoading={isFeedbacksLoading}
            />
      </AnimatePresence>
    </Box>
  );
}