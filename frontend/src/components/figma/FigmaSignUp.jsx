import React from 'react';
import { useNavigate } from 'react-router-dom';

const FigmaSignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Set authentication token
    localStorage.setItem('token', 'dummy-auth-token');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'New User',
      email: 'newuser@example.com',
      role: 'user'
    }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background Image - Exact Figma Design */}
      <div 
        className="w-full h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/src/assets/images/figma/signup_screen.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {/* Interactive Overlay */}
        <div className="absolute inset-0">
          {/* Save & Continue Button */}
          <button
            onClick={handleSignUp}
            className="absolute bg-transparent hover:bg-orange-500 hover:bg-opacity-20 transition-colors rounded-full"
            style={{
              left: '11%',
              top: '85%',
              width: '78%',
              height: '5%'
            }}
          />
          
          {/* Back to Login Button */}
          <button
            onClick={() => navigate('/login')}
            className="absolute bg-transparent hover:bg-gray-500 hover:bg-opacity-20 transition-colors"
            style={{
              left: '10%',
              top: '40%',
              width: '35%',
              height: '4%'
            }}
          />
          
          {/* Language Selector */}
          <button
            className="absolute bg-transparent hover:bg-blue-500 hover:bg-opacity-20 transition-colors rounded"
            style={{
              right: '8%',
              top: '5%',
              width: '25%',
              height: '2%'
            }}
          />
          
          {/* Input Fields - NIC Number */}
          <input
            type="text"
            placeholder=""
            className="absolute bg-transparent border-0 outline-none text-transparent"
            style={{
              left: '11%',
              top: '50%',
              width: '78%',
              height: '5%'
            }}
          />
          
          {/* Mobile Number */}
          <input
            type="tel"
            placeholder=""
            className="absolute bg-transparent border-0 outline-none text-transparent"
            style={{
              left: '11%',
              top: '57%',
              width: '78%',
              height: '5%'
            }}
          />
          
          {/* Email */}
          <input
            type="email"
            placeholder=""
            className="absolute bg-transparent border-0 outline-none text-transparent"
            style={{
              left: '11%',
              top: '64%',
              width: '78%',
              height: '5%'
            }}
          />
          
          {/* First Name */}
          <input
            type="text"
            placeholder=""
            className="absolute bg-transparent border-0 outline-none text-transparent"
            style={{
              left: '11%',
              top: '71%',
              width: '38%',
              height: '5%'
            }}
          />
          
          {/* Last Name */}
          <input
            type="text"
            placeholder=""
            className="absolute bg-transparent border-0 outline-none text-transparent"
            style={{
              left: '51%',
              top: '71%',
              width: '38%',
              height: '5%'
            }}
          />
          
          {/* Password */}
          <input
            type="password"
            placeholder=""
            className="absolute bg-transparent border-0 outline-none text-transparent"
            style={{
              left: '11%',
              top: '78%',
              width: '78%',
              height: '5%'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FigmaSignUp;
