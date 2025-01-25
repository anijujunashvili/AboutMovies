const AboutMe = () => {
  return (
    <>
      <div className="mx-auto my-10 flex w-full flex-col gap-8 md:flex-row lg:w-5/6">
        <div className="flex w-full flex-col px-4 md:w-2/3 md:px-6">
          <h3 className="text-secondary border-primary mb-3 border-l-4 pl-3 pt-1 text-3xl font-bold uppercase">
            About me
          </h3>
          <div className="text-md dark:text-secondary mt-2">
            Hi, I'm Ana, a junior React JS developer. I hold a Bachelor's and
            Master's degree in Computer Science from Tbilisi State University
            and have worked as a web developer for several years. In September
            2024, I started learning React JS through the &#x201C;React
            Accelerator: Fast-Track Your Web Development Career&#x201D; course
            by TBC x USAID. This course provided me with a strong foundation in
            React, and I am now focused on transitioning fully into React
            development. I aim to deepen my expertise and evolve into a highly
            skilled, competitive React developer. I am enthusiastic about
            exploring opportunities that will help me grow and advance in this
            exciting field.
          </div>
        </div>
        <div className="flex w-full items-end px-4 md:w-1/3 lg:px-0">
          <div className="flex h-full w-full">
            <img
              src="../ani.jpg"
              className="h-full w-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
