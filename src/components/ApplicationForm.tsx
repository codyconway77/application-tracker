import React, { useMemo, useState } from 'react'
import { trpc } from '../utils/trpc';

const ApplicationForm = () => {
    const applicationMutation = trpc.application.createApplication.useMutation();
    const utils = trpc.useContext();

    // State
    const [company, setCompany] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [appDate, setAppDate] = useState<Date>(new Date(Date.now()));

    const dateString = useMemo(() => appDate ? `${appDate.getFullYear()}-${appDate.getMonth()}-${appDate.getUTCDate() < 10 ? '0'+appDate.getUTCDate() : appDate.getUTCDate()}` : '', [appDate]);

    const onSubmit = () => {
        try {
            if (!company || !jobDesc || !appDate) {
                throw new Error('Please fill out all fields before saving');
            }
            applicationMutation.mutate({
                company: company,
                jobTitle: jobDesc,
                applicationDate: appDate,
            }, {
                onSuccess: () => utils.application.invalidate(),
                onError: e => console.error(e),
            })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h2 className="text-3xl text-black pb-2">
                Application Form
            </h2>
            <div className='flex flex-col gap-2 p-2 rounded-md bg-neutral/10 border-2 border-neutral'>
                <label htmlFor="company" id='company' className='text-black'>Company</label>
                <input type="text" name='company' className='rounded-lg h-8 p-2' value={company} onChange={e => setCompany(e.target.value)} />
                <label htmlFor='jobTitle' id='jobTitle' className='text-black'>Job Title</label>
                <input type="text" name='jobTitle' className='rounded-lg h-8 p-2' value={jobDesc} onChange={e => setJobDesc(e.target.value)} />
                <label htmlFor="applicationDate" className='text-black'>Application Date</label>
                <input type="date" name="applicationDate" id="applicationDate" className='rounded-lg h-8 p-2' value={dateString} onChange={e => {
                    const date = new Date(e.target.value);
                    setAppDate(date);
                }} />
                <button type='button' className='rounded-full px-8 py-2 text-neutral bg-primary/40 hover:bg-primary/70 font-semibold' onClick={onSubmit}>Create</button>
            </div>
        </div>
    )
}

export default ApplicationForm;
