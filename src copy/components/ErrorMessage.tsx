type ErrorMessageProp = {
  children: React.ReactNode;
};
export const ErrorMessage = ({ children }: ErrorMessageProp) => {
  return (
    <p className="bg-red-50 p-3 text-red-600 uppercase text-sm font-medium text-center">
      {children}
    </p>
  );
};
