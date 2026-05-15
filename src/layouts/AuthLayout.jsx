const AuthLayout = ({ leftSide, children }) => {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center overflow-x-hidden bg-background px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <main className="flex w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_-24px_rgba(26,28,28,0.18)] ring-1 ring-black/5 lg:max-h-[min(900px,calc(100dvh-5rem))] lg:min-h-[min(560px,calc(100dvh-5rem))] lg:flex-row">
        {leftSide}

        <section className="flex w-full flex-col justify-between p-6 sm:p-8 lg:w-2/5 lg:min-h-0 lg:overflow-y-auto lg:p-10 xl:p-12">
          {children}
        </section>
      </main>
    </div>
  );
};

export default AuthLayout;
