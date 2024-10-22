import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import MyJob from "@/Pages/my-job";
import { Heart, HeartIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  ismyJobs = false,
  savedInit = false,
  onJobAction = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const { user } = useUser();
  // calling saved api
  const {
    fetchfn: fetchfnSavedJob,
    data: dataSavedJob,
    loading: loadingSavedJob,
    error: errorSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });
  const { loading: loadingDeleteJob, fetchfn: fnDeleteJob } = useFetch(
    deleteJob,
    {
      job_id: job.id,
    }
  );
  // handle saved job function
  const handleSaveJob = async () => {
    await fetchfnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  // handle delete
  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };
  useEffect(() => {
    if (dataSavedJob !== undefined) setSaved(dataSavedJob?.length > 0);
  }, [dataSavedJob]);
  return (
    <Card>
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        {/* company title and trashcan */}
        <CardTitle className="flex justify-between font-bold">
          {job.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {/* Company logo */}
          {job.company && (
            <img
              src={job.company.logo_url}
              alt="company-logo"
              className="h-6"
            />
          )}
          {/* company location */}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description}
      </CardContent>
      {/* company more details */}
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {/* Heart icons */}
        {/* Writing the logic for the heart selected and deselected */}
        {!ismyJobs && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
