import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format"
function Summery({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();
    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summary:summery
        })
    },[summery])

    const GenerateSummeryFromAI=async()=>{
        setLoading(true)
        // const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        // console.log(PROMPT);
        // const result=await AIChatSession.sendMessage(PROMPT);
        // console.log(JSON.parse(result.response.text()))
       
        // setAiGenerateSummeryList(JSON.parse(result.response.text()))
        // Mock AI response for demo
        const mockSummaries = [
            {
                experience_level: 'Fresher',
                summary: 'Motivated entry-level professional seeking to leverage strong educational background and passion for technology to contribute to innovative projects. Eager to learn and grow in a dynamic team environment.'
            },
            {
                experience_level: 'Mid Level',
                summary: 'Experienced professional with solid background in software development, bringing 3-5 years of hands-on experience in building scalable applications. Skilled in modern technologies with a track record of delivering quality solutions.'
            },
            {
                experience_level: 'Senior',
                summary: 'Accomplished technology leader with extensive experience in full-stack development and team management. Proven ability to architect complex systems, mentor junior developers, and drive successful project delivery.'
            }
        ];
        setTimeout(() => {
            setAiGenerateSummeryList(mockSummaries);
            setLoading(false);
        }, 1000);
    }

    const onSave=(e)=>{
        e.preventDefault();
       
        setLoading(true)
        const data={
            data:{
                summary:summery
            }
        }
        // GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
        //     console.log(resp);
        //     enabledNext(true);
        //     setLoading(false);
        //     toast("Details updated")
        // },(error)=>{
        //     setLoading(false);
        // })
        // For demo
        setTimeout(() => {
            enabledNext(true);
            setLoading(false);
            toast("Details updated")
        }, 500);
    }
    return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button variant="outline" onClick={()=>GenerateSummeryFromAI()} 
                type="button" size="sm" className="border-primary text-primary flex gap-2"> 
                <Brain className='h-4 w-4' />  Generate from AI</Button>
            </div>
            <Textarea className="mt-5" required
            value={summery}
                defaultValue={summery?summery:resumeInfo?.summary}
            onChange={(e)=>setSummery(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
            <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
        </form>
        </div>

        
       {aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}

    </div>
  )
}

export default Summery