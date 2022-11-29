import type { Application } from "@prisma/client";
import Link from "next/link";
import { formatDate } from "../utils/format";

type ApplicationCardProps = {
    application: Application
}
const ApplicationCard = ({ application }: ApplicationCardProps): JSX.Element => {
    return (
        <Link href={`/applications/${application.id}`}>
            <div className="p-4 rounded-md border-2 border-neutral bg-secondary/90 hover:bg-secondary w-96" key={application.id}>
                <p className="text-white"><span className="font-bold">Company:</span> {application.company}</p>
                <p className="text-white"><span className="font-bold">Job Title:</span> {application.jobTitle}</p>
                <p className="text-white"><span className="font-bold">Date:</span> {formatDate(application.applicationDate)}</p>
            </div>
        </Link>
    )
};

export default ApplicationCard;