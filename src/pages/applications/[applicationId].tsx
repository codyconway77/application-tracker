import type { NextPage } from "next";
import router from "next/router";
import { formatDate } from "../../utils/format";
import { trpc } from "../../utils/trpc";

const Application: NextPage = () => {
    const { applicationId } = router.query;
    const application = trpc.application.getById.useQuery(applicationId as string);

    if (!application.data) {
        return (
            <>Whoops! This application appears to be missing.</>
        )
    }

    return (
        <div className="px-4 py-12 bg-base min-h-screen">
            <h2 className="text-5xl text-center">Details</h2>
            <p className="text-lg"><span className="text-secondary text-xl text-semibold">Company:</span> {application.data.company}</p>
            <p className="text-lg"><span className="text-secondary text-xl text-semibold">Job Title:</span> {application.data.jobTitle}</p>
            <p className="text-lg"><span className="text-secondary text-xl text-semibold">Date Applied:</span> {formatDate(application.data.applicationDate)}</p>
        </div>
    )
}

export default Application;