import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";
export const ProfileView = () => {
  const queryClient = useQueryClient();
  // el ! al final es para decirle que no va a ser undefined
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const uploadProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      // console.error(error);
      toast.error(error.message);
    },
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["user"], (prevData: User) => {
        return { ...prevData, image: data };
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };
  const handleUser = (formdata: ProfileForm) => {
    const user: User = queryClient.getQueryData(["user"])!;
    user.handle = formdata.handle;
    user.description = formdata.description;
    uploadProfileMutation.mutate(user);
  };
  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUser)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Edit Information
      </legend>
      <div className="grid grid-cols-1 gap-2 ">
        <label htmlFor="handle">Handle: </label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle or Username"
          {...register("handle", {
            required: "Handle is required",
          })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description: </label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Your description"
          {...register("description", { required: "description is required" })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Image:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Save Changes"
      />
    </form>
  );
};
