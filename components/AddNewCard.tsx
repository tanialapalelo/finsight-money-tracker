import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

// forwardRef is required for shadcn/ui DialogTrigger to work
const AddNewCard = React.forwardRef<HTMLDivElement, Props>(({ title, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="bg-slate-100 p-10 rounded-2xl
        items-center flex flex-col border-2 border-dashed
        cursor-pointer hover:shadow-md"
    >
      <h2 className="text-3xl">+</h2>
      <h2>{title}</h2>
    </div>
  );
});

AddNewCard.displayName = "AddNewCard"; // required for forwardRef

export default AddNewCard;
