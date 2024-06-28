import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Corrected import path
import { toast } from 'react-hot-toast';

const useSignUp = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (formData) => {
    const { username, fullname, password, confirmPassword, gender } = formData;

    if (!username || !fullname || !password || !confirmPassword || !gender) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      toast.success('Sign up successful');
      console.log('Sign up successful:', data);

      setAuthUser(data.user);

      // Navigate to home page after successful signup
      navigate('/');
    } catch (error) {
      toast.error('Sign up failed');
      console.error('Error signing up:', error);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignUp;
