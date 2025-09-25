import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ApiService from '../services/api';

// Fetch all jobs using API
export const useJobs = () => {
  const [data, setData] = useState({ jobs: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      const result = await ApiService.getJobs();
      setData({ jobs: result.jobs || [] });
    } catch (err) {
      setError(err.message);
      console.error('Error loading jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return { data, isLoading, error, refetch: loadJobs };
};

// Create a new job using API
export const useCreateJob = () => {
  const [isPending, setIsPending] = useState(false);
  
  return {
    isPending,
    mutate: async (jobData, { onSuccess, onError } = {}) => {
      try {
        setIsPending(true);
        console.log('Creating job via API:', jobData);
        
        const finalData = {
          ...jobData,
          order: Date.now(), // Use timestamp for ordering
        };
        
        const newJob = await ApiService.createJob(finalData);
        
        console.log('Job created successfully via API:', newJob);
        toast.success('Job created successfully!');
        if (onSuccess) onSuccess(newJob);
      } catch (error) {
        console.error('Error creating job via API:', error);
        toast.error('Failed to create job. Please try again.');
        if (onError) onError(error);
      } finally {
        setIsPending(false);
      }
    }
  };
};

// Update an existing job using API
export const useUpdateJob = () => {
  const [isPending, setIsPending] = useState(false);
  
  return {
    isPending,
    mutate: async ({ id, ...jobData }, { onSuccess, onError } = {}) => {
      try {
        setIsPending(true);
        console.log('Updating job via API:', id, jobData);
        
        const updatedJob = await ApiService.updateJob(id, jobData);
        
        console.log('Job updated successfully via API:', updatedJob);
        toast.success('Job updated successfully!');
        if (onSuccess) onSuccess(updatedJob);
      } catch (error) {
        console.error('Error updating job via API:', error);
        toast.error('Failed to update job. Please try again.');
        if (onError) onError(error);
      } finally {
        setIsPending(false);
      }
    }
  };
};

// Delete a job using API
export const useDeleteJob = () => {
  const [isPending, setIsPending] = useState(false);
  
  return {
    isPending,
    mutate: async (jobId, { onSuccess, onError } = {}) => {
      try {
        setIsPending(true);
        console.log('Deleting job via API:', jobId);
        
        await ApiService.deleteJob(jobId);
        
        console.log('Job deleted successfully via API:', jobId);
        toast.success('Job deleted successfully!');
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error('Error deleting job via API:', error);
        toast.error('Failed to delete job. Please try again.');
        if (onError) onError(error);
      } finally {
        setIsPending(false);
      }
    }
  };
};