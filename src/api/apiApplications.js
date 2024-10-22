import supabaseClient, { supabaseUrl } from "@/utils/supaBase";
// - Apply to job ( candidate )
export async function applyJobs(token, _, jobData) {
  const supabase = await supabaseClient(token);
  // step1 upload the resume - for that creating random name
  const random = Math.floor(Math.random() * 90000);
  // giving filename
  const fileName = `resume-${random}-${jobData.candidate_id}`;
  // this how we can upload something
  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resumes);
  if (storageError) {
    console.error("Error error uploading resume", storageError);
    return null;
  }
  // need a url / we get URL
  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Application");
  }
  return data;
}

// - Edit Application Status ( recruiter )
export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}
export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}
