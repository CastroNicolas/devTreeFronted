import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getUserByhandle } from "../api/DevTreeAPI";
import { HandleData } from "../components/HandleData";

export const HandleView = () => {
  const paramas = useParams();
  const handle = paramas.handle!;

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getUserByhandle(handle),
    queryKey: ["handle", handle],
    retry: 1,
  });
  // console.log(handle);
  if (isLoading)
    return (
      <div className="text-white font-bold text-2xl text-center ">
        Loading...
      </div>
    );
  if (isError) return <Navigate to="/404" />;
  if (data) return <HandleData data={data} />;
};
