import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import Card from '../shared/Card';
import Input from '../shared/Input';
import Button from '../shared/Button';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // API call would go here
      console.log('SignUp data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set authentication token and user data
      const userData = {
        id: Date.now(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        nicNumber: data.nicNumber,
        role: 'user'
      };
      
      localStorage.setItem('token', 'dummy-auth-token');
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('SignUp error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <Header showMenuButton={false} />
        
        <Card className="mt-8">
          {/* Welcome Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Up</h2>
            <p className="text-lg text-gray-600">Create Free Account</p>
          </motion.div>

          {/* SignUp Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Tab-like header */}
            <div className="flex mb-6">
              <Link to="/login" className="flex-1 text-center py-2 border-b border-gray-200">
                <span className="text-gray-500">Back to Login</span>
              </Link>
              <div className="flex-1 text-center py-2 border-b-2 border-orange-500">
                <span className="text-orange-500 font-medium">Personal info</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 text-center">
              Sign up to manage appointments,<br />
              documents, and more.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="NIC Number"
                type="text"
                placeholder="Your NIC Number"
                {...register('nicNumber', { 
                  required: 'NIC Number is required',
                  pattern: {
                    value: /^[0-9]{9}[vVxX]$|^[0-9]{12}$/,
                    message: 'Please enter a valid NIC number'
                  }
                })}
                error={errors.nicNumber?.message}
                required
              />

              <Input
                label="Mobile Number"
                type="tel"
                placeholder="Your Mobile Number"
                {...register('mobileNumber', { 
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit mobile number'
                  }
                })}
                error={errors.mobileNumber?.message}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="Your Email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                error={errors.email?.message}
                required
              />

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  {...register('firstName', { 
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters'
                    }
                  })}
                  error={errors.firstName?.message}
                  required
                />

                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  {...register('lastName', { 
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters'
                    }
                  })}
                  error={errors.lastName?.message}
                  required
                />
              </div>

              <Input
                label="Password"
                type="password"
                placeholder="*********************"
                showPasswordToggle
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message: 'Password must contain uppercase, lowercase, number and special character'
                  }
                })}
                error={errors.password?.message}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="*********************"
                showPasswordToggle
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                error={errors.confirmPassword?.message}
                required
              />

              <Button 
                type="submit" 
                className="w-full"
                size="lg"
                loading={loading}
              >
                Save & Continue
              </Button>
            </form>
          </motion.div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
