import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
// import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react'

const TransactionHistory = async ({ searchParams: { id, page }}:SearchParamProps) => {
  const currentPage = Number(page as string) || 1;


  const getLoggedInUser = async () => {
    return {
      $id: 'user_123',
    };
  };

  const loggedIn = await getLoggedInUser();

    // Mock getAccounts
    const getAccounts = async ({ userId }: { userId: string }) => {
      return {
        data: [
          {
            appwriteItemId: 'acc_123',
            data: {
              name: 'Chase Checking',
              officialName: 'Chase Total Checking',
              mask: '1234',
              currentBalance: 1280.55,
            },
          },
        ],
      };
    };
  
    // Mock getAccount
    const getAccount = async ({ appwriteItemId }: { appwriteItemId: string }): Promise<{
      data: {
        name: string;
        officialName: string;
        mask: string;
        currentBalance: number;
      };
      transactions: Transaction[];
    }> => {
      return {
        data: {
          name: 'Chase Checking',
          officialName: 'Chase Total Checking',
          mask: '1234',
          currentBalance: 1280.55,
        },
        transactions: [
          {
            id: 'txn_001',
            name: 'Netflix Subscription',
            amount: 15.99,
            category: 'Streaming services',
            date: '2025-06-10',
            $id: '',
            paymentChannel: '',
            type: '',
            accountId: '',
            pending: false,
            image: '',
            $createdAt: '',
            channel: '',
            senderBankId: '',
            receiverBankId: ''
          },
          {
            id: 'txn_002',
            name: 'Grocery Store',
            amount: 82.45,
            category: 'Groceries',
            date: '2025-06-09',
            $id: '',
            paymentChannel: '',
            type: '',
            accountId: '',
            pending: false,
            image: '',
            $createdAt: '',
            channel: '',
            senderBankId: '',
            receiverBankId: ''
          },
          {
            id: 'txn_003',
            name: 'Coffee Shop',
            amount: 4.5,
            category: 'Foodnd Drink',
            date: '2025-06-08',
            $id: '',
            paymentChannel: '',
            type: '',
            accountId: '',
            pending: false,
            image: '',
            $createdAt: '',
            channel: '',
            senderBankId: '',
            receiverBankId: ''
          },
          // Add more if needed
        ],
      };
    };
    


  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })


const rowsPerPage = 10;
const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

const indexOfLastTransaction = currentPage * rowsPerPage;
const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

const currentTransactions = account?.transactions.slice(
  indexOfFirstTransaction, indexOfLastTransaction
)
  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox 
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-20 font-bold text-white">{account?.data.name}</h2>
          </div>
          
          <div className='transactions-account-balance'>
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">{formatAmount(account?.data.currentBalance)}</p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable 
            transactions={currentTransactions}
          />
            {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={currentPage} />
              </div>
            )}
        </section>
      </div>
    </div>
  )
}

export default TransactionHistory