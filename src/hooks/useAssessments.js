import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useAssessment = (jobId) => {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      ApiService.getAssessmentByJob(jobId)
        .then(response => setAssessment(response))
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [jobId]);

  return { data: assessment, isLoading: loading, error };
};

export const useSaveAssessment = () => {
  return {
    mutateAsync: async ({ jobId, ...assessmentData }) => {
      return await ApiService.saveAssessmentToJob(jobId, assessmentData);
    }
  };
};

// For the assessments page - managing assessments as entities with database storage
export function useAssessments(companyId = 1) {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load assessments from API
  const loadAssessments = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getAssessments(companyId);
      setAssessments(response.assessments || []);
    } catch (err) {
      setError(err.message);
      console.error('Error loading assessments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new assessment
  const createAssessment = async (assessmentData) => {
    try {
      console.log('Hook: Creating assessment with data:', assessmentData);
      
      const newAssessment = {
        ...assessmentData,
        companyId,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const response = await ApiService.createAssessment(newAssessment);
      console.log('Hook: Assessment created successfully:', response);
      
      // Update local state
      setAssessments(prev => [response, ...prev]);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Error creating assessment:', err);
      throw err;
    }
  };

  // Update assessment
  const updateAssessment = async (id, updates) => {
    try {
      console.log('Hook: Updating assessment:', id, 'with updates:', updates);
      
      const response = await ApiService.updateAssessment(id, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      
      console.log('Hook: Assessment updated successfully:', response);
      
      // Update local state
      setAssessments(prev => 
        prev.map(assessment => 
          assessment.id === id ? response : assessment
        )
      );
    } catch (err) {
      setError(err.message);
      console.error('Error updating assessment:', err);
      throw err;
    }
  };

  // Launch assessment
  const launchAssessment = async (id) => {
    try {
      console.log('Hook: Launching assessment:', id);
      
      await ApiService.launchAssessment(id);
      console.log('Hook: Assessment launched successfully');
      
      // Update local state
      setAssessments(prev => 
        prev.map(assessment => 
          assessment.id === id 
            ? { 
                ...assessment, 
                status: 'active', 
                launchedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
            : assessment
        )
      );
    } catch (err) {
      setError(err.message);
      console.error('Error launching assessment:', err);
      throw err;
    }
  };

  // Delete assessment
  const deleteAssessment = async (id) => {
    try {
      console.log('Hook: Deleting assessment:', id);
      
      await ApiService.deleteAssessment(id);
      console.log('Hook: Assessment deleted successfully');
      
      // Update local state
      setAssessments(prev => prev.filter(assessment => assessment.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting assessment:', err);
      throw err;
    }
  };

  // Get assessment by ID
  const getAssessmentById = (id) => {
    return assessments.find(assessment => assessment.id === id);
  };

  useEffect(() => {
    loadAssessments();
  }, [companyId]);

  return {
    data: { assessments },
    isLoading: loading,
    error,
    createAssessment,
    updateAssessment,
    launchAssessment,
    deleteAssessment,
    getAssessmentById,
    refreshAssessments: loadAssessments
  };
}
