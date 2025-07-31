import react from 'react';
import { createContext, useState, useEffect, useContext } from 'react';


const ProfileContext = createContext({
   fetchProfileData: () => {},
});


export const ProfileProvider = ({ children }) => {
   const [formData, setFormData] = useState({
    fullName: '',
    street: '',
    country: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    profileImage: ''
  });



function fetchProfileData() {
  fetch('http://localhost:8001/settings/getProfileData', {
    credentials: 'include',
  })
    .then(async response => {
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }
     
      return response.json();
    })
    .then(data => {
      setFormData({
        fullName: data.fullName || '',
        street: data.address || '',
        country: data.country || '',
        city: data.city || '',
        state: data.province || '',
        postalCode: data.postalCode || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        profileImage: data.profileImageURL || ''
      });
    })
    .catch(error => {
      console.error('Error fetching profile data:', error.message);
      setStatusMessage({ type: 'error', text: error.message });
    });
}


  return (
    <ProfileContext.Provider value={{ formData, setFormData, fetchProfileData}}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}