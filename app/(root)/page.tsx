import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {
  const loggedIn = { firstname: "tania" };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox type="greeting" title="Welcome" user={loggedIn.firstname || "Guest"} subtext="Access and manage your transaction" />
          <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1235}/>
        </header>
      </div>

      {/* <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      /> */}
    </section>
  )
}

export default Home