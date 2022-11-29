import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Status } from "../../types/application";
import { formatDate } from "../../utils/format";
import { trpc } from "../../utils/trpc";

const Application: NextPage = () => {
    const router = useRouter();
    const utils = trpc.useContext();
    const { applicationId } = router.query;
    const strAppId = String(applicationId);
    const application = trpc.application.getById.useQuery(strAppId);
    const applicationUpdate = trpc.application.updateById.useMutation();

    const updateApplication = (status: Status) => {
        try {
            applicationUpdate.mutate({
                id: strAppId,
                status,
            }, {
                onSuccess: () => utils.application.invalidate(),
                onError: e => console.error(e),
            })
        } catch (e) {
            console.error(e);
        }
    }

    if (!application.data) {
        return (
            <>Whoops! This application appears to be missing.</>
        )
    }

    return (
        <div className="px-4 py-12 bg-base min-h-screen">
            <h2 className="text-5xl text-center mb-4">Details</h2>
            <p className="text-lg"><span className="text-secondary text-xl text-semibold">Company:</span> {application.data.company}</p>
            <p className="text-lg"><span className="text-secondary text-xl text-semibold">Job Title:</span> {application.data.jobTitle}</p>
            <p className="text-lg"><span className="text-secondary text-xl text-semibold">Date Applied:</span> {formatDate(application.data.applicationDate)}</p>
            <p className="text-lg"><span className="text-secondary text-xl text-semibold">Status:</span> {application.data.status}</p>
            <h4 className="text-2xl py-4">Actions</h4>
            <div className="flex gap-2">
                <button type="button" className="bg-info/20 hover:bg-info/40 font-bold rounded-full py-2 px-6 text-info" onClick={() => updateApplication(Status.INTERVIEWING)}>Interviewing</button>
                <button type="button" className="bg-success/20 hover:bg-success/40 font-bold rounded-full py-2 px-6 text-success" onClick={() => updateApplication(Status.OFFER)}>Offer</button>
                <button type="button" className="bg-error/20 hover:bg-error/40 font-bold rounded-full py-2 px-6 text-error" onClick={() => updateApplication(Status.REJECTION)}>Rejected</button>
            </div>
        </div>
    )
}

export default Application;