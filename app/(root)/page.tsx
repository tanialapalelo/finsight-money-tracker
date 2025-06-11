import { getCurrentUser } from "@/auth/nextjs/currentUser";
import HeaderBox from "@/components/HeaderBox"
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = async () => {
  const loggedIn = await getCurrentUser({ withFullUser: true })
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedIn!.firstName || "Guest"} subtext="Access and manage your transaction" />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1235}/>
        </header>
        
        <RecentTransactions 
        />

      </div>

      <RightSidebar 
        user={loggedIn!}
        // transactions={account?.transactions}
        // banks={accountsData?.slice(0, 2)}
      />
    </section>
  )
}

export default Home