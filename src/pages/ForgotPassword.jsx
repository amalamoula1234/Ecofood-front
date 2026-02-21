import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ForgotPassword = () => {
  const [step, setStep] = useState('email'); // 'email' | 'success'
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.email === email);
    if (!userExists) {
      setError('Aucun compte trouvé avec cet email.');
      return;
    }
    setStep('success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* ÉTAPE 1: Email */}
        {step === 'email' && (
          <>
            <h2 className="text-2xl font-bold text-zinc-800 mb-2 text-center">
              Mot de passe oublié
            </h2>
            <p className="text-sm text-zinc-500 text-center mb-6">
              Entrez votre email pour réinitialiser votre mot de passe.
            </p>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                    <EmailIcon />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-zinc-800"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Continuer
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              <Link to="/login" className="text-orange-500 hover:underline font-medium">
                ← Retour à la connexion
              </Link>
            </p>
          </>
        )}

        {/* ÉTAPE 2: Succès */}
        {step === 'success' && (
          <div className="text-center space-y-5">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-zinc-800">Mot de passe mis à jour !</h2>
              <p className="text-sm text-zinc-500 mt-2">
                Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              Se connecter
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;