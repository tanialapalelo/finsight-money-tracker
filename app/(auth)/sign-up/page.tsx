import AuthForm from '@/components/AuthForm'
  
export default async function SignUp({
  searchParams,
}: {
  searchParams: Promise<{ oauthError?: string }>
}) {
  const { oauthError } = await searchParams;
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" errorMsg={oauthError} />
    </section>
  )
}