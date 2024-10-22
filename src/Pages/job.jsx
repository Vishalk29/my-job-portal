import { getSingleJobs, updateHiringStatus } from "@/api/apiJobs";
import ApplicationCard from "@/components/ui-layout/application-card";
import AppliedJobDrawer from "@/components/ui-layout/applied-job";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  // hook for single job
  const {
    loading: loadingSingleJob,
    fetchfn: fetchFnSingleJobs,
    data: dataSingleJobs,
    error: errorSingleJob,
  } = useFetch(getSingleJobs, {
    job_id: id,
  });
  useEffect(() => {
    if (isLoaded) fetchFnSingleJobs();
  }, [isLoaded]);
  // creating hook for update job status
  const {
    fetchfn: fetchFnUpdateJobs,
    loading: loadingUpdateJobs,
    error: errorUpdateJob,
    data,
  } = useFetch(updateHiringStatus, {
    job_id: id,
  });
  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fetchFnUpdateJobs(isOpen).then(() => fetchFnSingleJobs());
  };

  if (!isLoaded || loadingSingleJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {dataSingleJobs?.title}
        </h1>
        <img
          src={dataSingleJobs?.company?.logo_url}
          alt={dataSingleJobs?.title}
          className="h-12"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {dataSingleJobs?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {dataSingleJobs?.applications?.length} Applicants{" "}
        </div>
        <div className="flex gap-2">
          {dataSingleJobs?.isOpen ? (
            <>
              <DoorOpen /> Open
            </>
          ) : (
            <>
              <DoorClosed /> Closed
            </>
          )}
        </div>
      </div>

      {/* Hiring status */}
      {loadingUpdateJobs && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      {dataSingleJobs?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${
              dataSingleJobs?.isOpen ? "bg-green-950" : "bg-red-950"
            }`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " +
                (dataSingleJobs?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{dataSingleJobs?.description}</p>

      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>
      <MDEditor.Markdown
        source={dataSingleJobs?.requirements}
        className="bg-transparent sm:text-lg text-white" // add global ul styles - tutorial
      />
      {/* Render the application */}
      {dataSingleJobs.recruiter_id !== user.id && (
        <AppliedJobDrawer
          dataSingleJobs={dataSingleJobs}
          user={user}
          fetchFnSingleJobs={fetchFnSingleJobs}
          applied={dataSingleJobs?.applications?.find(
            (ap) => ap.candidate_id === user.id
          )}
        />
      )}

      {dataSingleJobs?.applications?.length > 0 &&
        dataSingleJobs?.recruiter_id === user?.id && (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
            {dataSingleJobs?.applications.map((application) => {
              return (
                <ApplicationCard
                  key={application?.id}
                  application={application}
                />
              );
            })}
          </div>
        )}
    </div>
  );
};

export default Job;
