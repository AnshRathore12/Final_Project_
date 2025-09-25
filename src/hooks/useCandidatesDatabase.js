import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ApiService from '../services/api';

// Fetch all candidates using API with optional filters
export const useCandidates = (filters = {}) => {
  const [data, setData] = useState({ candidates: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCandidates = async () => {
    try {
      setIsLoading(true);
      const result = await ApiService.getCandidates(filters);
      setData({ candidates: result.candidates || [] });
    } catch (err) {
      setError(err.message);
      console.error('Error loading candidates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, [filters.search, filters.stage, filters.jobId]);

  return { data, isLoading, error, refetch: loadCandidates };
};

// Get candidate statistics using API
export const useCandidateStats = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const stats = await ApiService.getCandidateStats();
      setData(stats);
    } catch (err) {
      setError(err.message);
      console.error('Error loading candidate stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { data, isLoading, error, refetch: loadStats };
};

// Get a single candidate by ID using API
export const useCandidate = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCandidate = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const candidate = await ApiService.getCandidate(id);
      setData(candidate);
    } catch (err) {
      setError(err.message);
      console.error('Error loading candidate:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCandidate();
  }, [id]);

  return { data, isLoading, error, refetch: loadCandidate };
};

// Get candidate timeline using API
export const useCandidateTimeline = (candidateId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTimeline = async () => {
    if (!candidateId) return;
    
    try {
      setIsLoading(true);
      const timeline = await ApiService.getCandidateTimeline(candidateId);
      setData(timeline);
    } catch (err) {
      setError(err.message);
      console.error('Error loading candidate timeline:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTimeline();
  }, [candidateId]);

  return { data, isLoading, error, refetch: loadTimeline };
};

// Create a new candidate using API
export const useCreateCandidate = () => {
  const [isPending, setIsPending] = useState(false);
  
  return {
    isPending,
    mutate: async (candidateData, { onSuccess, onError } = {}) => {
      try {
        setIsPending(true);
        console.log('Creating candidate via API:', candidateData);
        
        const newCandidate = await ApiService.createCandidate(candidateData);
        
        console.log('Candidate created successfully via API:', newCandidate);
        toast.success(`Candidate ${newCandidate.name} created successfully!`);
        if (onSuccess) onSuccess(newCandidate);
      } catch (error) {
        console.error('Error creating candidate:', error);
        toast.error('Failed to create candidate. Please try again.');
        if (onError) onError(error);
      } finally {
        setIsPending(false);
      }
    }
  };
};

// Update an existing candidate using API
export const useUpdateCandidate = () => {
  const [isPending, setIsPending] = useState(false);
  
  return {
    isPending,
    mutate: async ({ id, updates }, { onSuccess, onError } = {}) => {
      try {
        setIsPending(true);
        console.log('Updating candidate via API:', id, updates);
        
        const updatedCandidate = await ApiService.updateCandidate(id, updates);
        
        console.log('Candidate updated successfully via API:', updatedCandidate);
        toast.success(`Candidate ${updatedCandidate.name} updated successfully!`);
        if (onSuccess) onSuccess(updatedCandidate);
      } catch (error) {
        console.error('Error updating candidate via API:', error);
        toast.error('Failed to update candidate. Please try again.');
        if (onError) onError(error);
      } finally {
        setIsPending(false);
      }
    }
  };
};

// Delete a candidate using API
export const useDeleteCandidate = () => {
  const [isPending, setIsPending] = useState(false);
  
  return {
    isPending,
    mutate: async (candidateId, { onSuccess, onError } = {}) => {
      try {
        setIsPending(true);
        console.log('Deleting candidate via API:', candidateId);
        
        await ApiService.deleteCandidate(candidateId);
        
        console.log('Candidate deleted successfully via API:', candidateId);
        toast.success('Candidate deleted successfully!');
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error('Error deleting candidate via API:', error);
        toast.error('Failed to delete candidate. Please try again.');
        if (onError) onError(error);
      } finally {
        setIsPending(false);
      }
    }
  };
};

// Bulk update candidates using database
export const useBulkUpdateCandidates = () => {
  const [isPending, setIsPending] = useState(false);
  
  return {
    isPending,
    mutate: async ({ candidateIds, updates }, { onSuccess, onError } = {}) => {
      try {
        setIsPending(true);
        console.log('Bulk updating candidates in database:', candidateIds, updates);
        
        const results = await dbService.bulkUpdateCandidates(candidateIds, updates);
        
        const successCount = results.filter(r => r.success).length;
        const failureCount = results.filter(r => !r.success).length;
        
        console.log('Bulk update completed:', { successCount, failureCount });
        
        if (failureCount === 0) {
          toast.success(`${successCount} candidates updated successfully!`);
        } else {
          toast.success(`${successCount} candidates updated, ${failureCount} failed`);
        }
        
        if (onSuccess) onSuccess(results);
      } catch (error) {
        console.error('Error bulk updating candidates:', error);
        toast.error('Failed to update candidates. Please try again.');
        if (onError) onError(error);
      } finally {
        setIsPending(false);
      }
    }
  };
};

// Hook for moving candidate to next stage
export const useMoveToNextStage = () => {
  const updateCandidate = useUpdateCandidate();
  
  const stageOrder = ['Applied', 'Screening', 'Technical', 'Interview', 'Final', 'Offer', 'Hired'];
  
  return {
    isPending: updateCandidate.isPending,
    mutate: async ({ candidateId, currentStage, notes }, { onSuccess, onError } = {}) => {
      try {
        const currentIndex = stageOrder.indexOf(currentStage);
        const nextStage = stageOrder[currentIndex + 1];
        
        if (!nextStage) {
          throw new Error('Candidate is already at the final stage');
        }
        
        await updateCandidate.mutate({
          id: candidateId,
          updates: {
            stage: nextStage,
            stageChangeNotes: notes || `Moved from ${currentStage} to ${nextStage}`,
          },
        }, { onSuccess, onError });
      } catch (error) {
        toast.error(error.message || 'Failed to move candidate to next stage');
        if (onError) onError(error);
      }
    }
  };
};

// Hook for rejecting a candidate
export const useRejectCandidate = () => {
  const updateCandidate = useUpdateCandidate();
  
  return {
    isPending: updateCandidate.isPending,
    mutate: async ({ candidateId, reason }, { onSuccess, onError } = {}) => {
      try {
        await updateCandidate.mutate({
          id: candidateId,
          updates: {
            stage: 'Rejected',
            status: 'Inactive',
            stageChangeNotes: reason || 'Candidate rejected',
          },
        }, { onSuccess, onError });
      } catch (error) {
        toast.error(error.message || 'Failed to reject candidate');
        if (onError) onError(error);
      }
    }
  };
};