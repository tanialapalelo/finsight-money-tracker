import Link from 'next/link'

const RecentTransactions = ({
  page = 1,
}: RecentTransactionsProps) => {
  const id = 10;

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${id}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      
    </section>
  )
}

export default RecentTransactions