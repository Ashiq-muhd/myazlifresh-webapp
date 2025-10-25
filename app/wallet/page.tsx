'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useGetWalletTransactionsQuery } from '../store/apiSlice';
import { WalletTransaction } from '../types';

export default function WalletPage() {
  const router = useRouter();
  const { data: walletData, isLoading, error } = useGetWalletTransactionsQuery();
  
  const expiringAmount = 0;
  
  // Calculate total balance from transactions
  const calculateBalance = (transactions: WalletTransaction[]) => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'credit' 
        ? total + transaction.amount 
        : total - transaction.amount;
    }, 0);
  };

  const totalBalance = walletData?.transactions ? calculateBalance(walletData.transactions) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading wallet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading wallet data</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-300 text-gray-800">
      {/* Back Header */}
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => router.push('/account')}>
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>
        <h1 className="text-lg font-semibold">My Wallet</h1>
      </div>

      {/* Balance */}
      <div className="bg-white rounded-xl p-5 shadow-md mx-4 mb-6">
        <p className="text-sm text-gray-600">Your Current Balance</p>
        <h2 className="text-4xl font-bold text-green-600 my-2">₹ {totalBalance.toFixed(1)}</h2>
        <div className="bg-red-300 text-red-900 text-sm p-2 mt-4 rounded-md text-center">
          ₹ {expiringAmount} will expire on<br />
          <span className="font-semibold">Use it before it's gone!</span>
        </div>
      </div>

      {/* Info */}
      <p className="text-xs text-gray-600 text-center mb-4 px-4">
        Your wallet balance includes referral earnings, voucher credits, and cashback rewards.
      </p>

      {/* Transactions */}
      <div className="mx-4">
        <h3 className="text-base font-semibold mb-3">
          Wallet Breakdown 
          {walletData?.pagination && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({walletData.pagination.total} transactions)
            </span>
          )}
        </h3>
        
        {walletData?.transactions && walletData.transactions.length > 0 ? (
          <ul className="space-y-4">
            {walletData.transactions.map((transaction: WalletTransaction) => (
              <li key={transaction.id} className="flex justify-between items-start bg-white p-3 rounded-md shadow-sm">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type === 'credit' ? '⬆️' : '⬇️'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{transaction.tittle}</p>
                    <p className="text-xs text-gray-500">{transaction.createdAt}</p>
                    {transaction.orderDetails && (
                      <p className="text-xs text-gray-400">
                        Order #{transaction.orderDetails.id} • ₹{transaction.orderDetails.price} • Qty: {transaction.orderDetails.quantity}
                      </p>
                    )}
                  </div>
                </div>
                <p className={`text-sm font-semibold ${
                  transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
