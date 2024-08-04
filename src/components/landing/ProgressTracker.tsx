const ProgressTracker = () => {
  const surahs = [
    {
      name: "Surah An-Naba'",
      date: "17 May 2024 | 14.53 WIB",
      completed: true,
    },
    {
      name: "Surah An-Nazi'at",
      date: "19 May 2024 | 09.23 WIB",
      completed: true,
    },
    { name: "Surah 'Abasa", date: "4 June 2024 | 11.59 WIB", completed: true },
    { name: "Surah At-Takwir", info: "Makkah | 29 Ayat", completed: false },
    { name: "Surah Al-Infitar", info: "Makkah | 19 Ayat", completed: false },
    {
      name: "Surah Al-Mutthaffifin",
      info: "Makkah | 36 Ayat",
      completed: false,
    },
  ];

  return (
    <div className="px-16 py-24 bg-base-200/50">
      <h2 className="mb-8 text-3xl font-bold text-center">
        We helping you to track all your progression every single day.
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {surahs.map((surah, index) => (
          <div key={index} className="shadow-xl card bg-base-100">
            <div className="card-body">
              <h3 className="card-title">{surah.name}</h3>
              <p>{surah.date || surah.info}</p>
              {surah.completed ? (
                <div className="p-4 mt-4 badge-success badge badge-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Completed
                </div>
              ) : (
                <div className="p-4 mt-4 badge-warning badge badge-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Incomplete
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
