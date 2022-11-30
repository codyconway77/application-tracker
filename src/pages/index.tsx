import { type NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationCard from "../components/ApplicationCard";
import { Status } from "../types/application";

// Cool gradient
// bg-gradient-to-b from-[#2e026d] to-[#15162c]

const Home: NextPage = () => {
  const applications = trpc.application.getAll.useQuery();

  const inProgressApps = useMemo(() => {
    return applications.data?.filter(app => app.status === Status.IN_PROGRESS);
  }, [applications]);
  const interviewApps = useMemo(() => {
    return applications.data?.filter(app => app.status === Status.INTERVIEWING);
  }, [applications]);
  const offerApps = useMemo(() => {
    return applications.data?.filter(app => app.status === Status.OFFER);
  }, [applications]);
  const rejectionApps = useMemo(() => {
    return applications.data?.filter(app => app.status === Status.REJECTION);
  }, [applications]);

  return (
    <>
      <Head>
        <title>Application Tracker</title>
        <meta name="description" content="Job application tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-base">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
            Application <span className="text-primary">Tracker</span>
          </h1>
          {/* <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div> */}
          <div className="flex flex-col items-center gap-2">
            <ApplicationForm />
          </div>
          <h3 className="text-3xl">Applications {applications.data && `(${applications.data?.length})`}</h3>
          <h4 className="text-2xl">In Progress</h4>
          <div className="flex flex-row flex-wrap gap-4">
            {inProgressApps?.map(application => {
              return (
                <ApplicationCard key={application.id} application={application} />
              )
            })}
          </div>
          <h4 className="text-2xl">Interviewing</h4>
          <div className="flex flex-row flex-wrap gap-4">
            {interviewApps?.map(application => {
              return (
                <ApplicationCard key={application.id} application={application} />
              )
            })}
          </div>
          <h4 className="text-2xl">Offered</h4>
          <div className="flex flex-row flex-wrap gap-4">
            {offerApps?.map(application => {
              return (
                <ApplicationCard key={application.id} application={application} />
              )
            })}
          </div>
          <h4 className="text-2xl">Rejected</h4>
          <div className="flex flex-row flex-wrap gap-4">
            {rejectionApps?.map(application => {
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

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-black">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-primary/30 px-10 py-3 font-semibold text-black no-underline transition hover:bg-primary/50"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
