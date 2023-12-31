const Spinner = () => {
  return (
    <div
      className="inline-block h-6 w-6 animate-spin rounded-full border-[6px] border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
};

export default Spinner;
