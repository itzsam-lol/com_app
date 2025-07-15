import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthCard = () => {
  const navigate = useNavigate();
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);

  // Sign In State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign Up State
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');
  const [signupSubmitting, setSignupSubmitting] = useState(false);

  // Sign In Handler
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/index');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
      navigate('/index');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  // Sign Up Handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');
    setSignupSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      if (signupName) {
        await updateProfile(userCredential.user, { displayName: signupName });
      }
      setSignupSuccess('Account created! You can now sign in.');
      setTimeout(() => {
        setIsFlipped(false);
        setSignupSuccess('');
        navigate('/index');
      }, 1200);
    } catch (err: any) {
      setSignupError(err.message || 'Failed to sign up');
    } finally {
      setSignupSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  useEffect(() => {
    if (user) {
      navigate('/index');
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="relative w-full max-w-md h-[500px] perspective">
        <div className={`absolute w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Sign In Side */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-8 backface-hidden flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
              {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
              <form onSubmit={handleEmailSignIn} className="space-y-4 mb-4">
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-2 text-gray-400 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded hover:bg-gray-100 transition font-medium text-gray-700 shadow-sm"
              >
                <FcGoogle size={22} />
                Sign in with Google
              </button>
            </div>
            <div className="text-center text-sm mt-4">
              <span>Don't have an account? </span>
              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
          {/* Sign Up Side */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-8 rotate-y-180 backface-hidden flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
              {signupError && <div className="mb-4 text-red-600 text-center">{signupError}</div>}
              {signupSuccess && <div className="mb-4 text-green-600 text-center">{signupSuccess}</div>}
              <form onSubmit={handleSignup} className="space-y-4 mb-4">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={signupShowPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={e => setSignupPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setSignupShowPassword(!signupShowPassword)}
                      tabIndex={-1}
                    >
                      {signupShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={signupSubmitting}
                  className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
                >
                  {signupSubmitting ? 'Signing up...' : 'Sign Up'}
                </button>
              </form>
            </div>
            <div className="text-center text-sm mt-4">
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Flip Animation CSS */}
      <style>{`
        .perspective { perspective: 1200px; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default AuthCard; 