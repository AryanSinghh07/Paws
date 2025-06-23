// Adoption application service to handle data persistence

// Get all adoption applications
export const getAllApplications = () => {
  try {
    const applications = localStorage.getItem('adoptionApplications');
    return applications ? JSON.parse(applications) : [];
  } catch (error) {
    console.error('Error getting adoption applications:', error);
    return [];
  }
};

// Get a single application by ID
export const getApplicationById = (id) => {
  try {
    const applications = getAllApplications();
    return applications.find(app => app.id === id);
  } catch (error) {
    console.error('Error getting adoption application:', error);
    return null;
  }
};

// Save a new adoption application
export const saveApplication = (applicationData) => {
  try {
    const applications = getAllApplications();
    const newApplication = {
      id: Date.now().toString(), // Simple unique ID
      status: 'pending',
      createdAt: new Date().toISOString(),
      statusHistory: [
        {
          status: 'pending',
          date: new Date().toISOString(),
          note: 'Application submitted'
        }
      ],
      ...applicationData
    };
    
    applications.push(newApplication);
    localStorage.setItem('adoptionApplications', JSON.stringify(applications));
    
    // Send email notification (simulated)
    console.log('Sending confirmation email to:', applicationData.email);
    
    return newApplication;
  } catch (error) {
    console.error('Error saving adoption application:', error);
    throw new Error('Failed to save adoption application');
  }
};

// Update an existing application
export const updateApplication = (id, updatedData, note = '') => {
  try {
    const applications = getAllApplications();
    const index = applications.findIndex(app => app.id === id);
    
    if (index === -1) {
      throw new Error('Application not found');
    }

    const currentDate = new Date().toISOString();
    const statusHistory = applications[index].statusHistory || [];

    // If status is being updated, add to history
    if (updatedData.status && updatedData.status !== applications[index].status) {
      statusHistory.push({
        status: updatedData.status,
        date: currentDate,
        note: note || `Status updated to ${updatedData.status}`
      });
    }
    
    applications[index] = {
      ...applications[index],
      ...updatedData,
      statusHistory,
      updatedAt: currentDate
    };
    
    localStorage.setItem('adoptionApplications', JSON.stringify(applications));

    // Send email notification (simulated)
    if (updatedData.status) {
      console.log('Sending status update email to:', applications[index].email);
    }
    
    return applications[index];
  } catch (error) {
    console.error('Error updating adoption application:', error);
    throw new Error('Failed to update application');
  }
};

// Delete an application
export const deleteApplication = (id) => {
  try {
    const applications = getAllApplications();
    const filteredApplications = applications.filter(app => app.id !== id);
    localStorage.setItem('adoptionApplications', JSON.stringify(filteredApplications));
    return true;
  } catch (error) {
    console.error('Error deleting adoption application:', error);
    throw new Error('Failed to delete adoption application');
  }
}; 