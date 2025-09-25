import { createServer, Model, Factory, belongsTo, hasMany } from 'miragejs';
import { dbService } from './lib/database';

const delay = () => new Promise(resolve => 
  setTimeout(resolve, 200 + Math.random() * 1000)
);

const shouldFail = () => Math.random() < 0.08; // 8% failure rate

export function makeServer({ environment = 'development' } = {}) {
  console.log('MirageJS: Creating server with environment:', environment);
  
  const server = createServer({
    environment,
    
    models: {
      job: Model.extend({
        candidates: hasMany()
      }),
      candidate: Model.extend({
        job: belongsTo()
      }),
      assessment: Model.extend({
        job: belongsTo()
      })
    },

    factories: {
      job: Factory.extend({
        title() { 
          const titles = [
            'Senior Frontend Developer', 
            'Backend Engineer', 
            'Full Stack Developer',
            'UI/UX Designer',
            'Product Manager',
            'Data Scientist'
          ];
          return titles[Math.floor(Math.random() * titles.length)];
        },
        department() {
          const departments = ['Engineering', 'Design', 'Product', 'Data'];
          return departments[Math.floor(Math.random() * departments.length)];
        },
        location: 'Remote',
        type: 'full-time',
        experience: 'mid',
        salary: '$120,000 - $160,000',
        description: 'We are looking for a talented developer to join our team...',
        requirements: 'Bachelor\'s degree in Computer Science or related field...',
        tags() {
          const tagOptions = [
            ['React', 'TypeScript', 'Node.js'],
            ['Python', 'Django', 'PostgreSQL'],
            ['JavaScript', 'Vue.js', 'Express'],
            ['Java', 'Spring', 'MySQL'],
            ['Go', 'Docker', 'Kubernetes']
          ];
          return tagOptions[Math.floor(Math.random() * tagOptions.length)];
        },
        status() {
          const statuses = ['active', 'draft', 'archived'];
          return statuses[Math.floor(Math.random() * statuses.length)];
        },
        createdAt() { return new Date().toISOString(); },
        updatedAt() { return new Date().toISOString(); }
      }),

      candidate: Factory.extend({
        name() {
          const firstNames = [
            'Alexander', 'Emma', 'Michael', 'Olivia', 'William', 'Sophia', 'James', 'Isabella',
            'Benjamin', 'Charlotte', 'Lucas', 'Amelia', 'Henry', 'Mia', 'Theodore', 'Harper',
            'Sebastian', 'Evelyn', 'Oliver', 'Abigail', 'Elijah', 'Emily', 'Samuel', 'Elizabeth',
            'David', 'Sofia', 'Joseph', 'Avery', 'Carter', 'Ella', 'Owen', 'Madison',
            'Wyatt', 'Scarlett', 'John', 'Victoria', 'Jack', 'Aria', 'Luke', 'Grace',
            'Jayden', 'Chloe', 'Dylan', 'Camila', 'Grayson', 'Penelope', 'Levi', 'Riley',
            'Isaac', 'Layla', 'Gabriel', 'Lillian', 'Julian', 'Nora', 'Mateo', 'Zoey'
          ];
          
          const lastNames = [
            'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
            'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor',
            'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris',
            'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen',
            'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
            'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter',
            'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz'
          ];
          
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
          return `${firstName} ${lastName}`;
        },
        
        email() {
          const name = this.name || 'candidate';
          const domain = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'][Math.floor(Math.random() * 4)];
          return `${name.toLowerCase().replace(/\s+/g, '.')}@${domain}`;
        },
        
        phone() {
          const areaCodes = ['415', '510', '650', '408', '925', '707', '831', '209'];
          const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
          const exchange = Math.floor(Math.random() * 900) + 100;
          const number = Math.floor(Math.random() * 9000) + 1000;
          return `+1 (${areaCode}) ${exchange}-${number}`;
        },
        
        location() {
          const locations = [
            'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
            'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Portland, OR', 'Miami, FL',
            'Remote', 'San Jose, CA', 'Oakland, CA', 'Palo Alto, CA', 'Berkeley, CA'
          ];
          return locations[Math.floor(Math.random() * locations.length)];
        },
        
        stage() {
          const stages = ['applied', 'screen', 'tech', 'offer', 'hired'];
          const weights = [0.4, 0.25, 0.2, 0.1, 0.05]; // More likely to be in earlier stages
          
          let random = Math.random();
          for (let i = 0; i < stages.length; i++) {
            random -= weights[i];
            if (random <= 0) return stages[i];
          }
          return 'applied';
        },
        
        summary() {
          const summaries = [
            'Experienced software engineer with a passion for building scalable web applications and leading development teams.',
            'Creative frontend developer specializing in React and modern JavaScript frameworks with strong UX/UI sensibilities.',
            'Full-stack developer with expertise in both frontend and backend technologies, focusing on performance optimization.',
            'Senior backend engineer with deep knowledge of distributed systems and cloud architecture.',
            'Product-minded engineer with experience in agile development and cross-functional collaboration.',
            'Data-driven developer with strong analytical skills and experience in building data visualization tools.',
            'Mobile-first developer specializing in React Native and cross-platform application development.',
            'DevOps-minded engineer with experience in CI/CD pipelines and infrastructure automation.'
          ];
          return summaries[Math.floor(Math.random() * summaries.length)];
        },
        
        experience() {
          const experiences = [
            {
              id: 1,
              title: 'Senior Software Engineer',
              company: 'Tech Corp',
              startDate: '2021-01',
              endDate: '2024-01',
              current: false,
              description: 'Led development of microservices architecture and mentored junior developers.'
            },
            {
              id: 2,
              title: 'Software Engineer',
              company: 'StartupXYZ',
              startDate: '2019-06',
              endDate: '2021-01',
              current: false,
              description: 'Built full-stack web applications using React, Node.js, and PostgreSQL.'
            }
          ];
          return experiences.slice(0, Math.floor(Math.random() * 2) + 1);
        },
        
        education() {
          const educations = [
            {
              id: 1,
              degree: 'Bachelor of Science in Computer Science',
              school: 'Stanford University',
              field: 'Computer Science',
              graduationYear: '2019',
              gpa: '3.8'
            }
          ];
          return educations;
        },
        
        skills() {
          const allSkills = [
            'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'Go',
            'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Kubernetes',
            'GraphQL', 'REST APIs', 'Git', 'Agile', 'Scrum', 'TDD', 'CI/CD'
          ];
          
          const numSkills = Math.floor(Math.random() * 5) + 3; // 3-7 skills
          const shuffled = allSkills.sort(() => 0.5 - Math.random());
          return shuffled.slice(0, numSkills);
        },
        
        linkedinProfile() {
          const name = this.name || 'candidate';
          return `https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '-')}`;
        },
        
        githubProfile() {
          const name = this.name || 'candidate';
          return `https://github.com/${name.toLowerCase().replace(/\s+/g, '')}`;
        },
        
        portfolioUrl() {
          const name = this.name || 'candidate';
          return `https://${name.toLowerCase().replace(/\s+/g, '')}.dev`;
        },
        
        notes() {
          const notes = [
            'Strong technical skills and great communication abilities.',
            'Excellent problem-solving skills and team collaboration.',
            'Shows initiative and has leadership potential.',
            'Good cultural fit with strong work ethic.',
            'Impressive portfolio and open source contributions.',
            'Quick learner with adaptability to new technologies.'
          ];
          return notes[Math.floor(Math.random() * notes.length)];
        },
        
        jobId() {
          // This will be set when creating candidates in relation to jobs
          return 1;
        },
        
        createdAt() { 
          const now = new Date();
          const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within last 30 days
          return pastDate.toISOString(); 
        },
        
        updatedAt() { 
          return new Date().toISOString(); 
        }
      }),

      assessment: Factory.extend({
        title() {
          const titles = [
            'Frontend Developer Assessment',
            'Backend Engineer Evaluation',
            'Full Stack Technical Test',
            'UI/UX Design Challenge',
            'Data Science Coding Test',
            'Product Manager Case Study',
            'System Design Interview',
            'Behavioral Assessment',
            'JavaScript Fundamentals',
            'React Developer Challenge'
          ];
          return titles[Math.floor(Math.random() * titles.length)];
        },
        description() {
          const descriptions = [
            'Comprehensive technical evaluation covering core concepts',
            'Practical coding challenges and problem-solving tasks',
            'Real-world scenarios and case study analysis',
            'Interactive assessment with multiple question types',
            'Skills-based evaluation with hands-on exercises'
          ];
          return descriptions[Math.floor(Math.random() * descriptions.length)];
        },
        type() {
          const types = ['Technical', 'Behavioral', 'Cognitive'];
          const weights = [0.6, 0.25, 0.15];
          const random = Math.random();
          let sum = 0;
          for (let i = 0; i < types.length; i++) {
            sum += weights[i];
            if (random <= sum) return types[i];
          }
          return 'Technical';
        },
        status() {
          const statuses = ['Active', 'Draft'];
          return statuses[Math.floor(Math.random() * statuses.length)];
        },
        questionCount() {
          return Math.floor(Math.random() * 15) + 5;
        },
        duration() {
          const durations = [30, 45, 60, 90, 120];
          return durations[Math.floor(Math.random() * durations.length)];
        },
        createdAt() { return new Date().toISOString(); },
        updatedAt() { return new Date().toISOString(); }
      })
    },

    seeds(server) {
      // Create 25 initial jobs
      server.createList('job', 25);
      
      // Note: Candidates will be seeded via database.js using thousandCandidates.js
      // This avoids duplicate candidate creation between MirageJS and database seeding
      
      // Create 15 assessments
      const jobs = server.schema.jobs.all().models;
      for (let i = 0; i < 15; i++) {
        const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
        server.create('assessment', {
          jobId: randomJob.id
        });
      }
    },

    routes() {
      console.log('MirageJS: Setting up routes...');
      this.namespace = 'api';
      this.timing = 300; // Reduced timing for better performance

      console.log('MirageJS: Routes configured with namespace "api"');

      // Jobs routes
      this.get('/jobs', async (schema) => {
        console.log('API: Fetching jobs from database');
        const jobs = await dbService.getAllJobs();
        console.log('API: Returning jobs from database:', jobs.length);
        return { jobs };
      });

      this.post('/jobs', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        console.log('API: Creating job with data:', attrs);
        
        // Add the job to the actual database
        const finalData = {
          ...attrs,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const id = await dbService.addJob(finalData);
        const job = { ...finalData, id };
        
        console.log('API: Job created in database:', job);
        return job;
      });

      this.put('/jobs/:id', async (schema, request) => {
        const id = parseInt(request.params.id);
        const attrs = JSON.parse(request.requestBody);
        console.log('API: Updating job', id, 'with data:', attrs);
        
        try {
          await dbService.updateJob(id, attrs);
          const updatedJob = await dbService.getJobById(id);
          
          if (!updatedJob) {
            console.error('API: Job not found:', id);
            return new Response(404, {}, { error: 'Job not found' });
          }
          
          console.log('API: Job updated in database:', updatedJob);
          return updatedJob;
        } catch (error) {
          console.error('API: Error updating job:', error);
          return new Response(500, {}, { error: 'Failed to update job' });
        }
      });

      this.delete('/jobs/:id', async (schema, request) => {
        const id = parseInt(request.params.id);
        console.log('API: Deleting job:', id);
        
        try {
          const job = await dbService.getJobById(id);
          if (!job) {
            console.error('API: Job not found:', id);
            return new Response(404, {}, { error: 'Job not found' });
          }
          
          await dbService.deleteJob(id);
          console.log('API: Job deleted from database successfully');
          return new Response(204);
        } catch (error) {
          console.error('API: Error deleting job:', error);
          return new Response(500, {}, { error: 'Failed to delete job' });
        }
      });

      // Candidates routes
      this.get('/candidates', async (schema, request) => {
        console.log('API: Fetching candidates from database');
        
        const url = new URL(request.url, 'http://localhost');
        const search = url.searchParams.get('search');
        const stage = url.searchParams.get('stage');
        const jobId = url.searchParams.get('jobId');
        
        try {
          let candidates;
          
          if (search) {
            candidates = await dbService.searchCandidates(search);
          } else if (stage) {
            candidates = await dbService.getCandidatesByStage(stage);
          } else if (jobId) {
            candidates = await dbService.getCandidatesByJobId(parseInt(jobId));
          } else {
            candidates = await dbService.getAllCandidates();
          }
          
          console.log('API: Returning candidates from database:', candidates.length);
          return { candidates };
        } catch (error) {
          console.error('API: Error fetching candidates:', error);
          return new Response(500, {}, { error: 'Failed to fetch candidates' });
        }
      });

      this.get('/candidates/stats', async (schema) => {
        console.log('API: Fetching candidate statistics from database');
        
        try {
          const stats = await dbService.getCandidateStats();
          console.log('API: Returning candidate stats from database:', stats);
          return stats;
        } catch (error) {
          console.error('API: Error fetching candidate stats:', error);
          return new Response(500, {}, { error: 'Failed to fetch candidate stats' });
        }
      });

      this.post('/candidates', async (schema, request) => {
        try {
          const attrs = JSON.parse(request.requestBody);
          console.log('API: Creating candidate with data:', attrs);
          
          // Ensure we have required fields
          if (!attrs.name || !attrs.email) {
            console.error('API: Missing required fields');
            return new Response(400, {}, { error: 'Missing required fields: name, email' });
          }

          // Add the candidate to the actual database
          const finalData = {
            ...attrs,
            status: attrs.status || 'Active',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          const id = await dbService.addCandidate(finalData);
          const candidate = { ...finalData, id };
          
          console.log('API: Candidate created in database:', candidate);
          return candidate;
        } catch (error) {
          console.error('API: Error creating candidate:', error);
          return new Response(500, {}, { error: 'Failed to create candidate' });
        }
      });

      this.put('/candidates/:id', async (schema, request) => {
        try {
          const id = parseInt(request.params.id);
          const attrs = JSON.parse(request.requestBody);
          console.log('API: Updating candidate', id, 'with data:', attrs);
          
          const updatedCandidate = await dbService.updateCandidate(id, attrs);
          
          if (!updatedCandidate) {
            console.error('API: Candidate not found:', id);
            return new Response(404, {}, { error: 'Candidate not found' });
          }
          
          console.log('API: Candidate updated in database:', updatedCandidate);
          return updatedCandidate;
        } catch (error) {
          console.error('API: Error updating candidate:', error);
          return new Response(500, {}, { error: 'Failed to update candidate' });
        }
      });

      this.patch('/candidates/:id', async (schema, request) => {
        try {
          const id = parseInt(request.params.id);
          const attrs = JSON.parse(request.requestBody);
          console.log('API: Patching candidate', id, 'with data:', attrs);
          
          const updatedCandidate = await dbService.updateCandidate(id, attrs);
          
          if (!updatedCandidate) {
            console.error('API: Candidate not found:', id);
            return new Response(404, {}, { error: 'Candidate not found' });
          }
          
          console.log('API: Candidate patched in database:', updatedCandidate);
          return updatedCandidate;
        } catch (error) {
          console.error('API: Error patching candidate:', error);
          return new Response(500, {}, { error: 'Failed to patch candidate' });
        }
      });

      this.patch('/candidates/bulk', async (schema, request) => {
        try {
          const { candidateIds, updates } = JSON.parse(request.requestBody);
          console.log('API: Bulk updating candidates:', candidateIds, 'with data:', updates);
          
          const results = await Promise.all(candidateIds.map(async (id) => {
            try {
              const updated = await dbService.updateCandidate(id, {
                ...updates,
                updatedAt: new Date().toISOString(),
                // Ensure arrays are properly handled
                experience: updates.experience || [],
                education: updates.education || [],
                skills: updates.skills || []
              });
              
              return { id, success: true, candidate: updated };
            } catch (error) {
              return { id, success: false, error: error.message };
            }
          }));
          
          console.log('API: Bulk update completed:', results);
          return { results };
        } catch (error) {
          console.error('API: Error in bulk update:', error);
          return new Response(500, {}, { error: 'Failed to bulk update candidates' });
        }
      });

      this.delete('/candidates/:id', async (schema, request) => {
        try {
          const id = parseInt(request.params.id);
          console.log('API: Deleting candidate:', id);
          
          const candidate = await dbService.getCandidateById(id);
          if (!candidate) {
            console.error('API: Candidate not found:', id);
            return new Response(404, {}, { error: 'Candidate not found' });
          }
          
          await dbService.deleteCandidate(id);
          console.log('API: Candidate deleted from database successfully');
          return new Response(204);
        } catch (error) {
          console.error('API: Error deleting candidate:', error);
          return new Response(500, {}, { error: 'Failed to delete candidate' });
        }
      });

      this.get('/candidates/:id/timeline', async (schema, request) => {
        try {
          const candidateId = parseInt(request.params.id);
          console.log('API: Fetching timeline for candidate:', candidateId);
          
          const timeline = await dbService.getCandidateTimeline(candidateId);
          console.log('API: Returning candidate timeline from database:', timeline.length);
          return timeline;
        } catch (error) {
          console.error('API: Error fetching candidate timeline:', error);
          return new Response(500, {}, { error: 'Failed to fetch candidate timeline' });
        }
      });

      // Assessments routes
      this.get('/assessments', async (schema, request) => {
        try {
          console.log('API: Fetching assessments');
          const url = new URL(request.url, 'http://localhost');
          const companyId = url.searchParams.get('companyId');
          
          let assessments;
          if (companyId) {
            console.log('API: Fetching assessments for company:', companyId);
            assessments = await dbService.getAllAssessments(parseInt(companyId));
          } else {
            console.log('API: Fetching all assessments');
            assessments = await dbService.getAllAssessments();
          }
          
          console.log('API: Returning assessments from database:', assessments.length);
          return { assessments };
        } catch (error) {
          console.error('API: Error fetching assessments:', error);
          return new Response(500, {}, { error: 'Failed to fetch assessments' });
        }
      });

      this.get('/assessments/:id', async (schema, request) => {
        try {
          const id = parseInt(request.params.id);
          console.log('API: Fetching assessment:', id);
          
          const assessment = await dbService.getAssessmentById(id);
          if (!assessment) {
            console.error('API: Assessment not found:', id);
            return new Response(404, {}, { error: 'Assessment not found' });
          }
          
          console.log('API: Assessment found from database:', assessment);
          return assessment;
        } catch (error) {
          console.error('API: Error fetching assessment:', error);
          return new Response(500, {}, { error: 'Failed to fetch assessment' });
        }
      });

      this.post('/assessments', async (schema, request) => {
        try {
          const assessmentData = JSON.parse(request.requestBody);
          console.log('API: Creating assessment with data:', assessmentData);
          
          const newAssessment = {
            ...assessmentData,
            createdAt: assessmentData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          const id = await dbService.createAssessment(newAssessment);
          const savedAssessment = { ...newAssessment, id };
          
          console.log('API: Assessment created successfully in database:', savedAssessment);
          return savedAssessment;
        } catch (error) {
          console.error('API: Error creating assessment:', error);
          return new Response(500, {}, { error: 'Failed to create assessment' });
        }
      });

      this.put('/assessments/:id', async (schema, request) => {
        try {
          const id = parseInt(request.params.id);
          const updates = JSON.parse(request.requestBody);
          console.log('API: Updating assessment', id, 'with data:', updates);
          
          // Check if assessment exists
          const existingAssessment = await dbService.getAssessmentById(id);
          if (!existingAssessment) {
            console.error('API: Assessment not found:', id);
            return new Response(404, {}, { error: 'Assessment not found' });
          }
          
          // Update assessment
          await dbService.updateAssessment(id, {
            ...updates,
            updatedAt: new Date().toISOString()
          });
          
          // Fetch and return updated assessment
          const updatedAssessment = await dbService.getAssessmentById(id);
          console.log('API: Assessment updated successfully in database:', updatedAssessment);
          return updatedAssessment;
        } catch (error) {
          console.error('API: Error updating assessment:', error);
          return new Response(500, {}, { error: 'Failed to update assessment' });
        }
      });

      this.delete('/assessments/:id', async (schema, request) => {
        try {
          const id = parseInt(request.params.id);
          console.log('API: Deleting assessment:', id);
          
          // Check if assessment exists
          const existingAssessment = await dbService.getAssessmentById(id);
          if (!existingAssessment) {
            console.error('API: Assessment not found:', id);
            return new Response(404, {}, { error: 'Assessment not found' });
          }
          
          // Delete assessment
          await dbService.deleteAssessment(id);
          console.log('API: Assessment deleted successfully from database');
          return new Response(204);
        } catch (error) {
          console.error('API: Error deleting assessment:', error);
          return new Response(500, {}, { error: 'Failed to delete assessment' });
        }
      });

      // Launch assessment route
      this.patch('/assessments/:id/launch', async (schema, request) => {
        try {
          const id = parseInt(request.params.id);
          console.log('API: Launching assessment:', id);
          
          // Check if assessment exists
          const existingAssessment = await dbService.getAssessmentById(id);
          if (!existingAssessment) {
            console.error('API: Assessment not found:', id);
            return new Response(404, {}, { error: 'Assessment not found' });
          }
          
          // Launch assessment
          await dbService.launchAssessment(id);
          
          // Fetch and return updated assessment
          const updatedAssessment = await dbService.getAssessmentById(id);
          console.log('API: Assessment launched successfully:', updatedAssessment);
          return updatedAssessment;
        } catch (error) {
          console.log('API: Error launching assessment:', error);
          return new Response(500, {}, { error: 'Failed to launch assessment' });
        }
      });

      // Legacy job-specific assessment routes (for backward compatibility)
      this.get('/assessments/job/:jobId', async (schema, request) => {
        try {
          const jobId = parseInt(request.params.jobId);
          console.log('API: Fetching assessment for job:', jobId);
          
          const assessment = await dbService.getAssessmentByJobId(jobId);
          if (!assessment) {
            console.error('API: Assessment not found for job:', jobId);
            return new Response(404, {}, { error: 'Assessment not found for this job' });
          }
          
          console.log('API: Assessment found for job:', assessment);
          return assessment;
        } catch (error) {
          console.error('API: Error fetching assessment by job:', error);
          return new Response(500, {}, { error: 'Failed to fetch assessment' });
        }
      });

      this.put('/assessments/job/:jobId', async (schema, request) => {
        try {
          const jobId = parseInt(request.params.jobId);
          const assessmentData = JSON.parse(request.requestBody);
          console.log('API: Saving assessment for job:', jobId, 'with data:', assessmentData);
          
          const result = await dbService.saveAssessment({ jobId, ...assessmentData });
          console.log('API: Assessment saved for job successfully:', result);
          return result;
        } catch (error) {
          console.error('API: Error saving assessment for job:', error);
          return new Response(500, {}, { error: 'Failed to save assessment' });
        }
      });

      this.post('/assessments/job/:jobId/submit', async (schema, request) => {
        try {
          const jobId = parseInt(request.params.jobId);
          const responseData = JSON.parse(request.requestBody);
          console.log('API: Submitting assessment response for job:', jobId, 'with data:', responseData);
          
          // For now, return success - this would integrate with assessment response handling
          console.log('API: Assessment response submitted successfully (placeholder)');
          return { success: true, message: 'Assessment response submitted' };
        } catch (error) {
          console.error('API: Error submitting assessment response:', error);
          return new Response(500, {}, { error: 'Failed to submit assessment response' });
        }
      });
    }
  });

  console.log('MirageJS: Server created successfully');
  return server;
}
