import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationCard from "../components/ApplicationCard";

// Cool gradient
// bg-gradient-to-b from-[#2e026d] to-[#15162c]

const Home: NextPage = () => {
  const applications = trpc.application.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Application Tracker</title>
        <meta name="description" content="Job application tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-base">
        <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
            Application <span className="text-secondary">Tracker</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
          <div className="flex flex-col items-center gap-2">
            <ApplicationForm />
          </div>
          <h3 className="text-3xl">Applications</h3>
          <div className="flex flex-row flex-wrap gap-4">
            {applications.data?.map(application => {
              return (
                <ApplicationCard key={application.id} application={application} />
              )
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-primary/30 px-10 py-3 font-semibold text-black no-underline transition hover:bg-primary/50"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
