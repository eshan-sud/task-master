// frontend/src/pages/AboutUs.jsx

export default function AboutUs() {
  return (
    <div className="flex items-center justify-center m-[90px]">
      <div className="flex flex-col p-10 justify-center items-center bg-white/30 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-[15px] border border-white w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-8 text-center"> About Us </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mb-6">
            At Task Master, we are dedicated to helping you manage your tasks
            efficiently and effectively. Our mission is to provide a
            comprehensive task management solution that integrates seamlessly
            into your workflow. With a passionate team and a commitment to
            innovation, we aim to transform the way you organize and accomplish
            your tasks.
          </p>
          <p className="text-lg">
            Whether you're an individual looking to boost productivity or a team
            striving for better collaboration, Task Master is here to support
            you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
}
