import type { Application } from "@prisma/client";

type ApplicationCardProps = {
    application: Application
}
const ApplicationCard = ({ application }: ApplicationCardProps): JSX.Element => {
    return (
        <div className="p-4 rounded-md border-2 border-neutral bg-secondary/90 hover:bg-secondary" key={application.id}>
            <p className="text-white">Company: {application.company}</p>
            <p className="text-white">Job Title: {application.jobTitle}</p>
            <p className="text-white">Date: {`${application.applicationDate.getMonth()}-${application.applicationDate.getUTCDate()}-${application.applicationDate.getFullYear()}`}</p>
        </div>
    )
};

export default ApplicationCard;