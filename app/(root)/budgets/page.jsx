import BudgetList from './_components/BudgetList'
import HeaderBox from '@/components/HeaderBox'
import { getCurrentUser } from '@/auth/nextjs/currentUser'

const Budget = async () => {
  
  const loggedIn = await getCurrentUser({ withFullUser: true })

  return (
    <div className='p-10'>
      <HeaderBox
        title="My Budgets"
        subtext="Effortlessly manage your budgets."
      />
      <BudgetList userId={loggedIn.id}/>
    </div>
  )
}

export default Budget