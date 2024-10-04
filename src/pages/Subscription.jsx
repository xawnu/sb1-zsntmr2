import React from 'react';
import axios from 'axios';

function Subscription() {
  const handleSubscribe = async (plan) => {
    try {
      const response = await axios.post('/api/subscription', { plan });
      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Subscription Plans</h1>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h2 className="text-2xl leading-6 font-semibold text-gray-900">Basic Plan</h2>
              <p className="mt-4 text-sm text-gray-500">Perfect for small projects and occasional use.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$9.99</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <p className="mt-4 text-sm text-gray-500">200 credits</p>
              <button
                onClick={() => handleSubscribe('basic')}
                className="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h2 className="text-2xl leading-6 font-semibold text-gray-900">Pro Plan</h2>
              <p className="mt-4 text-sm text-gray-500">For power users and larger projects.</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$19.99</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <p className="mt-4 text-sm text-gray-500">1000 credits</p>
              <button
                onClick={() => handleSubscribe('pro')}
                className="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;