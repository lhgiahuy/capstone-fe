import ValidationForm from "./_component/form";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 w-full px-48 max-w-[55rem]">
      <h1 className="text-4xl font-semibold text-primary">
        Xác thực tài khoản FVENT
      </h1>
      <ValidationForm />
    </div>
  );
}
