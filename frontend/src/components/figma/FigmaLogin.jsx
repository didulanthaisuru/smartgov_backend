import React from 'react';
import { useNavigate } from 'react-router-dom';

const FigmaLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Set authentication token
    localStorage.setItem('token', 'dummy-auth-token');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'Imasha Jayarathne',
      email: 'imasha@example.com',
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
          backgroundImage: `url('/src/assets/images/figma/login_screen.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {/* Interactive Overlay - positioned to match Figma clickable areas */}
        <div className="absolute inset-0">
          {/* Login Button - positioned based on Figma coordinates */}
          <button
            onClick={handleLogin}
            className="absolute bg-transparent hover:bg-orange-500 hover:bg-opacity-20 transition-colors rounded-full"
            style={{
              left: '11%',
              top: '78%',
              width: '78%',
              height: '6%'
            }}
          />
          
          {/* Create Account Button */}
          <button
            onClick={() => navigate('/signup')}
            className="absolute bg-transparent hover:bg-gray-500 hover:bg-opacity-20 transition-colors"
            style={{
              left: '50%',
              top: '45%',
              width: '40%',
              height: '4%'
            }}
          />
          
          {/* Language Selector */}
          <button
            className="absolute bg-transparent hover:bg-blue-500 hover:bg-opacity-20 transition-colors rounded"
            style={{
              right: '8%',
              top: '8%',
              width: '25%',
              height: '3%'
            }}
          />
          
          {/* NIC Input Field */}
          <input
            type="text"
            placeholder=""
            className="absolute bg-transparent border-0 outline-none text-transparent"
            style={{
              left: '11%',
              top: '52%',
              width: '78%',
              height: '6%'
            }}
          />
          
          {/* Password Input Field */}
          <input
            type="password"
            placeholder=""
            className="absolute bg-transparent border-0 outline-none text-transparent"
            style={{
              left: '11%',
              top: '62%',
              width: '78%',
              height: '6%'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FigmaLogin;
